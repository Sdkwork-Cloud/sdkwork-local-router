CREATE TABLE IF NOT EXISTS accounts (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    name                TEXT    NOT NULL UNIQUE,
    provider            TEXT    NOT NULL,
    base_url            TEXT    NOT NULL,
    api_key             TEXT    NOT NULL DEFAULT '',
    models              TEXT    NOT NULL DEFAULT '[]',
    priority            INTEGER NOT NULL DEFAULT 10,
    timeout_secs        INTEGER NOT NULL DEFAULT 120,
    anthropic_version   TEXT,
    default_headers     TEXT    DEFAULT '{}',
    model_aliases       TEXT    DEFAULT '{}',
    enabled             INTEGER NOT NULL DEFAULT 1,
    created_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    updated_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_accounts_provider ON accounts(provider);
CREATE INDEX IF NOT EXISTS idx_accounts_enabled ON accounts(enabled);
CREATE INDEX IF NOT EXISTS idx_accounts_priority_name ON accounts(priority, name);

CREATE TABLE IF NOT EXISTS invocations (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id          TEXT    NOT NULL,
    account_name        TEXT,
    protocol            TEXT    NOT NULL,
    method              TEXT    NOT NULL,
    path                TEXT    NOT NULL,
    model               TEXT,
    status_code         INTEGER,
    latency_ms          INTEGER,
    error_message       TEXT,
    request_body        TEXT,
    response_body       TEXT,
    created_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_invocations_request_id ON invocations(request_id);
CREATE INDEX IF NOT EXISTS idx_invocations_created_at ON invocations(created_at);
CREATE INDEX IF NOT EXISTS idx_invocations_model ON invocations(model);
CREATE INDEX IF NOT EXISTS idx_invocations_account ON invocations(account_name);

CREATE TABLE IF NOT EXISTS usages (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id          TEXT    NOT NULL,
    model               TEXT,
    prompt_tokens       INTEGER,
    completion_tokens   INTEGER,
    total_tokens        INTEGER,
    created_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_usages_request_id ON usages(request_id);
CREATE INDEX IF NOT EXISTS idx_usages_model ON usages(model);
CREATE INDEX IF NOT EXISTS idx_usages_created_at ON usages(created_at);
