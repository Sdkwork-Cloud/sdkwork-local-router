CREATE TABLE IF NOT EXISTS accounts (
    id                  BIGSERIAL PRIMARY KEY,
    name                VARCHAR(255) NOT NULL UNIQUE,
    provider            VARCHAR(64)  NOT NULL,
    base_url            TEXT         NOT NULL,
    api_key             TEXT         NOT NULL DEFAULT '',
    models              JSONB        NOT NULL DEFAULT '[]',
    priority            INTEGER      NOT NULL DEFAULT 10,
    timeout_secs        BIGINT       NOT NULL DEFAULT 120,
    anthropic_version   VARCHAR(32),
    default_headers     JSONB        DEFAULT '{}',
    model_aliases       JSONB        DEFAULT '{}',
    enabled             BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC')
);

CREATE INDEX IF NOT EXISTS idx_accounts_provider ON accounts(provider);
CREATE INDEX IF NOT EXISTS idx_accounts_enabled ON accounts(enabled);
CREATE INDEX IF NOT EXISTS idx_accounts_priority_name ON accounts(priority, name);

CREATE TABLE IF NOT EXISTS invocations (
    id                  BIGSERIAL PRIMARY KEY,
    request_id          VARCHAR(64)  NOT NULL,
    account_name        VARCHAR(255),
    protocol            VARCHAR(32)  NOT NULL,
    method              VARCHAR(16)  NOT NULL,
    path                TEXT         NOT NULL,
    model               VARCHAR(128),
    status_code         INTEGER,
    latency_ms          BIGINT,
    error_message       TEXT,
    request_body        TEXT,
    response_body       TEXT,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC')
);

CREATE INDEX IF NOT EXISTS idx_invocations_request_id ON invocations(request_id);
CREATE INDEX IF NOT EXISTS idx_invocations_created_at ON invocations(created_at);
CREATE INDEX IF NOT EXISTS idx_invocations_model ON invocations(model);
CREATE INDEX IF NOT EXISTS idx_invocations_account ON invocations(account_name);

CREATE TABLE IF NOT EXISTS usages (
    id                  BIGSERIAL PRIMARY KEY,
    request_id          VARCHAR(64)  NOT NULL,
    model               VARCHAR(128),
    prompt_tokens       BIGINT,
    completion_tokens   BIGINT,
    total_tokens        BIGINT,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC')
);

CREATE INDEX IF NOT EXISTS idx_usages_request_id ON usages(request_id);
CREATE INDEX IF NOT EXISTS idx_usages_model ON usages(model);
CREATE INDEX IF NOT EXISTS idx_usages_created_at ON usages(created_at);
