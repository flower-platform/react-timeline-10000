#!/usr/bin/env bash
# Source this script (. ./setup-puppeteer.sh) to configure puppeteer v19 to use the
# Chrome for Testing binary shipped by ghcr.io/puppeteer/puppeteer instead of downloading
# its own Chromium revision (which would fail or waste time in CI/Docker).
#
# The binary lives at a version-specific path inside pptruser's home, e.g.:
#   /home/pptruser/.cache/puppeteer/chrome/<version>/chrome-linux64/chrome
# All parent directories are 755, so any UID can reach it.
CHROME=$(find /home/pptruser/.cache/puppeteer -name "chrome" -type f 2>/dev/null | head -1)
echo "[setup-puppeteer] Using Chrome: $CHROME"
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH="$CHROME"
