#!/bin/bash

set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

# ============================================================
# VERSION
# ============================================================

read -r -p "Release version (example: 2.0.3): " VERSION

if [ -z "$VERSION" ]; then
  echo "ERROR: Version cannot be empty."
  exit 1
fi

if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "ERROR: Version must use semantic version format, for example 2.0.3."
  exit 1
fi

TAG="v${VERSION}"

if [ ! -f "package.json" ]; then
  echo "ERROR: package.json not found."
  exit 1
fi

PACKAGE_VERSION="$(node -p "require('./package.json').version")"

if [ "$PACKAGE_VERSION" != "$VERSION" ]; then
  echo
  echo "ERROR: Release version does not match package.json."
  echo "Release version: ${VERSION}"
  echo "package.json:    ${PACKAGE_VERSION}"
  echo
  echo "Update package.json before creating the release."
  exit 1
fi

echo
echo "Bitcoin Wallet Generator ${TAG}"
echo

# ============================================================
# REPOSITORY CHECKS
# ============================================================

if [ -n "$(git status --porcelain)" ]; then
  echo "ERROR: Working tree is not clean."
  echo "Commit, stash, or discard changes first."
  exit 1
fi

BRANCH="$(git branch --show-current)"

if [ "$BRANCH" != "main" ]; then
  echo "ERROR: Current branch is '$BRANCH'."
  echo "Switch to main first."
  exit 1
fi

echo "Fetching latest main..."

git fetch origin
git pull --ff-only origin main

COMMIT="$(git rev-parse HEAD)"
SHORT_COMMIT="$(git rev-parse --short=7 HEAD)"

echo
echo "Version:       ${VERSION}"
echo "Tag:           ${TAG}"
echo "Source commit: ${COMMIT}"
echo

# ============================================================
# TAG CHECKS
# ============================================================

if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "ERROR: Local tag ${TAG} already exists."
  exit 1
fi

if git ls-remote --exit-code --tags origin "refs/tags/${TAG}" \
  >/dev/null 2>&1; then
  echo "ERROR: Remote tag ${TAG} already exists."
  exit 1
fi

# ============================================================
# RELEASE PATHS
# ============================================================

PARENT_DIR="$(dirname "$ROOT")"

RELEASE_NAME="bitcoin-wallet-generator-${TAG}-release"
RELEASE_DIR="${PARENT_DIR}/${RELEASE_NAME}"

ZIP_NAME="bitcoin-wallet-generator-${TAG}.zip"
ZIP_PATH="${PARENT_DIR}/${ZIP_NAME}"

CHECKSUM_FILE="${RELEASE_DIR}/RELEASE-CHECKSUMS.txt"

if [ -e "$RELEASE_DIR" ]; then
  echo "ERROR: ${RELEASE_DIR} already exists."
  echo "Remove or rename it before continuing."
  exit 1
fi

if [ -e "$ZIP_PATH" ]; then
  echo "ERROR: ${ZIP_PATH} already exists."
  echo "Remove or rename it before continuing."
  exit 1
fi

# ============================================================
# EXPORT EXACT SOURCE COMMIT
# ============================================================

echo "Creating release staging directory..."

mkdir "$RELEASE_DIR"

git archive "$COMMIT" |
  tar -x -C "$RELEASE_DIR"

cd "$RELEASE_DIR"

# ============================================================
# INSTALL + BUILD
# ============================================================

echo
echo "Installing locked dependencies..."

npm ci

echo
echo "Building production bundle..."

npm run build

# ============================================================
# RELEASE MANIFEST
# ============================================================

echo
echo "Generating RELEASE.json..."

INDEX_SHA="$(
  shasum -a 256 index.html |
  awk '{print $1}'
)"

CSS_SHA="$(
  shasum -a 256 css/style.css |
  awk '{print $1}'
)"

BUNDLE_SHA="$(
  shasum -a 256 js/app.bundle.js |
  awk '{print $1}'
)"

THEME_SHA="$(
  shasum -a 256 js/theme-init.js |
  awk '{print $1}'
)"

GITHUB_SHA="$(
  shasum -a 256 assets/github.svg |
  awk '{print $1}'
)"

BITCOIN_SHA="$(
  shasum -a 256 assets/bitcoin.svg |
  awk '{print $1}'
)"

cat > RELEASE.json <<EOF
{
  "version": "${VERSION}",
  "sourceCommit": "${COMMIT}",
  "files": {
    "index.html": "${INDEX_SHA}",
    "css/style.css": "${CSS_SHA}",
    "js/app.bundle.js": "${BUNDLE_SHA}",
    "js/theme-init.js": "${THEME_SHA}",
    "assets/github.svg": "${GITHUB_SHA}",
    "assets/bitcoin.svg": "${BITCOIN_SHA}"
  }
}
EOF

