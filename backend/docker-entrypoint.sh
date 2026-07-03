#!/bin/sh
set -e

NODE_OPTIONS=--no-deprecation node_modules/.bin/payload migrate

exec "$@"
