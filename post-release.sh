#!/bin/bash

# NOTE:
# This script is currently designed to live and run ONE DIRECTORY ABOVE
# the bitcoin-wallet-generator repository root to avoid git issues.
#
# Expected layout:
#
#   /path/to/code/
#   ├── post-release.sh
#   └── bitcoin-wallet-generator/
#
# Do not place or run this script from inside the repository root unless
# the repository path logic below is updated accordingly.

set -euo pipefail

# ============================================================
# LOCATION
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="${SCRIPT_DIR}/bitcoin-wallet-generator"

if [ ! -d "${ROOT}/.git" ]; then
  echo "ERROR: Repository not found:"
  echo "${ROOT}"
  exit 1
fi

cd "$ROOT"

# ============================================================
# VERSION
# ============================================================

read -r -p "Released version (example: 2.0.3): " VERSION

if [ -z "$VERSION" ]; then
  echo "ERROR: Version cannot be empty."
  exit 1
fi

if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "ERROR: Version must use semantic version format, for example 2.0.3."
  exit 1
fi

TAG="v${VERSION}"
RELEASE_INFO_BRANCH="${TAG}-release-info"
ZIP_NAME="bitcoin-wallet-generator-${TAG}.zip"
RELEASE_DIR_NAME="bitcoin-wallet-generator-${TAG}-release"

# Hard safety rule.
if [ "$RELEASE_INFO_BRANCH" = "main" ]; then
  echo "ERROR: Refusing to use main as the release-info branch."
  exit 1
fi

case "$RELEASE_INFO_BRANCH" in
  v*-release-info)
    ;;
  *)
    echo "ERROR: Invalid release-info branch name:"
    echo "${RELEASE_INFO_BRANCH}"
    exit 1
    ;;
esac

echo
echo "Bitcoin Wallet Generator ${TAG}"
echo "Post-release verification"
echo

# ============================================================
# REQUIRED TOOLS
# ============================================================

for command_name in git curl shasum node unzip cmp; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "ERROR: Required command '${command_name}' is unavailable."
    exit 1
  fi
done

# ============================================================
# DETERMINE GITHUB REPOSITORY
# ============================================================

ORIGIN_URL="$(git remote get-url origin)"

case "$ORIGIN_URL" in
  git@github.com:*)
    GITHUB_REPO="${ORIGIN_URL#git@github.com:}"
    ;;
  https://github.com/*)
    GITHUB_REPO="${ORIGIN_URL#https://github.com/}"
    ;;
  http://github.com/*)
    GITHUB_REPO="${ORIGIN_URL#http://github.com/}"
    ;;
  *)
    echo "ERROR: origin is not recognized as a GitHub repository."
    echo "Origin: ${ORIGIN_URL}"
    exit 1
    ;;
esac

GITHUB_REPO="${GITHUB_REPO%.git}"

PUBLIC_GIT_URL="https://github.com/${GITHUB_REPO}.git"
RELEASE_BASE_URL="https://github.com/${GITHUB_REPO}/releases/download/${TAG}"

echo "Repository: ${GITHUB_REPO}"
echo "Release:    ${TAG}"
echo

# ============================================================
# TEMPORARY DIRECTORIES
# ============================================================

TEMP_ROOT="$(mktemp -d)"
DOWNLOAD_DIR="${TEMP_ROOT}/downloads"
EXTRACT_DIR="${TEMP_ROOT}/extracted"
WORKTREE_DIR="${TEMP_ROOT}/worktree"

mkdir -p "$DOWNLOAD_DIR"
mkdir -p "$EXTRACT_DIR"

cleanup() {
  if git worktree list --porcelain 2>/dev/null |
    grep -Fq "worktree ${WORKTREE_DIR}"
  then
    git worktree remove --force "$WORKTREE_DIR" >/dev/null 2>&1 || true
  fi

  rm -rf "$TEMP_ROOT"
}

trap cleanup EXIT

# ============================================================
# DOWNLOAD PUBLISHED RELEASE ASSETS
# ============================================================

download_asset() {
  local asset="$1"
  local destination="${DOWNLOAD_DIR}/${asset}"

  echo "Downloading ${asset}..."

  if ! curl \
    --fail \
    --location \
    --silent \
    --show-error \
    "${RELEASE_BASE_URL}/${asset}" \
    --output "$destination"
  then
    echo
    echo "ERROR: Unable to download published asset:"
    echo "${asset}"
    echo
    echo "Make sure ${TAG} is published and the asset is attached."
    exit 1
  fi
}

echo "Downloading published GitHub release artifacts..."
echo