MANIFEST_SHA="$(
  shasum -a 256 RELEASE.json |
  awk '{print $1}'
)"

echo
echo "RELEASE.json SHA-256:"
echo "$MANIFEST_SHA"

# ============================================================
# SHA256SUMS
# ============================================================

echo
echo "Generating SHA256SUMS..."

find . \
  -type f \
  ! -name "SHA256SUMS" \
  ! -name "RELEASE-CHECKSUMS.txt" \
  ! -path "./node_modules/*" \
  ! -path "./.DS_Store" \
  -print0 \
  | sort -z \
  | xargs -0 shasum -a 256 \
  > SHA256SUMS

SHA256SUMS_SHA="$(
  shasum -a 256 SHA256SUMS |
  awk '{print $1}'
)"

echo
echo "SHA256SUMS SHA-256:"
echo "$SHA256SUMS_SHA"

# ============================================================
# VERIFY FILE CHECKSUMS
# ============================================================

echo
echo "Verifying SHA256SUMS..."

shasum -a 256 -c SHA256SUMS >/dev/null

echo "SHA256SUMS verified."

# ============================================================
# RELEASE ZIP
# ============================================================

echo
echo "Creating release ZIP..."

cd "$PARENT_DIR"

zip -r "$ZIP_NAME" "$RELEASE_NAME" \
  -x "*.DS_Store" \
  -x "*/node_modules/*" \
  -x "*/RELEASE-CHECKSUMS.txt" \
  >/dev/null

ZIP_SHA="$(
  shasum -a 256 "$ZIP_NAME" |
  awk '{print $1}'
)"

echo
echo "ZIP SHA-256:"
echo "$ZIP_SHA"

# ============================================================
# TOP-LEVEL RELEASE CHECKSUMS
# ============================================================

echo
echo "Generating RELEASE-CHECKSUMS.txt..."

cat > "$CHECKSUM_FILE" <<EOF
${ZIP_SHA}  ${ZIP_NAME}
${SHA256SUMS_SHA}  SHA256SUMS
${MANIFEST_SHA}  RELEASE.json
EOF

# ============================================================
# RELEASE INFORMATION
# ============================================================

echo
echo "Release info values:"
echo "version:        ${VERSION}"
echo "commit:         ${COMMIT}"
echo "commitShort:    ${SHORT_COMMIT}"
echo "manifestSha256: ${MANIFEST_SHA}"

echo
echo "Release artifact checksums:"
echo "${ZIP_SHA}  ${ZIP_NAME}"
echo "${SHA256SUMS_SHA}  SHA256SUMS"
echo "${MANIFEST_SHA}  RELEASE.json"

# ============================================================
# CREATE + PUSH TAG
# ============================================================

echo
echo "Creating Git tag ${TAG}..."

cd "$ROOT"

git tag -a "$TAG" "$COMMIT" \
  -m "Bitcoin Wallet Generator ${TAG}"

echo "Pushing ${TAG} to GitHub..."

git push origin "$TAG"

# ============================================================
# GITHUB RELEASE
# ============================================================

if command -v gh >/dev/null 2>&1; then

  if gh auth status >/dev/null 2>&1; then

    echo
    echo "Creating draft GitHub release..."

    gh release create "$TAG" \
      "$ZIP_PATH" \
      "${RELEASE_DIR}/RELEASE.json" \
      "${RELEASE_DIR}/SHA256SUMS" \
      "$CHECKSUM_FILE" \
      --title "$TAG" \
      --generate-notes \
      --draft

    echo
    echo "Draft GitHub release created."

  else

    echo
    echo "GitHub CLI is installed but not authenticated."
    echo "Tag was pushed, but the GitHub release was not created."
    echo
    echo "Authenticate with:"
    echo "gh auth login"

  fi

else

  echo
  echo "GitHub CLI (gh) is not installed."
  echo "Tag was pushed, but the GitHub release was not created."

fi

# ============================================================
# COMPLETE
# ============================================================

echo
echo "============================================================"
echo "RELEASE COMPLETE"
echo "============================================================"
echo
echo "Version:"
echo "${VERSION}"
echo
echo "Tag:"
echo "${TAG}"
echo
echo "Source commit:"
echo "${COMMIT}"
echo
echo "Release staging directory:"
echo "${RELEASE_DIR}"
echo
echo "Release ZIP:"
echo "${ZIP_PATH}"
echo
echo "RELEASE.json SHA-256:"
echo "${MANIFEST_SHA}"
echo
echo "SHA256SUMS SHA-256:"
echo "${SHA256SUMS_SHA}"
echo
echo "ZIP SHA-256:"
echo "${ZIP_SHA}"
echo
echo "Release checksum file:"
echo "${CHECKSUM_FILE}"
echo
echo "DONE."