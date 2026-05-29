use tracing_subscriber::{fmt, EnvFilter};

pub mod metrics;

pub struct TracingConfig {
    pub level: String,
    pub json_format: bool,
}

pub fn init_tracing(config: &TracingConfig) {
    let filter = EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| EnvFilter::new(&config.level));

    if config.json_format {
        fmt().json().with_env_filter(filter).init();
    } else {
        fmt().with_env_filter(filter).init();
    }
}
