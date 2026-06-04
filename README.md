# sdkwork-local-router

Rust local router for model API compatibility across OpenAI-compatible tools,
Claude Code, Gemini CLI, and vendor-native upstreams.

Client tools authenticate to the local router with database-backed
`client_api_key` records in
`local_router_client_api_keys`; each row provides the `user_id` used for data
isolation. Provider credentials are separate `upstream_api_key` values on
`local_router_upstream_accounts` and are used only when forwarding upstream.

The server exposes three service-side API groups:

- `local-router-open-api`: provider-compatible model proxy routes such as
  `/v1/*`, `/anthropic/*`, and `/google/*`; authenticated by local-router
  `client_api_key` records.
- `local-router-app-api`: `/app/v3/api/router/*` app integration routes;
  authenticated from SDKWork auth/access tokens, JWT claims, or trusted subject
  headers supplied by the surrounding SDKWork runtime.
- `local-router-backend-api`: `/backend/v3/api/router/*` operator and
  control-plane routes for accounts, client API keys, usage, health, plugins,
  routing strategy, and API group manifests.

`GET /backend/v3/api/router/api_groups` returns the machine-readable API group
manifest. `GET /backend/v3/api/router/plugins` embeds the same groups together
with plugin standards, routing strategies, pipeline stages, and standard
components.

See [docs/plugin-compatibility.md](docs/plugin-compatibility.md) for the plugin
standard, canonical plugin names, and `sdkwork-models` vendor compatibility
rules.
