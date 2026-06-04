CREATE TABLE IF NOT EXISTS local_router_upstream_accounts (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id             INTEGER NOT NULL DEFAULT 0,
    name                TEXT    NOT NULL,
    provider            TEXT    NOT NULL,
    base_url            TEXT    NOT NULL,
    upstream_api_key    TEXT    NOT NULL DEFAULT '',
    models              TEXT    NOT NULL DEFAULT '[]',
    priority            INTEGER NOT NULL DEFAULT 10,
    timeout_secs        INTEGER NOT NULL DEFAULT 120,
    max_retries         INTEGER NOT NULL DEFAULT 0,
    retry_delay_ms      INTEGER NOT NULL DEFAULT 500,
    anthropic_version   TEXT,
    default_headers     TEXT    DEFAULT '{}',
    model_route_mappings TEXT  DEFAULT '{}',
    enabled             INTEGER NOT NULL DEFAULT 1,
    created_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    updated_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    UNIQUE(user_id, name)
);

CREATE TABLE IF NOT EXISTS local_router_client_api_keys (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id             INTEGER NOT NULL DEFAULT 0,
    name                TEXT    NOT NULL,
    key_hash            TEXT    NOT NULL UNIQUE,
    key_prefix          TEXT,
    enabled             INTEGER NOT NULL DEFAULT 1,
    last_used_at        TEXT,
    created_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    updated_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE TABLE IF NOT EXISTS local_router_invocations (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id             INTEGER NOT NULL DEFAULT 0,
    request_id          TEXT    NOT NULL,
    account_name        TEXT,
    protocol            TEXT    NOT NULL,
    method              TEXT    NOT NULL,
    path                TEXT    NOT NULL,
    query               TEXT,
    model               TEXT,
    status              TEXT    NOT NULL DEFAULT 'pending',
    status_code         INTEGER,
    latency_ms          INTEGER,
    error_message       TEXT,
    request_body        TEXT,
    response_body       TEXT,
    request_body_size   INTEGER,
    response_body_size  INTEGER,
    upstream_protocol   TEXT,
    upstream_path       TEXT,
    client_api          TEXT,
    request_surface     TEXT,
    target_surface      TEXT,
    plugin_policy       TEXT,
    plugin_id           TEXT,
    model_vendor        TEXT,
    streaming           INTEGER NOT NULL DEFAULT 0,
    attempt_count       INTEGER NOT NULL DEFAULT 1,
    created_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE TABLE IF NOT EXISTS local_router_usages (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id             INTEGER NOT NULL DEFAULT 0,
    request_id          TEXT    NOT NULL,
    model               TEXT,
    prompt_tokens       INTEGER,
    completion_tokens   INTEGER,
    total_tokens        INTEGER,
    created_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_local_router_upstream_accounts_user_name ON local_router_upstream_accounts(user_id, name);
CREATE INDEX IF NOT EXISTS idx_local_router_upstream_accounts_user_provider ON local_router_upstream_accounts(user_id, provider);
CREATE INDEX IF NOT EXISTS idx_local_router_upstream_accounts_user_enabled ON local_router_upstream_accounts(user_id, enabled);
CREATE INDEX IF NOT EXISTS idx_local_router_upstream_accounts_user_priority_name ON local_router_upstream_accounts(user_id, priority, name);
CREATE UNIQUE INDEX IF NOT EXISTS idx_local_router_client_api_keys_hash ON local_router_client_api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_local_router_client_api_keys_user_enabled ON local_router_client_api_keys(user_id, enabled);
CREATE INDEX IF NOT EXISTS idx_local_router_invocations_user_request_id ON local_router_invocations(user_id, request_id);
CREATE INDEX IF NOT EXISTS idx_local_router_invocations_user_created_at ON local_router_invocations(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_local_router_invocations_user_model ON local_router_invocations(user_id, model);
CREATE INDEX IF NOT EXISTS idx_local_router_invocations_user_account ON local_router_invocations(user_id, account_name);
CREATE INDEX IF NOT EXISTS idx_local_router_invocations_user_client_api ON local_router_invocations(user_id, client_api);
CREATE INDEX IF NOT EXISTS idx_local_router_invocations_user_plugin_id ON local_router_invocations(user_id, plugin_id);
CREATE INDEX IF NOT EXISTS idx_local_router_usages_user_request_id ON local_router_usages(user_id, request_id);
CREATE INDEX IF NOT EXISTS idx_local_router_usages_user_model ON local_router_usages(user_id, model);
CREATE INDEX IF NOT EXISTS idx_local_router_usages_user_created_at ON local_router_usages(user_id, created_at);
