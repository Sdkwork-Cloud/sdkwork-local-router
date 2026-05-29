use serde::Deserialize;
use std::collections::BTreeMap;
use std::path::{Path, PathBuf};
use std::time::Duration;

#[derive(Debug, Clone, Default, Deserialize)]
#[serde(default)]
pub struct RuntimeTomlConfig {
    pub server: ServerSectionConfig,
    pub auth: AuthSectionConfig,
    pub storage: StorageSectionConfig,
    pub logging: LoggingSectionConfig,
    pub base_paths: BasePathSectionConfig,
    pub upstreams: Vec<UpstreamSectionConfig>,
    pub fallback: FallbackSectionConfig,
    pub rate_limit: RateLimitSectionConfig,
    pub cors: CorsSectionConfig,
    pub routing: RoutingSectionConfig,
    pub recording: RecordingSectionConfig,
    pub circuit_breaker: CircuitBreakerSectionConfig,
    pub health_probe: HealthProbeSectionConfig,
}

#[derive(Debug, Clone, Default, Deserialize)]
#[serde(default)]
pub struct ServerSectionConfig {
    pub bind: Option<String>,
    pub port: Option<u16>,
    pub max_body_size_mb: Option<u64>,
}

#[derive(Debug, Clone, Default, Deserialize)]
#[serde(default)]
pub struct AuthSectionConfig {
    pub mode: Option<String>,
    pub api_keys: Vec<String>,
}

#[derive(Debug, Clone, Default, Deserialize)]
#[serde(default)]
pub struct StorageSectionConfig {
    pub database_url: Option<String>,
    pub encryption_secret: Option<String>,
}

#[derive(Debug, Clone, Default, Deserialize)]
#[serde(default)]
pub struct LoggingSectionConfig {
    pub level: Option<String>,
    pub format: Option<String>,
}

#[derive(Debug, Clone, Default, Deserialize)]
#[serde(default)]
pub struct BasePathSectionConfig {
    pub openai: Option<String>,
    pub anthropic: Option<String>,
    pub google: Option<String>,
}

#[derive(Debug, Clone, Default, Deserialize)]
#[serde(default)]
pub struct UpstreamSectionConfig {
    pub name: String,
    pub provider: String,
    pub base_url: String,
    pub api_key: Option<String>,
    pub models: Vec<String>,
    pub priority: Option<u32>,
    pub timeout_secs: Option<u64>,
    pub max_retries: Option<u32>,
    pub retry_delay_ms: Option<u64>,
    pub anthropic_version: Option<String>,
    pub default_headers: BTreeMap<String, String>,
    pub model_aliases: BTreeMap<String, String>,
}

#[derive(Debug, Clone, Default, Deserialize)]
#[serde(default)]
pub struct FallbackSectionConfig {
    pub enabled: Option<bool>,
    pub max_attempts: Option<u32>,
}

#[derive(Debug, Clone, Default, Deserialize)]
#[serde(default)]
pub struct RateLimitSectionConfig {
    pub enabled: Option<bool>,
    pub max_requests: Option<u64>,
    pub window_secs: Option<u64>,
}

#[derive(Debug, Clone, Default, Deserialize)]
#[serde(default)]
pub struct CorsSectionConfig {
    pub allowed_origins: Vec<String>,
}

#[derive(Debug, Clone, Default, Deserialize)]
#[serde(default)]
pub struct RoutingSectionConfig {
    pub strategy: Option<String>,
}

#[derive(Debug, Clone, Default, Deserialize)]
#[serde(default)]
pub struct RecordingSectionConfig {
    pub save_request_body: Option<bool>,
    pub save_response_body: Option<bool>,
    pub retention_days: Option<i64>,
}

#[derive(Debug, Clone, Default, Deserialize)]
#[serde(default)]
pub struct CircuitBreakerSectionConfig {
    pub failure_threshold: Option<u32>,
    pub success_threshold: Option<u32>,
    pub open_duration_secs: Option<u64>,
    pub half_open_max_requests: Option<u32>,
}

#[derive(Debug, Clone, Default, Deserialize)]
#[serde(default)]
pub struct HealthProbeSectionConfig {
    pub enabled: Option<bool>,
    pub interval_secs: Option<u64>,
    pub probe_timeout_secs: Option<u64>,
}

#[derive(Debug, Clone)]
pub struct RuntimeConfig {
    pub server: ServerConfig,
    pub auth: AuthConfig,
    pub storage: StorageConfig,
    pub logging: LoggingConfig,
    pub base_paths: BasePathConfig,
    pub upstreams: Vec<UpstreamConfig>,
    pub fallback: FallbackConfig,
    pub rate_limit: RateLimitConfig,
    pub cors: CorsConfig,
    pub routing: RoutingConfig,
    pub recording: RecordingConfig,
    pub circuit_breaker: CircuitBreakerConfig,
    pub health_probe: HealthProbeConfig,
    pub config_file_path: Option<String>,
}

