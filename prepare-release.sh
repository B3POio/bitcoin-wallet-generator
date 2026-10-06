#!/bin/bash

set -euo pipefail

VERSION="2.0.2"
TAG="v${VERSION}"

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

echo "Bitcoin Wallet Generator ${TAG}"
echo

# Refuse to run with uncommitted changes.
if [ -n "$(git status --porcelain)" ]; then
  echo "ERROR: Working tree is not clean."
  echo "Commit, stash, or discard changes first."
  exit 1
fi

# Must run from main.
BRANCH="$(git branch --show-current)"

if [ "$BRANCH" != "main" ]; then
  echo "ERROR: Current branch is '$BRANCH'."
  echo "Switch to main first."
  exit 1
fi

git fetch origin
git pull --ff-only origin main

COMMIT="$(git rev-parse HEAD)"
SHORT_COMMIT="$(git rev-parse --short=7 HEAD)"

echo "Version:       ${VERSION}"
echo "Source commit: ${COMMIT}"
echo

RELEASE_DIR="../bitcoin-wallet-generator-${TAG}-release"

if [ -e "$RELEASE_DIR" ]; then
  echo "ERROR: ${RELEASE_DIR} already exists."
  echo "Remove or rename it before continuing."
  exit 1
fi

mkdir "$RELEASE_DIR"

# Export only tracked files from the exact commit.
git archive "$COMMIT" | tar -x -C "$RELEASE_DIR"

cd "$RELEASE_DIR"

echo
echo "Installing locked dependencies..."
npm ci

echo
echo "Building production bundle..."
npm run build

echo
echo "Generating RELEASE.json..."

INDEX_SHA="$(shasum -a 256 index.html | awk '{print $1}')"
CSS_SHA="$(shasum -a 256 css/style.css | awk '{print $1}')"
BUNDLE_SHA="$(shasum -a 256 js/app.bundle.js | awk '{print $1}')"
THEME_SHA="$(shasum -a 256 js/theme-init.js | awk '{print $1}')"
GITHUB_SHA="$(shasum -a 256 assets/github.svg | awk '{print $1}')"
BITCOIN_SHA="$(shasum -a 256 assets/bitcoin.svg | awk '{print $1}')"

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

MANIFEST_SHA="$(shasum -a 256 RELEASE.json | awk '{print $1}')"

echo
echo "RELEASE.json SHA-256:"
echo "$MANIFEST_SHA"

echo
echo "Release info values:"
echo "version:        ${VERSION}"
echo "commit:         ${COMMIT}"
echo "commitShort:    ${SHORT_COMMIT}"
echo "manifestSha256: ${MANIFEST_SHA}"

echo
echo "Generating SHA256SUMS..."

find . \
  -type f \
  ! -name "SHA256SUMS" \
  ! -path "./.DS_Store" \
  -print0 \
  | sort -z \
  | xargs -0 shasum -a 256 \
  > SHA256SUMS

echo
echo "SHA256SUMS SHA-256:"
shasum -a 256 SHA256SUMS

echo
echo "Release staging directory:"
echo "$(pwd)"

echo
echo "DONE."