use std::collections::{HashMap, HashSet};
use std::sync::Arc;
use std::time::{Duration, Instant};

use parking_lot::RwLock;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum HealthState {
    Healthy,
    Degraded,
    CircuitOpen,
}

impl std::fmt::Display for HealthState {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Healthy => write!(f, "healthy"),
            Self::Degraded => write!(f, "degraded"),
            Self::CircuitOpen => write!(f, "circuit_open"),
        }
    }
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

#[derive(Debug)]
struct AccountHealthInner {
    state: HealthState,
    consecutive_failures: u32,
    consecutive_successes: u32,
    last_failure_at: Option<Instant>,
    last_success_at: Option<Instant>,
    opened_at: Option<Instant>,
    half_open_requests: u32,
    total_failures: u64,
    total_successes: u64,
    total_opens: u64,
}

impl AccountHealthInner {
    fn new() -> Self {
        Self {
            state: HealthState::Healthy,
            consecutive_failures: 0,
            consecutive_successes: 0,
            last_failure_at: None,
            last_success_at: None,
            opened_at: None,
            half_open_requests: 0,
            total_failures: 0,
            total_successes: 0,
            total_opens: 0,
        }
    }
}

#[derive(Debug, Clone)]
pub struct AccountHealth {
    account_name: String,
    inner: Arc<RwLock<AccountHealthInner>>,
    config: CircuitBreakerConfig,
}

impl AccountHealth {
    pub fn new(account_name: String, config: CircuitBreakerConfig) -> Self {
        Self {
            account_name,
            inner: Arc::new(RwLock::new(AccountHealthInner::new())),
            config,
        }
    }

    pub fn account_name(&self) -> &str {
        &self.account_name
    }

    pub fn state(&self) -> HealthState {
        let inner = self.inner.read();
        if inner.state == HealthState::CircuitOpen {
            if let Some(opened_at) = inner.opened_at {
                if opened_at.elapsed() >= self.config.open_duration {
                    drop(inner);
                    {
                        let mut inner = self.inner.write();
                        if inner.state == HealthState::CircuitOpen
                            && inner
                                .opened_at
                                .map_or(false, |t| t.elapsed() >= self.config.open_duration)
                        {
                            inner.state = HealthState::Degraded;
                            inner.half_open_requests = 0;
                            inner.consecutive_successes = 0;
                            tracing::info!(account = %self.account_name, "circuit breaker transitioned to half-open (degraded), probing recovery");
                        }
                    }
                    return self.inner.read().state;
                }
            }
        }
        inner.state
    }

    pub fn is_available(&self) -> bool {
        let state = self.state();
        match state {
            HealthState::Healthy => true,
            HealthState::Degraded => {
                let mut inner = self.inner.write();
                if inner.half_open_requests >= self.config.half_open_max_requests {
                    return false;
                }
                inner.half_open_requests += 1;
                true
            }
            HealthState::CircuitOpen => false,
        }
    }

    pub fn record_success(&self) {
        let mut inner = self.inner.write();
        inner.total_successes += 1;
        inner.consecutive_successes += 1;
        inner.consecutive_failures = 0;
        inner.last_success_at = Some(Instant::now());

        // Release the half-open probe slot that was acquired via `is_available`.
        // Guarded to prevent underflow if callers ever call record_success
        // without a corresponding is_available reservation.
        if inner.half_open_requests > 0 {
            inner.half_open_requests -= 1;
        }

        match inner.state {
            HealthState::Degraded => {
                if inner.consecutive_successes >= self.config.success_threshold {
                    inner.state = HealthState::Healthy;
                    inner.half_open_requests = 0;
                    tracing::info!(
                        account = %self.account_name,
                        consecutive_successes = inner.consecutive_successes,
                        "circuit breaker recovered to healthy"
                    );
                }
            }
            HealthState::CircuitOpen => {
                inner.state = HealthState::Degraded;
                inner.half_open_requests = 1;
                inner.consecutive_successes = 1;
                tracing::info!(account = %self.account_name, "circuit breaker unexpectedly in open state on success, transitioning to degraded");
            }
            HealthState::Healthy => {}
        }
    }

    pub fn record_failure(&self) {
        let mut inner = self.inner.write();
        inner.total_failures += 1;
        inner.consecutive_failures += 1;
        inner.consecutive_successes = 0;
        inner.last_failure_at = Some(Instant::now());

        // Release the half-open probe slot on failure too.
        if inner.half_open_requests > 0 {
            inner.half_open_requests -= 1;
        }

        match inner.state {
            HealthState::Healthy => {
                if inner.consecutive_failures >= self.config.failure_threshold {
                    inner.state = HealthState::CircuitOpen;
                    inner.opened_at = Some(Instant::now());
                    inner.total_opens += 1;
                    sdkwork_lr_observability::metrics::CIRCUIT_OPENS_TOTAL.inc();
                    tracing::warn!(
                        account = %self.account_name,
                        consecutive_failures = inner.consecutive_failures,
                        threshold = self.config.failure_threshold,
                        "circuit breaker opened - account removed from pool"
                    );
                }
            }
            HealthState::Degraded => {
                inner.state = HealthState::CircuitOpen;
                inner.opened_at = Some(Instant::now());
                inner.total_opens += 1;
                sdkwork_lr_observability::metrics::CIRCUIT_OPENS_TOTAL.inc();
                tracing::warn!(
                    account = %self.account_name,
                    "circuit breaker re-opened from degraded state - account removed from pool"
                );
            }
            HealthState::CircuitOpen => {}
        }
    }