#[derive(Debug, Clone)]
pub struct ServerConfig {
    pub bind: String,
    pub port: u16,
    pub max_body_size_mb: u64,
}

impl ServerConfig {
    pub fn max_body_size_bytes(&self) -> usize {
        (self.max_body_size_mb as usize) * 1024 * 1024
    }
}

#[derive(Debug, Clone)]
pub struct AuthConfig {
    pub mode: AuthMode,
    pub api_keys: Vec<String>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum AuthMode {
    None,
    StaticKey,
}

#[derive(Debug, Clone)]
pub struct StorageConfig {
    pub database_url: String,
    pub encryption_secret: String,
}

#[derive(Debug, Clone)]
pub struct LoggingConfig {
    pub level: String,
    pub format: LogFormat,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum LogFormat {
    Json,
    Text,
}

#[derive(Debug, Clone)]
pub struct BasePathConfig {
    pub openai: String,
    pub anthropic: String,
    pub google: String,
}

#[derive(Debug, Clone)]
pub struct UpstreamConfig {
    pub name: String,
    pub provider: sdkwork_lr_core::ProviderKind,
    pub base_url: String,
    pub api_key: String,
    pub models: Vec<String>,
    pub priority: u32,
    pub timeout: Duration,
    pub max_retries: u32,
    pub retry_delay_ms: u64,
    pub anthropic_version: Option<String>,
    pub default_headers: BTreeMap<String, String>,
    pub model_aliases: BTreeMap<String, String>,
}

#[derive(Debug, Clone)]
pub struct FallbackConfig {
    pub enabled: bool,
    pub max_attempts: u32,
}

#[derive(Debug, Clone)]
pub struct RateLimitConfig {
    pub enabled: bool,
    pub max_requests: u64,
    pub window_secs: u64,
}

#[derive(Debug, Clone)]
pub struct CorsConfig {
    pub allowed_origins: Vec<String>,
}

impl CorsConfig {
    pub fn is_allow_any(&self) -> bool {
        self.allowed_origins.iter().any(|o| o == "*")
    }
}

#[derive(Debug, Clone)]
pub struct RoutingConfig {
    pub strategy: sdkwork_lr_core::RoutingStrategy,
}

#[derive(Debug, Clone)]
pub struct RecordingConfig {
    pub save_request_body: bool,
    pub save_response_body: bool,
    pub retention_days: i64,
}

#[derive(Debug, Clone)]
pub struct CircuitBreakerConfig {
    pub failure_threshold: u32,
    pub success_threshold: u32,
    pub open_duration: Duration,
    pub half_open_max_requests: u32,
}

impl Default for CircuitBreakerConfig {
    fn default() -> Self {
        Self {
            failure_threshold: 5,
            success_threshold: 3,
            open_duration: Duration::from_secs(60),
            half_open_max_requests: 2,
        }
    }
}

#[derive(Debug, Clone)]
pub struct HealthProbeConfig {
    pub enabled: bool,
    pub interval_secs: u64,
    pub probe_timeout_secs: u64,
}

impl Default for HealthProbeConfig {
    fn default() -> Self {
        Self {
            enabled: true,
            interval_secs: 30,
            probe_timeout_secs: 10,
        }
    }
}

impl RuntimeTomlConfig {
    pub fn from_config_file(path: impl AsRef<Path>) -> Result<Self, String> {
        let path = path.as_ref();
        let content = std::fs::read_to_string(path)
            .map_err(|e| format!("failed to read config file {}: {e}", path.display()))?;
        toml::from_str(&content).map_err(|e| format!("invalid TOML in {}: {e}", path.display()))
    }

