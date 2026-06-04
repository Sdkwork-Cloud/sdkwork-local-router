ALTER TABLE local_router_upstream_accounts
    ADD COLUMN IF NOT EXISTS upstream_auth_scheme VARCHAR(32);