download_asset "$ZIP_NAME"
download_asset "RELEASE.json"
download_asset "SHA256SUMS"
download_asset "RELEASE-CHECKSUMS.txt"

echo
echo "Published artifacts downloaded."

# ============================================================
# CALCULATE PUBLISHED ARTIFACT HASHES
# ============================================================

ZIP_SHA="$(
  shasum -a 256 "${DOWNLOAD_DIR}/${ZIP_NAME}" |
  awk '{print $1}'
)"

MANIFEST_SHA="$(
  shasum -a 256 "${DOWNLOAD_DIR}/RELEASE.json" |
  awk '{print $1}'
)"

SHA256SUMS_SHA="$(
  shasum -a 256 "${DOWNLOAD_DIR}/SHA256SUMS" |
  awk '{print $1}'
)"

echo
echo "Published artifact hashes:"
echo "ZIP:          ${ZIP_SHA}"
echo "RELEASE.json: ${MANIFEST_SHA}"
echo "SHA256SUMS:   ${SHA256SUMS_SHA}"

# ============================================================
# VERIFY RELEASE-CHECKSUMS.TXT
# ============================================================

echo
echo "Verifying RELEASE-CHECKSUMS.txt..."

if ! grep -Fq \
  "${ZIP_SHA}  ${ZIP_NAME}" \
  "${DOWNLOAD_DIR}/RELEASE-CHECKSUMS.txt"
then
  echo "ERROR: ZIP checksum does not match RELEASE-CHECKSUMS.txt."
  exit 1
fi

if ! grep -Fq \
  "${SHA256SUMS_SHA}  SHA256SUMS" \
  "${DOWNLOAD_DIR}/RELEASE-CHECKSUMS.txt"
then
  echo "ERROR: SHA256SUMS checksum does not match RELEASE-CHECKSUMS.txt."
  exit 1
fi

if ! grep -Fq \
  "${MANIFEST_SHA}  RELEASE.json" \
  "${DOWNLOAD_DIR}/RELEASE-CHECKSUMS.txt"
then
  echo "ERROR: RELEASE.json checksum does not match RELEASE-CHECKSUMS.txt."
  exit 1
fi

echo "RELEASE-CHECKSUMS.txt verified."

# ============================================================
# READ RELEASE.JSON
# ============================================================

MANIFEST_VERSION="$(
  RELEASE_JSON="${DOWNLOAD_DIR}/RELEASE.json" \
  node -e '
    const fs = require("fs");
    const data = JSON.parse(
      fs.readFileSync(process.env.RELEASE_JSON, "utf8")
    );
    process.stdout.write(String(data.version));
  '
)"

MANIFEST_COMMIT="$(
  RELEASE_JSON="${DOWNLOAD_DIR}/RELEASE.json" \
  node -e '
    const fs = require("fs");
    const data = JSON.parse(
      fs.readFileSync(process.env.RELEASE_JSON, "utf8")
    );
    process.stdout.write(String(data.sourceCommit));
  '
)"

if [ "$MANIFEST_VERSION" != "$VERSION" ]; then
  echo
  echo "ERROR: RELEASE.json version mismatch."
  echo "Expected: ${VERSION}"
  echo "Found:    ${MANIFEST_VERSION}"
  exit 1
fi

if ! [[ "$MANIFEST_COMMIT" =~ ^[0-9a-f]{40}$ ]]; then
  echo
  echo "ERROR: RELEASE.json contains an invalid source commit."
  echo "${MANIFEST_COMMIT}"
  exit 1
fi

SHORT_COMMIT="${MANIFEST_COMMIT:0:7}"

echo
echo "RELEASE.json:"
echo "version:        ${MANIFEST_VERSION}"
echo "commit:         ${MANIFEST_COMMIT}"
echo "commitShort:    ${SHORT_COMMIT}"
echo "manifestSha256: ${MANIFEST_SHA}"

# ============================================================
# VERIFY GITHUB TAG WITHOUT MODIFYING LOCAL TAG REFS
# ============================================================

echo
echo "Verifying GitHub tag ${TAG}..."

TAG_REMOTE_INFO="$(
  git ls-remote \
    "$PUBLIC_GIT_URL" \
    "refs/tags/${TAG}" \
    "refs/tags/${TAG}^{}"
)"

if [ -z "$TAG_REMOTE_INFO" ]; then
  echo "ERROR: GitHub tag ${TAG} does not exist."
  exit 1
fi

