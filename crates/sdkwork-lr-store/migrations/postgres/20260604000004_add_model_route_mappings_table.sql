CREATE UNIQUE INDEX IF NOT EXISTS idx_local_router_upstream_accounts_user_id ON local_router_upstream_accounts(user_id, id);

CREATE TABLE IF NOT EXISTS local_router_model_route_mappings (
    id                  BIGINT PRIMARY KEY,
    user_id             BIGINT       NOT NULL DEFAULT 0,
    account_id          BIGINT       NOT NULL,
    account_name        VARCHAR(255) NOT NULL,
    client_model        VARCHAR(255) NOT NULL,
    upstream_model      VARCHAR(255) NOT NULL,
    enabled             BOOLEAN      NOT NULL DEFAULT TRUE,
    notes               TEXT,
    version             BIGINT       NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),
    CHECK(length(btrim(account_name)) > 0),
    CHECK(length(btrim(client_model)) > 0),
    CHECK(length(btrim(upstream_model)) > 0),
    UNIQUE(user_id, account_id, client_model),
    FOREIGN KEY(user_id, account_id) REFERENCES local_router_upstream_accounts(user_id, id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_local_router_model_route_mappings_user_account ON local_router_model_route_mappings(user_id, account_id);
CREATE INDEX IF NOT EXISTS idx_local_router_model_route_mappings_user_client_model ON local_router_model_route_mappings(user_id, client_model);
CREATE INDEX IF NOT EXISTS idx_local_router_model_route_mappings_user_enabled ON local_router_model_route_mappings(user_id, enabled);
