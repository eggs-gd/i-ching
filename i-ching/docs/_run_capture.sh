#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
npx playwright install chromium
node docs/capture-sync-button-states.mjs
