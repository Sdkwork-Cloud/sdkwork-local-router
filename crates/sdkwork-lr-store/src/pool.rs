use crate::crypto::KeyEncryption;
use crate::error::StoreError;
use crate::models::*;
use sqlx::sqlite::{SqlitePool, SqlitePoolOptions};
use sqlx::postgres::{PgPool, PgPoolOptions};
use sqlx::Row;

#[derive(Clone)]
pub enum DatabasePool {
    Sqlite(SqlitePool),
    Postgres(PgPool),
}

#[derive(Clone)]
pub struct Store {
    pool: DatabasePool,
    encryption: KeyEncryption,
}

impl Store {
    pub async fn new(database_url: &str) -> Result<Self, StoreError> {
        Self::with_encryption(database_url, KeyEncryption::disabled()).await
    }

    pub async fn with_encryption(database_url: &str, encryption: KeyEncryption) -> Result<Self, StoreError> {
        if database_url.starts_with("postgres://") || database_url.starts_with("postgresql://") {
            let pool = PgPoolOptions::new()
                .max_connections(8)
                .connect(database_url)
                .await
                .map_err(|e| StoreError::Connection(e.to_string()))?;
            Ok(Self { pool: DatabasePool::Postgres(pool), encryption })
        } else {
            let pool = SqlitePoolOptions::new()
                .max_connections(4)
                .connect(database_url)
                .await
                .map_err(|e| StoreError::Connection(e.to_string()))?;

            sqlx::query("PRAGMA journal_mode=WAL")
                .execute(&pool)
                .await
                .map_err(|e| StoreError::Connection(format!("failed to set WAL mode: {e}")))?;

            sqlx::query("PRAGMA busy_timeout=5000")
                .execute(&pool)
                .await
                .map_err(|e| StoreError::Connection(format!("failed to set busy_timeout: {e}")))?;

            Ok(Self { pool: DatabasePool::Sqlite(pool), encryption })
        }
    }

    pub async fn run_migrations(&self) -> Result<(), StoreError> {
        match &self.pool {
            DatabasePool::Sqlite(pool) => {
                sqlx::migrate!("./migrations/sqlite")
                    .run(pool)
                    .await
                    .map_err(|e| StoreError::Migration(e.to_string()))?;
            }
            DatabasePool::Postgres(pool) => {
                sqlx::migrate!("./migrations/postgres")
                    .run(pool)
                    .await
                    .map_err(|e| StoreError::Migration(e.to_string()))?;
            }
        }
        Ok(())
    }

    pub fn is_postgres(&self) -> bool {
        matches!(self.pool, DatabasePool::Postgres(_))
    }

    // === Account CRUD ===

    pub async fn list_accounts(&self) -> Result<Vec<AccountRow>, StoreError> {
        let mut rows = match &self.pool {
            DatabasePool::Sqlite(pool) => {
                sqlx::query_as::<_, AccountRow>("SELECT * FROM accounts ORDER BY priority ASC, name ASC")
                    .fetch_all(pool).await.map_err(|e| StoreError::Query(e.to_string()))?
            }
            DatabasePool::Postgres(pool) => {
                sqlx::query_as::<_, AccountRow>("SELECT * FROM accounts ORDER BY priority ASC, name ASC")
                    .fetch_all(pool).await.map_err(|e| StoreError::Query(e.to_string()))?
            }
        };
        for row in &mut rows {
            row.api_key = self.encryption.decrypt(&row.api_key);
        }
        Ok(rows)
    }

