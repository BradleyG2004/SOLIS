#!/bin/sh
set -e

chown -R nextjs:nodejs ./media

su-exec nextjs:nodejs sh -c "NODE_OPTIONS=--no-deprecation node_modules/.bin/payload migrate"

exec su-exec nextjs:nodejs "$@"
