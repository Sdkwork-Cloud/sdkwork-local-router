﻿pub mod account_pool;
pub mod health;
pub mod invocation;
pub mod interceptor;

use serde::{Deserialize, Serialize};
use std::fmt;

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub enum ProviderKind {
    Openai,
    Anthropic,
    Google,
    Custom(String),
}

impl ProviderKind {
    pub fn from_str_loose(s: &str) -> Self {
        match s.trim().to_ascii_lowercase().as_str() {
            "openai" | "open_ai" => Self::Openai,
            "anthropic" | "claude" => Self::Anthropic,
            "google" | "gemini" => Self::Google,
            other => Self::Custom(other.to_owned()),
        }
    }

    pub fn to_protocol(&self) -> Protocol {
        match self {
            Self::Openai => Protocol::Openai,
            Self::Anthropic => Protocol::Anthropic,
            Self::Google => Protocol::Google,
            Self::Custom(_) => Protocol::Openai,
        }
    }
}

impl fmt::Display for ProviderKind {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Openai => f.write_str("openai"),
            Self::Anthropic => f.write_str("anthropic"),
            Self::Google => f.write_str("google"),
            Self::Custom(name) => f.write_str(name),
        }
    }
}

impl Serialize for ProviderKind {
    fn serialize<S: serde::Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.serialize_str(&self.to_string())
    }
}

impl<'de> Deserialize<'de> for ProviderKind {
    fn deserialize<D: serde::Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
        let s = String::deserialize(deserializer)?;
        Ok(Self::from_str_loose(&s))
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Protocol {
    Openai,
    Anthropic,
    Google,
}

impl Protocol {
    pub fn from_path_prefix(prefix: &str) -> Option<Self> {
        match prefix.trim().trim_start_matches('/').to_ascii_lowercase().as_str() {
            "v1" | "openai" => Some(Self::Openai),
            "anthropic" => Some(Self::Anthropic),
            "google" => Some(Self::Google),
            _ => None,
        }
    }
}

impl fmt::Display for Protocol {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Openai => f.write_str("openai"),
            Self::Anthropic => f.write_str("anthropic"),
            Self::Google => f.write_str("google"),
        }
    }
}

pub use account_pool::{Account, AccountPool, RoutingStrategy};
pub use health::{AccountHealth, AccountHealthSnapshot, CircuitBreakerConfig, HealthManager, HealthState};
pub use invocation::{Invocation, InvocationStatus, TokenUsage};
pub use interceptor::{Interceptor, InterceptorChain, LoggingInterceptor, MetricsInterceptor};
