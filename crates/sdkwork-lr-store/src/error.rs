use sqlx::error::Error as SqlxError;

#[derive(Debug)]
pub enum StoreError {
    Connection(String),
    Migration(String),
    Query(String),
    NotFound(String),
    Config(String),
}

impl std::fmt::Display for StoreError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Connection(msg) => write!(f, "database connection error: {msg}"),
            Self::Migration(msg) => write!(f, "migration error: {msg}"),
            Self::Query(msg) => write!(f, "query error: {msg}"),
            Self::NotFound(msg) => write!(f, "not found: {msg}"),
            Self::Config(msg) => write!(f, "config error: {msg}"),
        }
    }
}

impl std::error::Error for StoreError {}

impl From<SqlxError> for StoreError {
    fn from(e: SqlxError) -> Self {
        StoreError::Query(e.to_string())
    }
}
