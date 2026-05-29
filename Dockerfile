FROM rust:1.85-bookworm AS builder
WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY crates/sdkwork-lr-config/Cargo.toml crates/sdkwork-lr-config/Cargo.toml
COPY crates/sdkwork-lr-core/Cargo.toml crates/sdkwork-lr-core/Cargo.toml
COPY crates/sdkwork-lr-observability/Cargo.toml crates/sdkwork-lr-observability/Cargo.toml
COPY crates/sdkwork-lr-proxy/Cargo.toml crates/sdkwork-lr-proxy/Cargo.toml
COPY crates/sdkwork-lr-store/Cargo.toml crates/sdkwork-lr-store/Cargo.toml
COPY crates/sdkwork-lr-transform/Cargo.toml crates/sdkwork-lr-transform/Cargo.toml
COPY services/sdkwork-local-router/Cargo.toml services/sdkwork-local-router/Cargo.toml

RUN mkdir -p crates/sdkwork-lr-config/src && echo "" > crates/sdkwork-lr-config/src/lib.rs && \
    mkdir -p crates/sdkwork-lr-core/src && echo "" > crates/sdkwork-lr-core/src/lib.rs && \
    mkdir -p crates/sdkwork-lr-observability/src && echo "" > crates/sdkwork-lr-observability/src/lib.rs && \
    mkdir -p crates/sdkwork-lr-proxy/src && echo "" > crates/sdkwork-lr-proxy/src/lib.rs && \
    mkdir -p crates/sdkwork-lr-store/src && echo "" > crates/sdkwork-lr-store/src/lib.rs && \
    mkdir -p crates/sdkwork-lr-transform/src && echo "" > crates/sdkwork-lr-transform/src/lib.rs && \
    mkdir -p services/sdkwork-local-router/src && echo "fn main(){}" > services/sdkwork-local-router/src/main.rs

RUN cargo build --release -p sdkwork-local-router 2>/dev/null || true

COPY . .
RUN touch crates/sdkwork-lr-config/src/lib.rs \
    crates/sdkwork-lr-core/src/lib.rs \
    crates/sdkwork-lr-observability/src/lib.rs \
    crates/sdkwork-lr-proxy/src/lib.rs \
    crates/sdkwork-lr-store/src/lib.rs \
    crates/sdkwork-lr-transform/src/lib.rs \
    services/sdkwork-local-router/src/main.rs

RUN cargo build --release -p sdkwork-local-router

FROM debian:bookworm-slim
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates && \
    rm -rf /var/lib/apt/lists/*

RUN groupadd -r appuser && useradd -r -g appuser -s /bin/false appuser

COPY --from=builder /app/target/release/sdkwork-local-router /usr/local/bin/sdkwork-local-router
COPY config.example.toml /etc/sdkwork-local-router/config.example.toml

RUN mkdir -p /app/data && chown appuser:appuser /app/data

USER appuser
WORKDIR /app

EXPOSE 8080

ENV SDKWORK_LR_CONFIG_FILE=/app/config.toml
ENV SDKWORK_LR_ENCRYPTION_SECRET=""

ENTRYPOINT ["sdkwork-local-router"]