    pub fn from_env_config_file() -> Result<Option<Self>, String> {
        let Some(path) = env_optional("SDKWORK_LR_CONFIG_FILE") else {
            return Ok(None);
        };
        let path = PathBuf::from(path);
        if !path.exists() {
            return Ok(None);
        }
        Self::from_config_file(path).map(Some)
    }
}

impl RuntimeConfig {
    pub fn from_toml(toml_config: &RuntimeTomlConfig) -> Result<Self, String> {
        let bind = config_value("SDKWORK_LR_BIND", toml_config.server.bind.as_deref())
            .unwrap_or_else(|| "127.0.0.1".to_owned());
        let port = env_u16("SDKWORK_LR_PORT").or(toml_config.server.port).unwrap_or(8080);

        let auth_mode = config_value("SDKWORK_LR_AUTH_MODE", toml_config.auth.mode.as_deref())
            .unwrap_or_else(|| "none".to_owned());
        let auth_mode = match auth_mode.to_ascii_lowercase().as_str() {
            "static-key" | "static_key" => AuthMode::StaticKey,
            "none" => AuthMode::None,
            other => return Err(format!("unknown auth.mode '{}': expected 'static-key' or 'none'", other)),
        };

        let database_url = config_value("SDKWORK_LR_DATABASE_URL", toml_config.storage.database_url.as_deref())
            .unwrap_or_else(|| format!("sqlite:./data/local-router-{port}.db?mode=rwc"));

        let log_level = config_value("SDKWORK_LR_LOG_LEVEL", toml_config.logging.level.as_deref())
            .unwrap_or_else(|| "info".to_owned());
        let log_format_str = config_value("SDKWORK_LR_LOG_FORMAT", toml_config.logging.format.as_deref())
            .unwrap_or_else(|| "text".to_owned());
        let log_format = match log_format_str.to_ascii_lowercase().as_str() {
            "json" => LogFormat::Json,
            _ => LogFormat::Text,
        };

        let base_paths = BasePathConfig {
            openai: toml_config.base_paths.openai.clone().unwrap_or_else(|| "/v1".to_owned()),
            anthropic: toml_config.base_paths.anthropic.clone().unwrap_or_else(|| "/anthropic".to_owned()),
            google: toml_config.base_paths.google.clone().unwrap_or_else(|| "/google".to_owned()),
        };

        if base_paths.openai == base_paths.anthropic
            || base_paths.openai == base_paths.google
            || base_paths.anthropic == base_paths.google
        {
            return Err(format!(
                "base_paths must be unique: openai='{}', anthropic='{}', google='{}'",
                base_paths.openai, base_paths.anthropic, base_paths.google
            ));
        }

        let max_body_size_mb = toml_config.server.max_body_size_mb.unwrap_or(50);
        if max_body_size_mb < 1 {
            return Err(format!("server.max_body_size_mb must be at least 1, got {}", max_body_size_mb));
        }

        let mut upstreams = Vec::new();
        for u in &toml_config.upstreams {
            if u.name.is_empty() {
                return Err("upstream name must not be blank".to_owned());
            }
            if u.base_url.is_empty() {
                return Err(format!("upstream {}: base_url must not be blank", u.name));
            }
            let api_key = resolve_env_or_value(u.api_key.as_deref()).unwrap_or_default();
            upstreams.push(UpstreamConfig {
                name: u.name.clone(),
                provider: sdkwork_lr_core::ProviderKind::from_str_loose(&u.provider),
                base_url: u.base_url.trim_end_matches('/').to_owned(),
                api_key,
                models: u.models.clone(),
                priority: u.priority.unwrap_or(10),
                timeout: Duration::from_secs(u.timeout_secs.unwrap_or(120)),
                max_retries: u.max_retries.unwrap_or(0),
                retry_delay_ms: u.retry_delay_ms.unwrap_or(500),
                anthropic_version: u.anthropic_version.clone(),
                default_headers: u.default_headers.clone(),
                model_aliases: u.model_aliases.clone(),
            });

        let window_secs = toml_config.rate_limit.window_secs.unwrap_or(60);
        if window_secs < 1 {
            return Err(format!("rate_limit.window_secs must be at least 1, got {}", window_secs));
        }
        let fallback_max_attempts = toml_config.fallback.max_attempts.unwrap_or(3);
        if fallback_max_attempts < 1 || fallback_max_attempts > 20 {
            return Err(format!("fallback.max_attempts must be between 1 and 20, got {}", fallback_max_attempts));
        }
        let health_interval = toml_config.health_probe.interval_secs.unwrap_or(30);
        if health_interval < 5 {
            return Err(format!("health_probe.interval_secs must be at least 5, got {}", health_interval));
        }
        let probe_timeout = toml_config.health_probe.probe_timeout_secs.unwrap_or(10);
        if probe_timeout < 1 || probe_timeout > health_interval {
            return Err(format!(
                "health_probe.probe_timeout_secs ({}) must be >= 1 and < interval_secs ({})",
                probe_timeout, health_interval
            ));
        }
        let encryption_secret = toml_config.storage.encryption_secret
            .or_else(|| std::env::var("SDKWORK_LR_ENCRYPTION_SECRET").ok())
            .unwrap_or_default();
        if !encryption_secret.is_empty() && encryption_secret.len() < 8 {
            return Err("encryption_secret must be at least 8 characters for adequate security".to_owned());
        }

        Ok(Self {
            server: ServerConfig {
                bind,
                port,
                max_body_size_mb,
            },
            auth: AuthConfig { mode: auth_mode, api_keys: toml_config.auth.api_keys.clone() },
            storage: StorageConfig {
                database_url,
                encryption_secret,
            },
            logging: LoggingConfig { level: log_level, format: log_format },
            base_paths,
            upstreams,
            fallback: FallbackConfig {
                enabled: toml_config.fallback.enabled.unwrap_or(true),
                max_attempts: fallback_max_attempts,
            },
            rate_limit: RateLimitConfig {
                enabled: toml_config.rate_limit.enabled.unwrap_or(false),
                max_requests: toml_config.rate_limit.max_requests.unwrap_or(60),
                window_secs,
            },
            cors: CorsConfig {
                allowed_origins: if toml_config.cors.allowed_origins.is_empty() {
                    vec!["http://localhost:*".to_owned()]
                } else {
                    toml_config.cors.allowed_origins.clone()
                },
            },
            routing: RoutingConfig {
                strategy: match toml_config.routing.strategy.as_deref().unwrap_or("priority") {
                    "round_robin" => sdkwork_lr_core::RoutingStrategy::RoundRobin,
                    "random" => sdkwork_lr_core::RoutingStrategy::Random,
                    "least_latency" => sdkwork_lr_core::RoutingStrategy::LeastLatency,
                    "priority" => sdkwork_lr_core::RoutingStrategy::Priority,
                    other => return Err(format!("unknown routing.strategy '{}': expected 'priority', 'round_robin', 'random', or 'least_latency'", other)),
                },
            },
            recording: RecordingConfig {
                save_request_body: toml_config.recording.save_request_body.unwrap_or(false),
                save_response_body: toml_config.recording.save_response_body.unwrap_or(false),
                retention_days: toml_config.recording.retention_days.unwrap_or(30).max(1),
            },
            circuit_breaker: CircuitBreakerConfig {
                failure_threshold: toml_config.circuit_breaker.failure_threshold.unwrap_or(5),
                success_threshold: toml_config.circuit_breaker.success_threshold.unwrap_or(3),
                open_duration: Duration::from_secs(toml_config.circuit_breaker.open_duration_secs.unwrap_or(60)),
                half_open_max_requests: toml_config.circuit_breaker.half_open_max_requests.unwrap_or(2),
            },
            health_probe: HealthProbeConfig {
                enabled: toml_config.health_probe.enabled.unwrap_or(true),
                interval_secs: health_interval,
                probe_timeout_secs: probe_timeout,
            },
            config_file_path: None,
        })
    }

    pub fn from_file_or_env(config_path: Option<&str>) -> Result<Self, String> {
        let resolved_path = config_path
            .map(|p| p.to_owned())
            .or_else(|| env_optional("SDKWORK_LR_CONFIG_FILE"))
            .filter(|p| !p.trim().is_empty() && std::path::Path::new(p).exists());

        let toml_config = if let Some(ref path) = resolved_path {
            RuntimeTomlConfig::from_config_file(path)?
        } else {
            RuntimeTomlConfig::from_env_config_file()?.unwrap_or_default()
        };
        let mut config = Self::from_toml(&toml_config)?;
        config.config_file_path = resolved_path;
        Ok(config)
    }

    pub fn bind_addr(&self) -> String {
        format!("{}:{}", self.server.bind, self.server.port)
    }

    pub fn with_port(mut self, port: u16) -> Self {
        self.server.port = port;
        self
    }

    pub fn with_bind(mut self, bind: impl Into<String>) -> Self {
        self.server.bind = bind.into();
        self
    }
}

fn env_optional(name: &str) -> Option<String> {
    std::env::var(name).ok().map(|v| v.trim().to_owned()).filter(|v| !v.is_empty())
}

fn config_value(env_name: &str, config_value: Option<&str>) -> Option<String> {
    env_optional(env_name).or_else(|| config_value.map(|v| v.trim().to_owned()).filter(|v| !v.is_empty()))
}

fn env_u16(name: &str) -> Option<u16> {
    env_optional(name).and_then(|v| v.parse::<u16>().ok())
}

fn resolve_env_or_value(value: Option<&str>) -> Option<String> {
    let value = value?;
    let trimmed = value.trim();
    if trimmed.starts_with("${") && trimmed.ends_with('}') {
        let inner = &trimmed[2..trimmed.len() - 1];
        if let Some(colon_pos) = inner.find(":-") {
            let var_name = &inner[..colon_pos];
            let default = &inner[colon_pos + 2..];
            match std::env::var(var_name) {
                Ok(v) if !v.trim().is_empty() => Some(v),
                _ => {
                    if default.is_empty() {
                        None
                    } else {
                        Some(default.to_owned())
                    }
                }
            }
        } else {
            let var_name = inner;
            match std::env::var(var_name) {
                Ok(v) if !v.trim().is_empty() => Some(v),
                _ => {
                    tracing::warn!(var = var_name, "environment variable not set or empty");
                    None
                }
            }
        }
    } else {
        Some(trimmed.to_owned())
    }
}
