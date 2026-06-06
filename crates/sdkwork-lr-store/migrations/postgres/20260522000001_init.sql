CREATE TABLE IF NOT EXISTS local_router_upstream_accounts (
    id                  BIGINT PRIMARY KEY,
    user_id             BIGINT       NOT NULL DEFAULT 0,
    name                VARCHAR(255) NOT NULL,
    provider            VARCHAR(64)  NOT NULL,
    base_url            TEXT         NOT NULL,
    upstream_api_key    TEXT         NOT NULL DEFAULT '',
    models              JSONB        NOT NULL DEFAULT '[]',
    priority            INTEGER      NOT NULL DEFAULT 10,
    timeout_secs        BIGINT       NOT NULL DEFAULT 120,
    max_retries         INTEGER      NOT NULL DEFAULT 0,
    retry_delay_ms      BIGINT       NOT NULL DEFAULT 500,
    anthropic_version   VARCHAR(32),
    default_headers     JSONB        DEFAULT '{}',
    model_route_mappings JSONB       DEFAULT '{}',
    enabled             BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),
    UNIQUE(user_id, name)
);

CREATE TABLE IF NOT EXISTS local_router_client_api_keys (
    id                  BIGINT PRIMARY KEY,
    user_id             BIGINT       NOT NULL DEFAULT 0,
    name                VARCHAR(255) NOT NULL,
    key_hash            VARCHAR(128) NOT NULL UNIQUE,
    key_prefix          VARCHAR(32),
    enabled             BOOLEAN      NOT NULL DEFAULT TRUE,
    last_used_at        TIMESTAMPTZ,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC')
);

CREATE TABLE IF NOT EXISTS local_router_invocations (
    id                  BIGINT PRIMARY KEY,
    user_id             BIGINT       NOT NULL DEFAULT 0,
    request_id          VARCHAR(64)  NOT NULL,
    account_name        VARCHAR(255),
    protocol            VARCHAR(32)  NOT NULL,
    method              VARCHAR(16)  NOT NULL,
    path                TEXT         NOT NULL,
    query               TEXT,
    model               VARCHAR(128),
    status              VARCHAR(32)  NOT NULL DEFAULT 'pending',
    status_code         INTEGER,
    latency_ms          BIGINT,
    error_message       TEXT,
    request_body        TEXT,
    response_body       TEXT,
    request_body_size   BIGINT,
    response_body_size  BIGINT,
    upstream_protocol   VARCHAR(32),
    upstream_path       TEXT,
    client_api          VARCHAR(64),
    request_surface     VARCHAR(64),
    target_surface      VARCHAR(64),
    plugin_policy       VARCHAR(32),
    plugin_id           VARCHAR(128),
    model_vendor        VARCHAR(64),
    streaming           BOOLEAN      NOT NULL DEFAULT FALSE,
    attempt_count       INTEGER      NOT NULL DEFAULT 1,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC')
);

CREATE TABLE IF NOT EXISTS local_router_usages (
    id                  BIGINT PRIMARY KEY,
    user_id             BIGINT       NOT NULL DEFAULT 0,
    request_id          VARCHAR(64)  NOT NULL,
    model               VARCHAR(128),
    prompt_tokens       BIGINT,
    completion_tokens   BIGINT,
    total_tokens        BIGINT,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC')
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