TAG_COMMIT="$(
  printf '%s\n' "$TAG_REMOTE_INFO" |
  awk '
    /\^\{\}$/ {
      print $1;
      found=1;
      exit
    }
    {
      fallback=$1
    }
    END {
      if (!found && fallback) print fallback
    }
  '
)"

if [ "$TAG_COMMIT" != "$MANIFEST_COMMIT" ]; then
  echo
  echo "ERROR: Published tag does not match RELEASE.json."
  echo "Tag commit:      ${TAG_COMMIT}"
  echo "Manifest commit: ${MANIFEST_COMMIT}"
  exit 1
fi

echo "GitHub tag verified."
echo "Tag commit: ${TAG_COMMIT}"

# ============================================================
# EXTRACT PUBLISHED ZIP
# ============================================================

echo
echo "Extracting published ZIP..."

unzip \
  -q \
  "${DOWNLOAD_DIR}/${ZIP_NAME}" \
  -d "$EXTRACT_DIR"

EXTRACTED_RELEASE_DIR="${EXTRACT_DIR}/${RELEASE_DIR_NAME}"

if [ ! -d "$EXTRACTED_RELEASE_DIR" ]; then
  echo "ERROR: Expected release directory not found inside ZIP:"
  echo "${RELEASE_DIR_NAME}"
  exit 1
fi

# ============================================================
# VERIFY DOWNLOADED METADATA MATCHES ZIP CONTENTS
# ============================================================

if ! cmp -s \
  "${DOWNLOAD_DIR}/RELEASE.json" \
  "${EXTRACTED_RELEASE_DIR}/RELEASE.json"
then
  echo "ERROR: Published RELEASE.json differs from the copy inside the ZIP."
  exit 1
fi

if ! cmp -s \
  "${DOWNLOAD_DIR}/SHA256SUMS" \
  "${EXTRACTED_RELEASE_DIR}/SHA256SUMS"
then
  echo "ERROR: Published SHA256SUMS differs from the copy inside the ZIP."
  exit 1
fi

echo "Published metadata matches ZIP contents."

# ============================================================
# VERIFY SHA256SUMS AGAINST PUBLISHED ZIP CONTENTS
# ============================================================

echo
echo "Verifying every file listed in SHA256SUMS..."

(
  cd "$EXTRACTED_RELEASE_DIR"
  shasum -a 256 -c SHA256SUMS
)

echo
echo "All ZIP contents verified."

# ============================================================
# FETCH ONLY REQUIRED GIT OBJECT
#
# This writes only FETCH_HEAD/object data.
# It does NOT update main, a branch ref, or a tag ref.
# ============================================================

echo
echo "Fetching release commit object..."

git fetch \
  --quiet \
  --no-tags \
  "$PUBLIC_GIT_URL" \
  "$MANIFEST_COMMIT"

FETCHED_COMMIT="$(
  git rev-parse "FETCH_HEAD^{commit}"
)"

if [ "$FETCHED_COMMIT" != "$MANIFEST_COMMIT" ]; then
  echo "ERROR: Fetched commit does not match the published manifest."
  exit 1
fi

# ============================================================
# DETERMINE RELEASE-INFO BASE
#
# If the remote release-info branch already exists, use it.
# Otherwise start from the exact published release commit.
#
# No local branch is created or switched.
# ============================================================

echo
echo "Checking for existing ${RELEASE_INFO_BRANCH}..."

REMOTE_RELEASE_INFO="$(
  git ls-remote \
    --heads \
    "$PUBLIC_GIT_URL" \
    "refs/heads/${RELEASE_INFO_BRANCH}" |
  awk '{print $1}'
)"

if [ -n "$REMOTE_RELEASE_INFO" ]; then

  echo "Existing release-info branch found."

  git fetch \
    --quiet \
    --no-tags \
    "$PUBLIC_GIT_URL" \
    "refs/heads/${RELEASE_INFO_BRANCH}"

  BASE_COMMIT="$(
    git rev-parse "FETCH_HEAD^{commit}"
  )"

else

  echo "No existing release-info branch found."
  echo "Using published release commit as the base."

  BASE_COMMIT="$MANIFEST_COMMIT"

fi

# ============================================================
# TEMPORARY DETACHED WORKTREE
#
# This leaves the user's current checkout completely untouched.
# ============================================================

echo
echo "Creating isolated temporary worktree..."

git worktree add \
  --quiet \
  --detach \
  "$WORKTREE_DIR" \
  "$BASE_COMMIT"

RELEASE_INFO_FILE="${WORKTREE_DIR}/js/release-info.js"

if [ ! -f "$RELEASE_INFO_FILE" ]; then
  echo "ERROR: js/release-info.js not found in release source."
  exit 1
