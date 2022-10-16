#!/usr/bin/env bash

set -e
echo "Building Frontend"
npm run ui-build

echo "Building Backend"
export PATH="/$HOME/.cargo/bin:${PATH}"
export CRATE_HOME="$PWD/src-tauri/crate-cache"
mkdir -p $CRATE_HOME
npm install
cd src-tauri
cargo build
cd -
echo "Building AppImage & .deb"
npm run tauri build
echo "Done"