#!/usr/bin/env bash
set -euo pipefail
if [ -n "${FLINTWORLD_KEYS_JSON:-}" ]; then
  printf '%s' "$FLINTWORLD_KEYS_JSON" > /tmp/flintworld.keys.json
  chmod 600 /tmp/flintworld.keys.json
  KEYS=/tmp/flintworld.keys.json
else
  KEYS="${FLINTWORLD_KEYS_FILE:-./flintworld.keys.json}"
fi
exec npx worldnew run flintworld --deploy worlds/flintworld/deploy.46630.json --keys "$KEYS" --port "${PORT:-8790}" --trust-proxy last-hop