fi

# ============================================================
# UPDATE RELEASE-INFO.JS
# ============================================================

echo
echo "Updating release-info.js..."

VERSION="$VERSION" \
FULL_COMMIT="$MANIFEST_COMMIT" \
SHORT_COMMIT="$SHORT_COMMIT" \
MANIFEST_SHA="$MANIFEST_SHA" \
RELEASE_INFO_FILE="$RELEASE_INFO_FILE" \
node <<'NODE'
const fs = require("fs");

const file = process.env.RELEASE_INFO_FILE;
let source = fs.readFileSync(file, "utf8");

const replacements = {
  version: process.env.VERSION,
  commit: process.env.FULL_COMMIT,
  commitShort: process.env.SHORT_COMMIT,
  manifestSha256: process.env.MANIFEST_SHA
};

for (const [key, value] of Object.entries(replacements)) {
  const pattern = new RegExp(
    `(${key}\\s*:\\s*)["'][^"']*["']`
  );

  if (!pattern.test(source)) {
    console.error(
      `ERROR: Could not locate '${key}' in ${file}.`
    );
    process.exit(1);
  }

  source = source.replace(
    pattern,
    `$1"${value}"`
  );
}

fs.writeFileSync(file, source);
NODE

echo
echo "Release info values:"
echo "version:        ${VERSION}"
echo "commit:         ${MANIFEST_COMMIT}"
echo "commitShort:    ${SHORT_COMMIT}"
echo "manifestSha256: ${MANIFEST_SHA}"

# ============================================================
# COMMIT IN TEMPORARY DETACHED WORKTREE
# ============================================================

if git -C "$WORKTREE_DIR" diff --quiet -- js/release-info.js; then

  echo
  echo "release-info.js already contains the correct values."

else

  git -C "$WORKTREE_DIR" add js/release-info.js

  git -C "$WORKTREE_DIR" commit \
    -m "Update release info for ${TAG}"

fi

RELEASE_INFO_COMMIT="$(
  git -C "$WORKTREE_DIR" rev-parse HEAD
)"

# ============================================================
# FINAL PUSH SAFETY
# ============================================================

if [ "$RELEASE_INFO_BRANCH" = "main" ]; then
  echo "ERROR: Refusing to push to main."
  exit 1
fi

case "$RELEASE_INFO_BRANCH" in
  v*-release-info)
    ;;
  *)
    echo "ERROR: Refusing unexpected push destination:"
    echo "${RELEASE_INFO_BRANCH}"
    exit 1
    ;;
esac

echo
echo "Push destination:"
echo "refs/heads/${RELEASE_INFO_BRANCH}"
echo
echo "No main branch or tag will be modified."

# ============================================================
# PUSH ONLY RELEASE-INFO BRANCH
# ============================================================

echo
echo "Pushing ${RELEASE_INFO_BRANCH}..."

git -C "$WORKTREE_DIR" push \
  origin \
  "HEAD:refs/heads/${RELEASE_INFO_BRANCH}"

echo
echo "${RELEASE_INFO_BRANCH} pushed successfully."

# ============================================================
# COMPLETE
# ============================================================

echo
echo "============================================================"
echo "POST-RELEASE COMPLETE"
echo "============================================================"
echo
echo "Version:"
echo "${VERSION}"
echo
echo "Tag:"
echo "${TAG}"
echo
echo "Source commit:"
echo "${MANIFEST_COMMIT}"
echo
echo "ZIP SHA-256:"
echo "${ZIP_SHA}"
echo
echo "RELEASE.json SHA-256:"
echo "${MANIFEST_SHA}"
echo
echo "SHA256SUMS SHA-256:"
echo "${SHA256SUMS_SHA}"
echo
echo "Release info branch:"
echo "${RELEASE_INFO_BRANCH}"
echo
echo "Release info commit:"
echo "${RELEASE_INFO_COMMIT}"
echo
echo "Verified directly from GitHub:"
echo "- Published release ZIP"
echo "- Published RELEASE.json"
echo "- Published SHA256SUMS"
echo "- Published RELEASE-CHECKSUMS.txt"
echo "- Every file inside the published ZIP"
echo "- GitHub release tag and source commit"
echo
echo "Git operations:"
echo "- main was NOT checked out"
echo "- main was NOT pulled"
echo "- main was NOT committed to"
echo "- main was NOT pushed"
echo "- no tag was created, deleted, moved, or pushed"
echo "- only ${RELEASE_INFO_BRANCH} was pushed"
echo
echo "DONE."