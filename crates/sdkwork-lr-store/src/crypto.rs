use aes_gcm::aead::{Aead, KeyInit, OsRng};
use aes_gcm::{Aes256Gcm, Aes256GcmKey, Nonce};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use rand::RngCore;

use std::fmt;

const NONCE_SIZE: usize = 12;
const ENCRYPTION_PREFIX: &str = "enc:v1:";

pub struct KeyEncryption {
    key: Aes256GcmKey<aes_gcm::aead::generic_array::typenum::U32>,
    enabled: bool,
}

impl fmt::Debug for KeyEncryption {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("KeyEncryption")
            .field("enabled", &self.enabled)
            .finish()
    }
}

impl KeyEncryption {
    pub fn new(secret: &str) -> Self {
        if secret.is_empty() {
            tracing::warn!("no encryption secret configured, API keys will be stored in plaintext");
            return Self {
                key: *Aes256GcmKey::<aes_gcm::aead::generic_array::typenum::U32>::from_slice(&[0u8; 32]),
                enabled: false,
            };
        }

        let key_bytes = Self::derive_key(secret);
        Self {
            key: *Aes256GcmKey::from_slice(&key_bytes),
            enabled: true,
        }
    }

    pub fn disabled() -> Self {
        Self {
            key: *Aes256GcmKey::<aes_gcm::aead::generic_array::typenum::U32>::from_slice(&[0u8; 32]),
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
                tracing::error!(error = %e, "failed to encrypt API key, storing plaintext");
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
                tracing::error!(error = %e, "failed to decode encrypted API key, returning as-is");
                return ciphertext.to_owned();
            }
        };

        if combined.len() < NONCE_SIZE + 1 {
            tracing::error!("encrypted API key too short, returning as-is");
            return ciphertext.to_owned();
        }

        let (nonce_bytes, encrypted_data) = combined.split_at(NONCE_SIZE);
        let nonce = Nonce::from_slice(nonce_bytes);
        let cipher = Aes256Gcm::new(&self.key);

        match cipher.decrypt(nonce, encrypted_data) {
            Ok(plaintext) => String::from_utf8(plaintext).unwrap_or_else(|e| {
                tracing::error!(error = %e, "decrypted API key is not valid UTF-8");
                ciphertext.to_owned()
            }),
            Err(e) => {
                tracing::error!(error = %e, "failed to decrypt API key, returning as-is");
                ciphertext.to_owned()
            }
        }
    }

    fn derive_key(secret: &str) -> [u8; 32] {
        use sha2::{Sha256, Digest};

        let salt = b"sdkwork-lr-key-derivation-salt-v1";
        let info = b"aes-256-gcm-key";

        let mut prk_input = Vec::with_capacity(salt.len() + secret.len());
        prk_input.extend_from_slice(salt);
        prk_input.extend_from_slice(secret.as_bytes());

        let mut hasher = Sha256::new();
        hasher.update(&prk_input);
        let prk = hasher.finalize();

        let mut okm_input = Vec::with_capacity(prk.len() + info.len() + 4);
        okm_input.extend_from_slice(&prk);
        okm_input.extend_from_slice(info);
        okm_input.extend_from_slice(&[0x01]);

        let mut hasher2 = Sha256::new();
        hasher2.update(&okm_input);
        let mut key = [0u8; 32];
        key.copy_from_slice(&hasher2.finalize()[..32]);

        let mut stretch_input = Vec::with_capacity(32 + secret.len());
        stretch_input.extend_from_slice(&key);
        stretch_input.extend_from_slice(secret.as_bytes());
        let mut hasher3 = Sha256::new();
        hasher3.update(&stretch_input);
        key.copy_from_slice(&hasher3.finalize()[..32]);

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
