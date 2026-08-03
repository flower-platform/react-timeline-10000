#!/usr/bin/env bash
set -e

# Repo root is one level above this script (demo-app/../)
REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

# ghcr.io/puppeteer/puppeteer ships Chrome for Testing (not a system package) at:
#   /home/pptruser/.cache/puppeteer/chrome/<version>/chrome-linux64/chrome
# That path is world-traversable (755) so any user can reach the binary.
# We locate it dynamically to stay version-agnostic, then tell puppeteer v19 to use it.
# PUPPETEER_SKIP_CHROMIUM_DOWNLOAD stops puppeteer from trying to download its own revision.
#
# --user host-UID:GID so files written into the mounted volume (node_modules, dist, etc.)
# are owned by the host user, not root.
# -e HOME=/tmp gives yarn a writable home for its cache (the host UID has no entry in the
# container's /etc/passwd, so $HOME would otherwise be undefined or point to a read-only path).
docker run --rm -it \
  --user "$(id -u):$(id -g)" \
  -e HOME=/tmp \
  -v "$REPO_ROOT:/repo" \
  -w /repo/demo-app \
  ghcr.io/puppeteer/puppeteer:latest \
  bash -c '. ./docker/setup-puppeteer.sh && yarn test'
