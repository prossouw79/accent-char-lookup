# Accent Character Lookup

## Setup

### Install rust
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
### Install nodejs (recommended via nvm)
```bash
nvm install 16 --lts
nvm use 16
```

## Development

### Ubuntu packages
```bash
# sudo apt install -y \
#     build-essential \
#     libatk1.0-dev \
#     libcairo2-dev \
#     libdbus-glib-1-dev \
#     libgdk-pixbuf-2.0-dev \
#     libgdk-pixbuf2.0-dev \
#     libgdk3.0-cil-dev \
#     libgirepository1.0-dev \
#     libjavascriptcoregtk-4.0-dev \
#     libsdl-pango-dev \
#     libsoup2.4-dev \
#     pango1.0-tools \
#     libwebkit2gtk-4.0-dev \
#     libwebkit2gtk-4.0-37 \
#     libgtk-3-0 \
#     libayatana-appindicator3-1
```


```bash
npm install -g @angular/cli
# terminal 1 (UI localhost for hot-reload)
npm run ui-dev

# terminal 2 (for the Rust/App hot-reload)
npm run tauri dev
```


## Build 