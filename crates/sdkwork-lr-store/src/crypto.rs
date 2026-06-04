use aes_gcm::aead::{Aead, Key, KeyInit, OsRng};
use aes_gcm::{Aes256Gcm, Nonce};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use rand::RngCore;

use std::fmt;

const NONCE_SIZE: usize = 12;
const ENCRYPTION_PREFIX: &str = "enc:v1:";

type AesKey = Key<Aes256Gcm>;

#[derive(Clone)]
pub struct KeyEncryption {
    key: AesKey,
    enabled: bool,
}

impl fmt::Debug for KeyEncryption {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("KeyEncryption")
            .field("enabled", &self.enabled)
            .finish_non_exhaustive()
    }
}

impl KeyEncryption {
    pub fn new(secret: &str) -> Self {
        if secret.is_empty() {
            tracing::warn!(
                "no encryption secret configured, upstream API keys will be stored in plaintext"
            );
            return Self {
                key: Key::<Aes256Gcm>::from_slice(&[0u8; 32]).clone(),
                enabled: false,
            };
        }

        let key_bytes = Self::derive_key(secret);
        Self {
            key: *Key::<Aes256Gcm>::from_slice(&key_bytes),
            enabled: true,
        }
    }

    pub fn disabled() -> Self {
        Self {
            key: Key::<Aes256Gcm>::from_slice(&[0u8; 32]).clone(),
            enabled: false,
        }
    }

    pub fn is_enabled(&self) -> bool {
        self.enabled
    }

    pub fn encrypt(&self, plaintext: &str) -> String {
        if !self.enabled || plaintext.is_empty() {
            return plaintext.to_owned();
        }

        if plaintext.starts_with(ENCRYPTION_PREFIX) {
            return plaintext.to_owned();
        }

        let cipher = Aes256Gcm::new(&self.key);
        let mut nonce_bytes = [0u8; NONCE_SIZE];
        OsRng.fill_bytes(&mut nonce_bytes);
        let nonce = Nonce::from_slice(&nonce_bytes);

        match cipher.encrypt(nonce, plaintext.as_bytes()) {
            Ok(ciphertext) => {
                let mut combined = Vec::with_capacity(NONCE_SIZE + ciphertext.len());
                combined.extend_from_slice(&nonce_bytes);
                combined.extend_from_slice(&ciphertext);
                format!("{}{}", ENCRYPTION_PREFIX, BASE64.encode(&combined))
            }
            Err(e) => {
                tracing::error!(error = %e, "failed to encrypt upstream API key, storing plaintext");
                plaintext.to_owned()
            }
        }
    }

    pub fn decrypt(&self, ciphertext: &str) -> String {
        if !self.enabled {
            return ciphertext.to_owned();
        }

        if !ciphertext.starts_with(ENCRYPTION_PREFIX) {
            return ciphertext.to_owned();
        }

        let encoded = &ciphertext[ENCRYPTION_PREFIX.len()..];
        let combined = match BASE64.decode(encoded) {
            Ok(data) => data,
            Err(e) => {
                tracing::error!(error = %e, "failed to decode encrypted upstream API key, returning as-is");
                return ciphertext.to_owned();
            }
        };

        if combined.len() < NONCE_SIZE + 1 {
            tracing::error!("encrypted upstream API key too short, returning as-is");
            return ciphertext.to_owned();
        }

        let (nonce_bytes, encrypted_data) = combined.split_at(NONCE_SIZE);
        let nonce = Nonce::from_slice(nonce_bytes);
        let cipher = Aes256Gcm::new(&self.key);

        match cipher.decrypt(nonce, encrypted_data) {
            Ok(plaintext) => String::from_utf8(plaintext).unwrap_or_else(|e| {
                tracing::error!(error = %e, "decrypted upstream API key is not valid UTF-8");
                ciphertext.to_owned()
            }),
            Err(e) => {
                tracing::error!(error = %e, "failed to decrypt upstream API key, returning as-is");
                ciphertext.to_owned()
            }
        }
    }

    fn derive_key(secret: &str) -> [u8; 32] {
        use hkdf::Hkdf;
        use sha2::Sha256;

        // Per-secret unique salt mixed with a domain separator. HKDF-Expand
        // produces a uniformly random 32-byte AES-256 key from the input secret.
        let mut salt = Vec::with_capacity(secret.len() + 16);
        salt.extend_from_slice(b"sdkwork-lr-v1");
        salt.extend_from_slice(secret.as_bytes());
        let hk = Hkdf::<Sha256>::new(Some(&salt), secret.as_bytes());
        let mut key = [0u8; 32];
        hk.expand(b"aes-256-gcm-key", &mut key)
            .expect("HKDF expand for fixed-length 32-byte buffer is infallible");
        key
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_encrypt_decrypt_roundtrip() {
        let enc = KeyEncryption::new("test-secret-key");
        let original = "sk-1234567890abcdef";
        let encrypted = enc.encrypt(original);
        assert!(encrypted.starts_with(ENCRYPTION_PREFIX));
        assert_ne!(encrypted, original);
        let decrypted = enc.decrypt(&encrypted);
        assert_eq!(decrypted, original);
    }

    #[test]
    fn test_encrypt_empty_string() {
        let enc = KeyEncryption::new("test-secret-key");
        let encrypted = enc.encrypt("");
        assert_eq!(encrypted, "");
    }

    #[test]
    fn test_encrypt_already_encrypted() {
        let enc = KeyEncryption::new("test-secret-key");
        let already = "enc:v1:abc123";
        let result = enc.encrypt(already);
        assert_eq!(result, already);
    }

    #[test]
    fn test_decrypt_plaintext_when_disabled() {
        let enc = KeyEncryption::disabled();
        let plaintext = "sk-plaintext";
        let result = enc.decrypt(plaintext);
        assert_eq!(result, plaintext);
    }

    #[test]
    fn test_different_nonces_per_encryption() {
        let enc = KeyEncryption::new("test-secret-key");
        let original = "sk-same-key";
        let enc1 = enc.encrypt(original);
        let enc2 = enc.encrypt(original);
        assert_ne!(enc1, enc2);
        assert_eq!(enc.decrypt(&enc1), original);
        assert_eq!(enc.decrypt(&enc2), original);
    }

    #[test]
    fn test_different_secrets_produce_different_ciphertext() {
        let enc1 = KeyEncryption::new("secret-a");
        let enc2 = KeyEncryption::new("secret-b");
        let plaintext = "sk-test-key";
        let c1 = enc1.encrypt(plaintext);
        let c2 = enc2.encrypt(plaintext);
        assert_ne!(c1, c2);
    }
}
