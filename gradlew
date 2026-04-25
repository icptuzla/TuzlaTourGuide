#!/usr/bin/env sh
set -eu

# Convenience wrapper: run the Android Gradle build from the project root.
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$SCRIPT_DIR/android"
exec ./gradlew "$@"

