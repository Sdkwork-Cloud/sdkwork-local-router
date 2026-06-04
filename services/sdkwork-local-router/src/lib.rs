pub mod api_groups;
pub mod auth;
pub mod integration;
pub mod passthrough;
pub mod rate_limit;
pub mod router;
pub mod server;
pub mod streaming;

pub use sdkwork_lr_config as config;
pub use sdkwork_lr_core as core;
pub use sdkwork_lr_proxy as proxy;
pub use sdkwork_lr_store as store;

pub use config::RuntimeConfig;

pub fn load_config(path: Option<&str>) -> anyhow::Result<RuntimeConfig> {
    RuntimeConfig::from_file_or_env(path).map_err(anyhow::Error::msg)
}

pub async fn serve(config: RuntimeConfig) -> anyhow::Result<()> {
    server::serve(config).await
}