    pub async fn get_account(&self, id: i64) -> Result<AccountRow, StoreError> {
        let mut row = match &self.pool {
            DatabasePool::Sqlite(pool) => {
                sqlx::query_as::<_, AccountRow>("SELECT * FROM accounts WHERE id = ?")
                    .bind(id)
                    .fetch_optional(pool).await
                    .map_err(|e| StoreError::Query(e.to_string()))?
                    .ok_or_else(|| StoreError::NotFound(format!("account {} not found", id)))?
            }
            DatabasePool::Postgres(pool) => {
                sqlx::query_as::<_, AccountRow>("SELECT * FROM accounts WHERE id = $1")
                    .bind(id)
                    .fetch_optional(pool).await
                    .map_err(|e| StoreError::Query(e.to_string()))?
                    .ok_or_else(|| StoreError::NotFound(format!("account {} not found", id)))?
            }
        };
        row.api_key = self.encryption.decrypt(&row.api_key);
        Ok(row)
    }

    pub async fn insert_account(&self, account: &NewAccount) -> Result<i64, StoreError> {
        let encrypted_api_key = self.encryption.encrypt(&account.api_key);
        let models_json = serde_json::to_string(&account.models).unwrap_or_else(|_| "[]".to_owned());
        let headers_json = serde_json::to_string(&account.default_headers).unwrap_or_else(|_| "{}".to_owned());
        let aliases_json = serde_json::to_string(&account.model_aliases).unwrap_or_else(|_| "{}".to_owned());

        match &self.pool {
            DatabasePool::Sqlite(pool) => {
                let result = sqlx::query(
                    "INSERT INTO accounts (name, provider, base_url, api_key, models, priority, timeout_secs, max_retries, retry_delay_ms, anthropic_version, default_headers, model_aliases, enabled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                )
                .bind(&account.name).bind(&account.provider).bind(&account.base_url).bind(&encrypted_api_key)
                .bind(&models_json).bind(account.priority).bind(account.timeout_secs)
                .bind(account.max_retries).bind(account.retry_delay_ms)
                .bind(&account.anthropic_version).bind(&headers_json).bind(&aliases_json)
                .bind(account.enabled)
                .execute(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
                Ok(result.last_insert_rowid())
            }
            DatabasePool::Postgres(pool) => {
                let row = sqlx::query(
                    "INSERT INTO accounts (name, provider, base_url, api_key, models, priority, timeout_secs, max_retries, retry_delay_ms, anthropic_version, default_headers, model_aliases, enabled) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id"
                )
                .bind(&account.name).bind(&account.provider).bind(&account.base_url).bind(&encrypted_api_key)
                .bind(&models_json).bind(account.priority).bind(account.timeout_secs)
                .bind(account.max_retries).bind(account.retry_delay_ms)
                .bind(&account.anthropic_version).bind(&headers_json).bind(&aliases_json)
                .bind(account.enabled)
                .fetch_one(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
                Ok(row.get::<i64, _>("id"))
            }
        }
    }

    pub async fn update_account(&self, id: i64, account: &NewAccount) -> Result<(), StoreError> {
        let encrypted_api_key = self.encryption.encrypt(&account.api_key);
        let models_json = serde_json::to_string(&account.models).unwrap_or_else(|_| "[]".to_owned());
        let headers_json = serde_json::to_string(&account.default_headers).unwrap_or_else(|_| "{}".to_owned());
        let aliases_json = serde_json::to_string(&account.model_aliases).unwrap_or_else(|_| "{}".to_owned());

        match &self.pool {
            DatabasePool::Sqlite(pool) => {
                sqlx::query(
                    "UPDATE accounts SET name=?, provider=?, base_url=?, api_key=?, models=?, priority=?, timeout_secs=?, max_retries=?, retry_delay_ms=?, anthropic_version=?, default_headers=?, model_aliases=?, enabled=?, updated_at=datetime('now') WHERE id=?"
                )
                .bind(&account.name).bind(&account.provider).bind(&account.base_url).bind(&encrypted_api_key)
                .bind(&models_json).bind(account.priority).bind(account.timeout_secs)
                .bind(account.max_retries).bind(account.retry_delay_ms)
                .bind(&account.anthropic_version).bind(&headers_json).bind(&aliases_json)
                .bind(account.enabled).bind(id)
                .execute(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
            }
            DatabasePool::Postgres(pool) => {
                sqlx::query(
                    "UPDATE accounts SET name=$1, provider=$2, base_url=$3, api_key=$4, models=$5, priority=$6, timeout_secs=$7, max_retries=$8, retry_delay_ms=$9, anthropic_version=$10, default_headers=$11, model_aliases=$12, enabled=$13, updated_at=NOW() WHERE id=$14"
                )
                .bind(&account.name).bind(&account.provider).bind(&account.base_url).bind(&encrypted_api_key)
                .bind(&models_json).bind(account.priority).bind(account.timeout_secs)
                .bind(account.max_retries).bind(account.retry_delay_ms)
                .bind(&account.anthropic_version).bind(&headers_json).bind(&aliases_json)
                .bind(account.enabled).bind(id)
                .execute(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
            }
        }
        Ok(())
    }

    pub async fn delete_account(&self, id: i64) -> Result<(), StoreError> {
        match &self.pool {
            DatabasePool::Sqlite(pool) => {
                sqlx::query("DELETE FROM accounts WHERE id = ?").bind(id)
                    .execute(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
            }
            DatabasePool::Postgres(pool) => {
                sqlx::query("DELETE FROM accounts WHERE id = $1").bind(id)
                    .execute(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
            }
        }
        Ok(())
    }

    pub async fn toggle_account(&self, id: i64, enabled: bool) -> Result<(), StoreError> {
        match &self.pool {
            DatabasePool::Sqlite(pool) => {
                sqlx::query("UPDATE accounts SET enabled = ?, updated_at = datetime('now') WHERE id = ?")
                    .bind(enabled).bind(id)
                    .execute(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
            }
            DatabasePool::Postgres(pool) => {
                sqlx::query("UPDATE accounts SET enabled = $1, updated_at = NOW() WHERE id = $2")
                    .bind(enabled).bind(id)
                    .execute(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
            }
        }
        Ok(())
    }

    // === Invocation CRUD ===

    pub async fn insert_invocation(&self, inv: &NewInvocation) -> Result<(), StoreError> {
        match &self.pool {
            DatabasePool::Sqlite(pool) => {
                sqlx::query(
                    "INSERT INTO invocations (request_id, account_name, protocol, method, path, model, status_code, latency_ms, error_message, request_body, response_body) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                )
                .bind(&inv.request_id).bind(&inv.account_name).bind(&inv.protocol)
                .bind(&inv.method).bind(&inv.path).bind(&inv.model)
                .bind(inv.status_code).bind(inv.latency_ms).bind(&inv.error_message)
                .bind(&inv.request_body).bind(&inv.response_body)
                .execute(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
            }
            DatabasePool::Postgres(pool) => {
                sqlx::query(
                    "INSERT INTO invocations (request_id, account_name, protocol, method, path, model, status_code, latency_ms, error_message, request_body, response_body) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)"
                )
                .bind(&inv.request_id).bind(&inv.account_name).bind(&inv.protocol)
                .bind(&inv.method).bind(&inv.path).bind(&inv.model)
                .bind(inv.status_code).bind(inv.latency_ms).bind(&inv.error_message)
                .bind(&inv.request_body).bind(&inv.response_body)
                .execute(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
            }
        }
        Ok(())
    }

    pub async fn list_invocations(&self, limit: i64, offset: i64) -> Result<Vec<InvocationRow>, StoreError> {
        match &self.pool {
            DatabasePool::Sqlite(pool) => {
                sqlx::query_as::<_, InvocationRow>(
                    "SELECT * FROM invocations ORDER BY id DESC LIMIT ? OFFSET ?"
                ).bind(limit).bind(offset)
                    .fetch_all(pool).await.map_err(|e| StoreError::Query(e.to_string()))
            }
            DatabasePool::Postgres(pool) => {
                sqlx::query_as::<_, InvocationRow>(
                    "SELECT * FROM invocations ORDER BY id DESC LIMIT $1 OFFSET $2"
                ).bind(limit).bind(offset)
                    .fetch_all(pool).await.map_err(|e| StoreError::Query(e.to_string()))
            }
        }
    }

    // === Usage CRUD ===

    pub async fn insert_usage(&self, usage: &NewUsage) -> Result<(), StoreError> {
        match &self.pool {
            DatabasePool::Sqlite(pool) => {
                sqlx::query(
                    "INSERT INTO usages (request_id, model, prompt_tokens, completion_tokens, total_tokens) VALUES (?, ?, ?, ?, ?)"
                )
                .bind(&usage.request_id).bind(&usage.model)
                .bind(usage.prompt_tokens).bind(usage.completion_tokens).bind(usage.total_tokens)
                .execute(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
            }
            DatabasePool::Postgres(pool) => {
                sqlx::query(
                    "INSERT INTO usages (request_id, model, prompt_tokens, completion_tokens, total_tokens) VALUES ($1, $2, $3, $4, $5)"
                )
                .bind(&usage.request_id).bind(&usage.model)
                .bind(usage.prompt_tokens).bind(usage.completion_tokens).bind(usage.total_tokens)
                .execute(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
            }
        }
        Ok(())
    }

    pub async fn list_usages(&self, limit: i64, offset: i64) -> Result<Vec<UsageRow>, StoreError> {
        match &self.pool {
            DatabasePool::Sqlite(pool) => {
                sqlx::query_as::<_, UsageRow>(
                    "SELECT * FROM usages ORDER BY id DESC LIMIT ? OFFSET ?"
                ).bind(limit).bind(offset)
                    .fetch_all(pool).await.map_err(|e| StoreError::Query(e.to_string()))
            }
            DatabasePool::Postgres(pool) => {
                sqlx::query_as::<_, UsageRow>(
                    "SELECT * FROM usages ORDER BY id DESC LIMIT $1 OFFSET $2"
                ).bind(limit).bind(offset)
                    .fetch_all(pool).await.map_err(|e| StoreError::Query(e.to_string()))
            }
        }
    }

    // === Legacy compatibility ===

    pub async fn insert_request_log(
        &self,
        request_id: &str,
        protocol: &str,
        method: &str,
        path: &str,
        model: Option<&str>,
        upstream_name: Option<&str>,
        status_code: Option<i32>,
        request_body_size: Option<i64>,
        response_body_size: Option<i64>,
        latency_ms: Option<i64>,
        error_message: Option<&str>,
    ) -> Result<(), StoreError> {
        let inv = NewInvocation {
            request_id: request_id.to_owned(),
            account_name: upstream_name.map(String::from),
            protocol: protocol.to_owned(),
            method: method.to_owned(),
            path: path.to_owned(),
            model: model.map(String::from),
            status_code,
            latency_ms,
            error_message: error_message.map(String::from),
            request_body: None,
            response_body: None,
        };
        self.insert_invocation(&inv).await
    }

    pub async fn recent_request_logs(&self, limit: i64) -> Result<Vec<InvocationRow>, StoreError> {
        self.list_invocations(limit, 0).await
    }

    // === Cleanup ===

    pub async fn cleanup_invocations(&self, retention_days: i64) -> Result<u64, StoreError> {
        match &self.pool {
            DatabasePool::Sqlite(pool) => {
                let result = sqlx::query(
                    "DELETE FROM invocations WHERE created_at < datetime('now', ? || ' days')"
                ).bind(format!("-{}", retention_days))
                    .execute(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
                Ok(result.rows_affected())
            }
            DatabasePool::Postgres(pool) => {
                let result = sqlx::query(
                    "DELETE FROM invocations WHERE created_at < NOW() AT TIME ZONE 'UTC' - $1 * INTERVAL '1 day'"
                ).bind(retention_days)
                    .execute(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
                Ok(result.rows_affected())
            }
        }
    }

    // === Aggregate Queries ===

    pub async fn count_invocations(&self) -> Result<i64, StoreError> {
        match &self.pool {
            DatabasePool::Sqlite(pool) => {
                let row = sqlx::query("SELECT COUNT(*) as count FROM invocations")
                    .fetch_one(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
                Ok(row.get::<i64, _>("count"))
            }
            DatabasePool::Postgres(pool) => {
                let row = sqlx::query("SELECT COUNT(*) as count FROM invocations")
                    .fetch_one(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
                Ok(row.get::<i64, _>("count"))
            }
        }
    }

    pub async fn count_accounts(&self) -> Result<i64, StoreError> {
        match &self.pool {
            DatabasePool::Sqlite(pool) => {
                let row = sqlx::query("SELECT COUNT(*) as count FROM accounts")
                    .fetch_one(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
                Ok(row.get::<i64, _>("count"))
            }
            DatabasePool::Postgres(pool) => {
                let row = sqlx::query("SELECT COUNT(*) as count FROM accounts")
                    .fetch_one(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
                Ok(row.get::<i64, _>("count"))
            }
        }
    }

    pub async fn usage_totals(&self) -> Result<UsageTotals, StoreError> {
        match &self.pool {
            DatabasePool::Sqlite(pool) => {
                let row = sqlx::query(
                    "SELECT COALESCE(SUM(prompt_tokens), 0) as prompt_tokens, \
                     COALESCE(SUM(completion_tokens), 0) as completion_tokens, \
                     COALESCE(SUM(total_tokens), 0) as total_tokens \
                     FROM usages"
                )
                .fetch_one(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
                Ok(UsageTotals {
                    prompt_tokens: row.get::<i64, _>("prompt_tokens"),
                    completion_tokens: row.get::<i64, _>("completion_tokens"),
                    total_tokens: row.get::<i64, _>("total_tokens"),
                })
            }
            DatabasePool::Postgres(pool) => {
                let row = sqlx::query(
                    "SELECT COALESCE(SUM(prompt_tokens), 0) as prompt_tokens, \
                     COALESCE(SUM(completion_tokens), 0) as completion_tokens, \
                     COALESCE(SUM(total_tokens), 0) as total_tokens \
                     FROM usages"
                )
                .fetch_one(pool).await.map_err(|e| StoreError::Query(e.to_string()))?;
                Ok(UsageTotals {
                    prompt_tokens: row.get::<i64, _>("prompt_tokens"),
                    completion_tokens: row.get::<i64, _>("completion_tokens"),
                    total_tokens: row.get::<i64, _>("total_tokens"),
                })
            }
        }
    }

    pub async fn usage_by_model(&self) -> Result<Vec<UsageByModelRow>, StoreError> {
        match &self.pool {
            DatabasePool::Sqlite(pool) => {
                sqlx::query_as::<_, UsageByModelRow>(
                    "SELECT model, COUNT(*) as request_count, \
                     COALESCE(SUM(prompt_tokens), 0) as prompt_tokens, \
                     COALESCE(SUM(completion_tokens), 0) as completion_tokens, \
                     COALESCE(SUM(total_tokens), 0) as total_tokens \
                     FROM usages GROUP BY model ORDER BY total_tokens DESC"
                )
                .fetch_all(pool).await.map_err(|e| StoreError::Query(e.to_string()))
            }
            DatabasePool::Postgres(pool) => {
                sqlx::query_as::<_, UsageByModelRow>(
                    "SELECT model, COUNT(*) as request_count, \
                     COALESCE(SUM(prompt_tokens), 0) as prompt_tokens, \
                     COALESCE(SUM(completion_tokens), 0) as completion_tokens, \
                     COALESCE(SUM(total_tokens), 0) as total_tokens \
                     FROM usages GROUP BY model ORDER BY total_tokens DESC"
                )
                .fetch_all(pool).await.map_err(|e| StoreError::Query(e.to_string()))
            }
        }
    }
}
