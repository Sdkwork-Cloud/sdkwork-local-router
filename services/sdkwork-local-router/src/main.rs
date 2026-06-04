use anyhow::Result;

#[tokio::main]
async fn main() -> Result<()> {
    let config_path = std::env::var("SDKWORK_LR_CONFIG_FILE")
        .ok()
        .filter(|s| !s.trim().is_empty());

    let mut config = sdkwork_local_router::load_config(config_path.as_deref())?;

    if config.storage.database_url.starts_with("sqlite:") {
        let db_path = config
            .storage
            .database_url
            .strip_prefix("sqlite:")
            .unwrap_or(&config.storage.database_url)
            .split('?')
            .next()
            .unwrap_or("data/local-router.db");
        if let Some(parent) = std::path::Path::new(db_path).parent() {
            if !parent.as_os_str().is_empty() {
                tokio::fs::create_dir_all(parent).await?;
            }
        }
    }

    if let Ok(port) = std::env::var("SDKWORK_LR_PORT") {
        if let Ok(port) = port.trim().parse::<u16>() {
            config = config.with_port(port);
        }
    }

    if let Ok(bind) = std::env::var("SDKWORK_LR_BIND") {
        if !bind.trim().is_empty() {
            config = config.with_bind(bind.trim());
        }
    }

    let log_config = sdkwork_lr_observability::TracingConfig {
        level: config.logging.level.clone(),
        json_format: config.logging.format == sdkwork_lr_config::LogFormat::Json,
    };
    sdkwork_lr_observability::init_tracing(&log_config);
    sdkwork_lr_observability::metrics::init_metrics();

    tracing::info!(
        "starting sdkwork-local-router v{}",
        env!("CARGO_PKG_VERSION")
    );
    tracing::info!(bind = %config.bind_addr(), "listen address");
    tracing::info!(upstreams = config.upstreams.len(), "configured upstreams");
    tracing::info!("proxy authentication uses database-backed client API keys");
    tracing::info!(fallback_enabled = config.fallback.enabled, "fallback");
    tracing::info!(
        rate_limit_enabled = config.rate_limit.enabled,
        "rate limiting"
    );

    for upstream in &config.upstreams {
        tracing::info!(
            name = %upstream.name,
            provider = %upstream.provider,
            base_url = %upstream.base_url,
            models = ?upstream.models,
            priority = upstream.priority,
            upstream_api_key_configured = !upstream.upstream_api_key.is_empty(),
            "upstream configured"
        );
    }

    if config.upstreams.is_empty() {
        tracing::warn!("no upstreams configured - all proxy requests will fail");
    }

    sdkwork_local_router::serve(config).await
}
