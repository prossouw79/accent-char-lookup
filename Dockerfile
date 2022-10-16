FROM node:16-buster

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev

# Install RUST
RUN curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | bash -s -- -y

WORKDIR /build

COPY . .

RUN chmod +x build.sh

CMD ./build.sh