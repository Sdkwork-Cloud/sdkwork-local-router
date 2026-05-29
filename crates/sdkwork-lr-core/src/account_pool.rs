use std::sync::Arc;

use std::collections::{BTreeMap, HashMap};
use std::sync::atomic::{AtomicU64, Ordering};
use std::sync::LazyLock;
use std::time::Duration;

use parking_lot::RwLock;
use serde::{Deserialize, Serialize};

use crate::ProviderKind;
use crate::health::HealthManager;

static REGEX_CACHE: LazyLock<parking_lot::Mutex<std::collections::HashMap<String, regex::Regex>>> = LazyLock::new(|| parking_lot::Mutex::new(std::collections::HashMap::new()));

mod duration_secs {
    use serde::{self, Deserialize, Deserializer, Serializer};
    use std::time::Duration;

    pub fn serialize<S: Serializer>(dur: &Duration, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.serialize_u64(dur.as_secs())
    }

    pub fn deserialize<'de, D: Deserializer<'de>>(deserializer: D) -> Result<Duration, D::Error> {
        let secs = u64::deserialize(deserializer)?;
        Ok(Duration::from_secs(secs))
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RoutingStrategy {
    Priority,
    RoundRobin,
    Random,
    LeastLatency,
}

impl Default for RoutingStrategy {
    fn default() -> Self {
        Self::Priority
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Account {
    pub name: String,
    pub provider: ProviderKind,
    pub base_url: String,
    #[serde(skip_serializing, default)]
    pub api_key: String,
    pub models: Vec<String>,
    pub priority: u32,
    #[serde(with = "duration_secs")]
    pub timeout: Duration,
    pub max_retries: u32,
    #[serde(default = "default_retry_delay")]
    pub retry_delay_ms: u64,
    pub anthropic_version: Option<String>,
    pub default_headers: BTreeMap<String, String>,
    pub enabled: bool,
    pub model_aliases: BTreeMap<String, String>,
}

fn default_retry_delay() -> u64 { 500 }

#[derive(Debug, Clone)]
struct AccountState {
    account: Arc<Account>,
    total_requests: AtomicU64,
    total_latency_ms: AtomicU64,
}

#[derive(Debug, Clone)]
pub struct AccountPool {
    accounts: Arc<Vec<AccountState>>,
    name_index: Arc<HashMap<String, usize>>,
    strategy: Arc<RwLock<RoutingStrategy>>,
    round_robin_counter: Arc<AtomicU64>,
    health_manager: Arc<HealthManager>,
}

impl AccountPool {
    fn build_name_index(accounts: &[AccountState]) -> HashMap<String, usize> {
        accounts.iter().enumerate()
            .map(|(i, s)| (s.account.name.clone(), i))
            .collect()
    }

    pub fn new(accounts: Vec<Account>) -> Self {
        Self::with_strategy(accounts, RoutingStrategy::Priority)
    }

    pub fn with_strategy(accounts: Vec<Account>, strategy: RoutingStrategy) -> Self {
        let health_manager = Arc::new(HealthManager::new(Default::default()));
        let states: Vec<AccountState> = accounts.iter().map(|a| AccountState {
            account: Arc::new(a.clone()),
            total_requests: AtomicU64::new(0),
            total_latency_ms: AtomicU64::new(0),
        }).collect();
        health_manager.register_all(&accounts.iter().map(|a| a.name.clone()).collect::<Vec<_>>());
        let name_index = Self::build_name_index(&states);
        Self {
            accounts: Arc::new(states),
            name_index: Arc::new(name_index),
            strategy: Arc::new(RwLock::new(strategy)),
            round_robin_counter: Arc::new(AtomicU64::new(0)),
            health_manager,
        }
    }

    pub fn with_health_manager(accounts: Vec<Account>, strategy: RoutingStrategy, health_manager: Arc<HealthManager>) -> Self {
        let states: Vec<AccountState> = accounts.iter().map(|a| AccountState {
            account: Arc::new(a.clone()),
            total_requests: AtomicU64::new(0),
            total_latency_ms: AtomicU64::new(0),
        }).collect();
        health_manager.register_all(&accounts.iter().map(|a| a.name.clone()).collect::<Vec<_>>());
        let name_index = Self::build_name_index(&states);
        Self {
            accounts: Arc::new(states),
            name_index: Arc::new(name_index),
            strategy: Arc::new(RwLock::new(strategy)),
            round_robin_counter: Arc::new(AtomicU64::new(0)),
            health_manager,
        }
    }

    pub fn empty() -> Self {
        Self {
            accounts: Arc::new(Vec::new()),
            name_index: Arc::new(HashMap::new()),
            strategy: Arc::new(RwLock::new(RoutingStrategy::Priority)),
            round_robin_counter: Arc::new(AtomicU64::new(0)),
            health_manager: Arc::new(HealthManager::new(Default::default())),
        }
    }

    pub fn accounts(&self) -> Vec<&Account> {
        self.accounts.iter().map(|s| s.account.as_ref()).collect()
    }

    pub fn enabled_accounts(&self) -> Vec<&Account> {
        self.accounts.iter()
            .filter(|s| s.account.enabled)
            .map(|s| s.account.as_ref())
            .collect()
    }

    pub fn enabled_accounts_arc(&self) -> Vec<Arc<Account>> {
        self.accounts.iter()
            .filter(|s| s.account.enabled)
            .map(|s| s.account.clone())
            .collect()
    }

    pub fn len(&self) -> usize {
        self.accounts.len()
    }

    pub fn is_empty(&self) -> bool {
        self.accounts.is_empty()
    }

    pub fn strategy(&self) -> RoutingStrategy {
        *self.strategy.read()
    }

    pub fn set_strategy(&self, strategy: RoutingStrategy) {
        let mut s = self.strategy.write();
        tracing::info!(old = ?*s, new = ?strategy, "routing strategy changed");
        *s = strategy;
    }

    pub fn health_manager(&self) -> &Arc<HealthManager> {
        &self.health_manager
    }

    pub fn select(&self, model: &str) -> Option<Arc<Account>> {
        let current_strategy = *self.strategy.read();
        let matched: Vec<&AccountState> = self.accounts.iter()
            .filter(|s| {
                s.account.enabled
                    && model_matches(model, &s.account.models)
                    && self.health_manager.is_available(&s.account.name)
            })
            .collect();

        if matched.is_empty() {
            return None;
        }

        match current_strategy {
            RoutingStrategy::Priority => {
                matched.into_iter()
                    .min_by_key(|s| s.account.priority)
                    .map(|s| s.account.clone())
            }
            RoutingStrategy::RoundRobin => {
                let count = matched.len();
                let idx = self.round_robin_counter.fetch_add(1, Ordering::Relaxed) as usize % count;
                Some(matched[idx].account.clone())
            }
            RoutingStrategy::Random => {
                use rand::Rng;
                let idx = rand::thread_rng().gen_range(0..matched.len());
                Some(matched[idx].account.clone())
            }
            RoutingStrategy::LeastLatency => {
                matched.into_iter()
                    .min_by_key(|s| {
                        let reqs = s.total_requests.load(Ordering::Relaxed);
                        if reqs == 0 { return u64::MAX; }
                        s.total_latency_ms.load(Ordering::Relaxed) / reqs
                    })
                    .map(|s| s.account.clone())
            }
        }
    }

    pub fn select_all(&self, model: &str) -> Vec<Arc<Account>> {
        let mut matched: Vec<&AccountState> = self.accounts.iter()
            .filter(|s| {
                s.account.enabled
                    && model_matches(model, &s.account.models)
                    && self.health_manager.is_available(&s.account.name)
            })
            .collect();
        matched.sort_by_key(|s| s.account.priority);
        matched.into_iter().map(|s| s.account.clone()).collect()
    }

    pub fn record_latency(&self, account_name: &str, latency_ms: u64) {
        if let Some(&idx) = self.name_index.get(account_name) {
            if let Some(state) = self.accounts.get(idx) {
                state.total_requests.fetch_add(1, Ordering::Relaxed);
                state.total_latency_ms.fetch_add(latency_ms, Ordering::Relaxed);
            }
        }
    }

    pub fn reload(&mut self, accounts: Vec<Account>) {
        let names: Vec<String> = accounts.iter().map(|a| a.name.clone()).collect();
        let states: Vec<AccountState> = accounts.into_iter().map(|a| AccountState {
            account: Arc::new(a),
            total_requests: AtomicU64::new(0),
            total_latency_ms: AtomicU64::new(0),
        }).collect();
        self.health_manager.register_all(&names);
        self.name_index = Arc::new(Self::build_name_index(&states));
        self.accounts = Arc::new(states);
    }
}

fn model_matches(model: &str, patterns: &[String]) -> bool {
    patterns.iter().any(|p| {
        if p == "*" || p == ".*" {
            return true;
        }
        if p.ends_with('*') && !p.starts_with('/') {
            return model.starts_with(&p[..p.len() - 1]);
        }
        if p.starts_with('*') && !p.ends_with('/') {
            return model.ends_with(&p[1..]);
        }
        if p.starts_with('/') && p.ends_with('/') {
            let pattern_str = &p[1..p.len() - 1];
            let mut cache = REGEX_CACHE.lock();
            if let Some(re) = cache.get(pattern_str) {
                return re.is_match(model);
            }
            if let Ok(re) = regex::Regex::new(pattern_str) {
                cache.insert(pattern_str.to_owned(), re.clone());
                return re.is_match(model);
            }
            return false;
        }
        model == p
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    fn make_account(name: &str, models: Vec<&str>, priority: u32) -> Account {
        Account {
            name: name.to_owned(),
            provider: ProviderKind::Openai,
            base_url: "https://api.openai.com".to_owned(),
            api_key: "test-key".to_owned(),
            models: models.into_iter().map(String::from).collect(),
            priority,
            timeout: Duration::from_secs(30),
            max_retries: 0,
            retry_delay_ms: 500,
            anthropic_version: None,
            default_headers: BTreeMap::new(),
            enabled: true,
            model_aliases: BTreeMap::new(),
        }
    }

    #[test]
    fn test_select_by_priority() {
        let pool = AccountPool::with_strategy(vec![
            make_account("low", vec!["gpt-4"], 20),
            make_account("high", vec!["gpt-4"], 1),
        ], RoutingStrategy::Priority);
        let selected = pool.select("gpt-4").unwrap();
        assert_eq!(selected.name, "high");
    }

    #[test]
    fn test_select_no_match() {
        let accounts = vec![make_account("a", vec!["gpt-4"], 10)];
        let pool = AccountPool::with_strategy(accounts, RoutingStrategy::Priority);
        assert!(pool.select("claude-3").is_none());
    }

    #[test]
    fn test_select_filters_unhealthy() {
        let accounts = vec![
            make_account("healthy", vec!["gpt-4"], 10),
            make_account("sick", vec!["gpt-4"], 10),
        ];
        let pool = AccountPool::with_strategy(accounts, RoutingStrategy::Priority);
        for _ in 0..5 {
            pool.health_manager().record_failure("sick");
        }
        let selected = pool.select("gpt-4").unwrap();
        assert_eq!(selected.name, "healthy");
    }

    #[test]
    fn test_select_all_sorted_by_priority() {
        let pool = AccountPool::with_strategy(vec![
            make_account("low", vec!["gpt-4"], 30),
            make_account("mid", vec!["gpt-4"], 20),
            make_account("high", vec!["gpt-4"], 10),
        ], RoutingStrategy::Priority);
        let all = pool.select_all("gpt-4");
        assert_eq!(all.len(), 3);
        assert_eq!(all[0].name, "high");
        assert_eq!(all[1].name, "mid");
        assert_eq!(all[2].name, "low");
    }

    #[test]
    fn test_dynamic_strategy_switch() {
        let accounts = vec![
            make_account("a", vec!["gpt-4"], 10),
            make_account("b", vec!["gpt-4"], 10),
        ];
        let pool = AccountPool::with_strategy(accounts, RoutingStrategy::Priority);
        assert_eq!(pool.strategy(), RoutingStrategy::Priority);
        pool.set_strategy(RoutingStrategy::RoundRobin);
        assert_eq!(pool.strategy(), RoutingStrategy::RoundRobin);
    }

    #[test]
    fn test_enabled_accounts_only() {
        let mut accounts = vec![
            make_account("enabled", vec!["gpt-4"], 10),
            make_account("disabled", vec!["gpt-4"], 10),
        ];
        accounts[1].enabled = false;
        let pool = AccountPool::with_strategy(accounts, RoutingStrategy::Priority);
        let enabled = pool.enabled_accounts();
        assert_eq!(enabled.len(), 1);
        assert_eq!(enabled[0].name, "enabled");
    }

    #[test]
    fn test_record_latency() {
        let accounts = vec![make_account("a", vec!["gpt-4"], 10)];
        let pool = AccountPool::with_strategy(accounts, RoutingStrategy::Priority);
        pool.record_latency("a", 100);
        pool.record_latency("a", 200);
        let all = pool.select_all("gpt-4");
        assert_eq!(all.len(), 1);
    }

    #[test]
    fn select_by_model_wildcard() {
        let pool = AccountPool::new(vec![
            make_account("openai", vec!["gpt-*"], 10),
            make_account("claude", vec!["claude-*"], 10),
        ]);
        assert_eq!(pool.select("gpt-4o").unwrap().name, "openai");
        assert_eq!(pool.select("claude-3-sonnet").unwrap().name, "claude");
        assert!(pool.select("gemini-pro").is_none());
    }

    #[test]
    fn round_robin_strategy() {
        let pool = AccountPool::with_strategy(vec![
            make_account("a", vec!["*"], 10),
            make_account("b", vec!["*"], 10),
        ], RoutingStrategy::RoundRobin);
        let first = pool.select("test").unwrap().name.clone();
        let second = pool.select("test").unwrap().name.clone();
        assert_ne!(first, second);
    }

    #[test]
    fn least_latency_strategy() {
        let pool = AccountPool::with_strategy(vec![
            make_account("fast", vec!["*"], 10),
            make_account("slow", vec!["*"], 10),
        ], RoutingStrategy::LeastLatency);
        pool.record_latency("fast", 100);
        pool.record_latency("slow", 5000);
        assert_eq!(pool.select("test").unwrap().name, "fast");
    }

    #[test]
    fn account_serialization_roundtrip() {
        let account = make_account("test", vec!["gpt-*"], 10);
        let json = serde_json::to_string(&account).unwrap();
        assert!(!json.contains("api_key"));
        let deserialized: Account = serde_json::from_str(&json).unwrap();
        assert_eq!(deserialized.name, "test");
        assert_eq!(deserialized.timeout, Duration::from_secs(30));
        assert!(deserialized.api_key.is_empty());
    }
}
