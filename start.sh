#!/usr/bin/env bash
set -euo pipefail
if [ -n "${FLINTWORLD_KEYS_JSON:-}" ]; then
  printf '%s' "$FLINTWORLD_KEYS_JSON" > /tmp/flintworld.keys.json
  chmod 600 /tmp/flintworld.keys.json
  export FLINTWORLD_KEYS_PATH=/tmp/flintworld.keys.json
else
  export FLINTWORLD_KEYS_PATH="${FLINTWORLD_KEYS_FILE:-./flintworld.keys.json}"
fi
exec node server.mjs
