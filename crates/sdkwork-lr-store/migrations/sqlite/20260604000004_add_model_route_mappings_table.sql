CREATE UNIQUE INDEX IF NOT EXISTS idx_local_router_upstream_accounts_user_id ON local_router_upstream_accounts(user_id, id);

CREATE TABLE IF NOT EXISTS local_router_model_route_mappings (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id             INTEGER NOT NULL DEFAULT 0,
    account_id          INTEGER NOT NULL,
    account_name        TEXT    NOT NULL,
    client_model        TEXT    NOT NULL,
    upstream_model      TEXT    NOT NULL,
    enabled             INTEGER NOT NULL DEFAULT 1,
    notes               TEXT,
    version             INTEGER NOT NULL DEFAULT 0,
    created_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    updated_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    CHECK(length(trim(account_name)) > 0),
    CHECK(length(trim(client_model)) > 0),
    CHECK(length(trim(upstream_model)) > 0),
    UNIQUE(user_id, account_id, client_model),
    FOREIGN KEY(user_id, account_id) REFERENCES local_router_upstream_accounts(user_id, id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_local_router_model_route_mappings_user_account ON local_router_model_route_mappings(user_id, account_id);
CREATE INDEX IF NOT EXISTS idx_local_router_model_route_mappings_user_client_model ON local_router_model_route_mappings(user_id, client_model);
CREATE INDEX IF NOT EXISTS idx_local_router_model_route_mappings_user_enabled ON local_router_model_route_mappings(user_id, enabled);
