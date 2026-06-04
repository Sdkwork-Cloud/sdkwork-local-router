ALTER TABLE local_router_invocations
    ADD COLUMN metadata TEXT NOT NULL DEFAULT '{}';