    pub fn record_half_open_attempt(&self) -> bool {
        let mut inner = self.inner.write();
        if inner.state != HealthState::Degraded {
            return false;
        }
        if inner.half_open_requests >= self.config.half_open_max_requests {
            return false;
        }
        inner.half_open_requests += 1;
        true
    }

    pub fn force_open(&self) {
        let mut inner = self.inner.write();
        inner.state = HealthState::CircuitOpen;
        inner.opened_at = Some(Instant::now());
        inner.total_opens += 1;
        tracing::info!(account = %self.account_name, "circuit breaker force-opened (manual)");
    }

    pub fn force_close(&self) {
        let mut inner = self.inner.write();
        inner.state = HealthState::Healthy;
        inner.consecutive_failures = 0;
        inner.consecutive_successes = 0;
        inner.opened_at = None;
        inner.half_open_requests = 0;
        tracing::info!(account = %self.account_name, "circuit breaker force-closed (manual)");
    }

    pub fn snapshot(&self) -> AccountHealthSnapshot {
        let inner = self.inner.read();
        AccountHealthSnapshot {
            account_name: self.account_name.clone(),
            state: inner.state,
            consecutive_failures: inner.consecutive_failures,
            consecutive_successes: inner.consecutive_successes,
            total_failures: inner.total_failures,
            total_successes: inner.total_successes,
            total_opens: inner.total_opens,
            last_failure_ago: inner.last_failure_at.map(|t| t.elapsed().as_secs()),
            last_success_ago: inner.last_success_at.map(|t| t.elapsed().as_secs()),
            opened_ago: inner.opened_at.map(|t| t.elapsed().as_secs()),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AccountHealthSnapshot {
    pub account_name: String,
    pub state: HealthState,
    pub consecutive_failures: u32,
    pub consecutive_successes: u32,
    pub total_failures: u64,
    pub total_successes: u64,
    pub total_opens: u64,
    pub last_failure_ago: Option<u64>,
    pub last_success_ago: Option<u64>,
    pub opened_ago: Option<u64>,
}

#[derive(Debug, Clone)]
pub struct HealthManager {
    healths: Arc<RwLock<HashMap<String, Arc<AccountHealth>>>>,
    config: CircuitBreakerConfig,
}

impl HealthManager {
    pub fn new(config: CircuitBreakerConfig) -> Self {
        Self {
            healths: Arc::new(RwLock::new(HashMap::new())),
            config,
        }
    }

    pub fn register(&self, account_name: &str) -> Arc<AccountHealth> {
        let health = Arc::new(AccountHealth::new(
            account_name.to_owned(),
            self.config.clone(),
        ));
        let mut healths = self.healths.write();
        healths.insert(account_name.to_owned(), health.clone());
        health
    }

    pub fn register_all(&self, account_names: &[String]) {
        let mut healths = self.healths.write();
        for name in account_names {
            healths
                .entry(name.clone())
                .or_insert_with(|| Arc::new(AccountHealth::new(name.clone(), self.config.clone())));
        }
        let name_set: HashSet<&String> = account_names.iter().collect();
        healths.retain(|name, _| name_set.contains(&name));
    }

    pub fn get(&self, account_name: &str) -> Option<Arc<AccountHealth>> {
        self.healths.read().get(account_name).cloned()
    }

    pub fn is_available(&self, account_name: &str) -> bool {
        self.healths
            .read()
            .get(account_name)
            .map(|h| h.is_available())
            .unwrap_or(true)
    }

    pub fn record_success(&self, account_name: &str) {
        if let Some(h) = self.healths.read().get(account_name) {
            h.record_success();
        }
    }

    pub fn record_failure(&self, account_name: &str) {
        if let Some(h) = self.healths.read().get(account_name) {
            h.record_failure();
        }
    }

    pub fn snapshots(&self) -> Vec<AccountHealthSnapshot> {
        self.healths.read().values().map(|h| h.snapshot()).collect()
    }

    pub fn force_open(&self, account_name: &str) -> bool {
        if let Some(h) = self.healths.read().get(account_name) {
            h.force_open();
            true
        } else {
            false
        }
    }

    pub fn force_close(&self, account_name: &str) -> bool {
        if let Some(h) = self.healths.read().get(account_name) {
            h.force_close();
            true
        } else {
            false
        }
    }

    pub fn healthy_count(&self) -> usize {
        self.healths
            .read()
            .values()
            .filter(|h| h.state() == HealthState::Healthy)
            .count()
    }

    pub fn degraded_count(&self) -> usize {
        self.healths
            .read()
            .values()
            .filter(|h| h.state() == HealthState::Degraded)
            .count()
    }

    pub fn circuit_open_count(&self) -> usize {
        self.healths
            .read()
            .values()
            .filter(|h| h.state() == HealthState::CircuitOpen)
            .count()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn test_config() -> CircuitBreakerConfig {
        CircuitBreakerConfig {
            failure_threshold: 3,
            success_threshold: 2,
            open_duration: Duration::from_millis(100),
            half_open_max_requests: 1,
        }
    }

    #[test]
    fn test_initial_state_is_healthy() {
        let health = AccountHealth::new("test-account".to_owned(), test_config());
        assert_eq!(health.state(), HealthState::Healthy);
        assert!(health.is_available());
    }

    #[test]
    fn test_consecutive_failures_open_circuit() {
        let health = AccountHealth::new("test-account".to_owned(), test_config());
        health.record_failure();
        assert_eq!(health.state(), HealthState::Healthy);
        health.record_failure();
        assert_eq!(health.state(), HealthState::Healthy);
        health.record_failure();
        assert_eq!(health.state(), HealthState::CircuitOpen);
        assert!(!health.is_available());
    }

    #[test]
    fn test_success_resets_consecutive_failures() {
        let health = AccountHealth::new("test-account".to_owned(), test_config());
        health.record_failure();
        health.record_failure();
        health.record_success();
        assert_eq!(health.state(), HealthState::Healthy);
        health.record_failure();
        assert_eq!(health.state(), HealthState::Healthy);
    }

    #[test]
    fn test_circuit_opens_after_duration_transitions_to_degraded() {
        let health = AccountHealth::new("test-account".to_owned(), test_config());
        for _ in 0..3 {
            health.record_failure();
        }
        assert_eq!(health.state(), HealthState::CircuitOpen);

        std::thread::sleep(Duration::from_millis(150));
        assert_eq!(health.state(), HealthState::Degraded);
        assert!(health.is_available());
    }

    #[test]
    fn test_degraded_success_leads_to_healthy() {
        let health = AccountHealth::new("test-account".to_owned(), test_config());
        for _ in 0..3 {
            health.record_failure();
        }
        std::thread::sleep(Duration::from_millis(150));
        assert_eq!(health.state(), HealthState::Degraded);

        health.record_success();
        health.record_success();
        assert_eq!(health.state(), HealthState::Healthy);
    }

    #[test]
    fn test_degraded_failure_reopens_circuit() {
        let health = AccountHealth::new("test-account".to_owned(), test_config());
        for _ in 0..3 {
            health.record_failure();
        }
        std::thread::sleep(Duration::from_millis(150));
        assert_eq!(health.state(), HealthState::Degraded);

        health.record_failure();
        assert_eq!(health.state(), HealthState::CircuitOpen);
    }

    #[test]
    fn test_force_open_and_close() {
        let health = AccountHealth::new("test-account".to_owned(), test_config());
        assert_eq!(health.state(), HealthState::Healthy);

        health.force_open();
        assert_eq!(health.state(), HealthState::CircuitOpen);
        assert!(!health.is_available());

        health.force_close();
        assert_eq!(health.state(), HealthState::Healthy);
        assert!(health.is_available());
    }

    #[test]
    fn test_snapshot() {
        let health = AccountHealth::new("test-account".to_owned(), test_config());
        health.record_failure();
        let snapshot = health.snapshot();
        assert_eq!(snapshot.account_name, "test-account");
        assert_eq!(snapshot.state, HealthState::Healthy);
        assert_eq!(snapshot.consecutive_failures, 1);
        assert_eq!(snapshot.total_failures, 1);
    }

    #[test]
    fn test_health_manager_register_and_record() {
        let manager = HealthManager::new(test_config());
        manager.register("account-a");
        manager.register("account-b");

        assert!(manager.is_available("account-a"));
        assert!(manager.is_available("account-b"));

        for _ in 0..3 {
            manager.record_failure("account-a");
        }
        assert!(!manager.is_available("account-a"));
        assert!(manager.is_available("account-b"));

        assert_eq!(manager.healthy_count(), 1);
        assert_eq!(manager.circuit_open_count(), 1);
    }

    #[test]
    fn test_health_manager_force_operations() {
        let manager = HealthManager::new(test_config());
        manager.register("account-a");

        assert!(manager.force_open("account-a"));
        assert!(!manager.is_available("account-a"));

        assert!(manager.force_close("account-a"));
        assert!(manager.is_available("account-a"));

        assert!(!manager.force_open("nonexistent"));
    }

    #[test]
    fn test_half_open_limits_requests() {
        let health = AccountHealth::new("test-account".to_owned(), test_config());
        for _ in 0..3 {
            health.record_failure();
        }
        std::thread::sleep(Duration::from_millis(150));
        assert_eq!(health.state(), HealthState::Degraded);

        assert!(health.record_half_open_attempt());
        assert!(!health.record_half_open_attempt());
    }
}
