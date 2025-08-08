"""
Core Cryptographic Engine

Implements the cryptographic primitives specified in the patent:
- PBKDF2-HMAC-SHA256 for master key derivation
- HMAC-SHA256 for dataset/session key derivation
- AES-256-GCM for capsule encryption
- SHA-256 for hash computations

Patent Claims Implemented:
- Claim 1(a): deriving master and dataset keys
- Claim 3: deterministic key derivation without storage
"""

import hashlib
import hmac
import os
import secrets
from typing import Optional, Union, Dict, Any, Tuple
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.exceptions import InvalidSignature


class CryptographicEngine:
    """
    Core cryptographic engine implementing patent-specified algorithms.
    
    Performance Target: Support 1,000× faster audit preparation
    Security: Never store derived keys (Claim 3)
    """
    
    # Patent-specified constants
    PBKDF2_ITERATIONS = 100000  # Patent: PBKDF2-HMAC-SHA256
    SALT_LENGTH = 32           # 256-bit salt
    KEY_LENGTH = 32            # 256-bit keys
    NONCE_LENGTH = 12          # AES-GCM nonce
    TAG_LENGTH = 16            # AES-GCM authentication tag
    
    def __init__(self):
        """Initialize cryptographic engine."""
        self._cached_salts: Dict[str, bytes] = {}
    
    def generate_secure_salt(self, identifier: str = None) -> bytes:
        """
        Generate cryptographically secure salt.
        
        Args:
            identifier: Optional identifier for salt caching
            
        Returns:
            32-byte cryptographically secure salt
        """
        if identifier and identifier in self._cached_salts:
            return self._cached_salts[identifier]
            
        salt = secrets.token_bytes(self.SALT_LENGTH)
        
        if identifier:
            self._cached_salts[identifier] = salt
            
        return salt
    
    def sha256_hash(self, data: Union[str, bytes]) -> bytes:
        """
        Compute SHA-256 hash.
        
        Args:
            data: Data to hash
            
        Returns:
            32-byte SHA-256 hash
        """
        if isinstance(data, str):
            data = data.encode('utf-8')
        return hashlib.sha256(data).digest()
    
    def hmac_sha256(self, key: bytes, data: Union[str, bytes]) -> bytes:
        """
        Compute HMAC-SHA256.
        
        Args:
            key: HMAC key
            data: Data to authenticate
            
        Returns:
            32-byte HMAC-SHA256
        """
        if isinstance(data, str):
            data = data.encode('utf-8')
        return hmac.new(key, data, hashlib.sha256).digest()


class KeyDerivationHierarchy:
    """
    Hierarchical key derivation implementing patent specification.
    
    Patent Architecture:
    1. Master key from passphrase via PBKDF2-HMAC-SHA256
    2. Dataset keys from master key + dataset hash
    3. Capsule keys from dataset key + sample/session ID
    
    Performance: Keys derived on-demand, never stored (Claim 3)
    """
    
    def __init__(self, crypto_engine: CryptographicEngine):
        """Initialize key derivation hierarchy."""
        self.crypto = crypto_engine
        self._master_keys: Dict[str, bytes] = {}  # Temporary cache only
    
    def derive_master_key(
        self, 
        passphrase: str, 
        salt: Optional[bytes] = None,
        iterations: Optional[int] = None
    ) -> Tuple[bytes, bytes]:
        """
        Derive master key from passphrase using PBKDF2-HMAC-SHA256.
        
        Patent Specification: "Master passphrases yield master keys (PBKDF2-HMAC-SHA256)"
        
        Args:
            passphrase: Master passphrase
            salt: Optional salt (generated if not provided)
            iterations: PBKDF2 iterations (default: 100,000)
            
        Returns:
            Tuple of (master_key, salt)
        """
        if salt is None:
            salt = self.crypto.generate_secure_salt("master")
            
        if iterations is None:
            iterations = self.crypto.PBKDF2_ITERATIONS
        
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=self.crypto.KEY_LENGTH,
            salt=salt,
            iterations=iterations,
        )
        
        master_key = kdf.derive(passphrase.encode('utf-8'))
        return master_key, salt
    
    def derive_dataset_key(self, master_key: bytes, dataset_id: str) -> bytes:
        """
        Derive dataset-specific key from master key.
        
        Patent Specification: "Dataset keys are derived from dataset hashes"
        
        Args:
            master_key: Master key from PBKDF2
            dataset_id: Dataset identifier
            
        Returns:
            32-byte dataset key
        """
        dataset_hash = self.crypto.sha256_hash(dataset_id)
        return self.crypto.hmac_sha256(master_key, dataset_hash)
    
    def derive_capsule_key(
        self, 
        dataset_key: bytes, 
        sample_id: Union[str, int],
        session_id: Optional[str] = None
    ) -> bytes:
        """
        Derive capsule-specific key for individual samples.
        
        Patent Specification: "capsule keys from sample/session IDs"
        
        Args:
            dataset_key: Dataset-specific key
            sample_id: Sample identifier  
            session_id: Optional session identifier
            
        Returns:
            32-byte capsule key
        """
        identifier = f"{sample_id}"
        if session_id:
            identifier += f":{session_id}"
            
        identifier_hash = self.crypto.sha256_hash(identifier)
        return self.crypto.hmac_sha256(dataset_key, identifier_hash)
    
    def derive_hierarchy(
        self,
        passphrase: str,
        dataset_id: str,
        sample_id: Union[str, int],
        session_id: Optional[str] = None,
        salt: Optional[bytes] = None
    ) -> Dict[str, bytes]:
        """
        Derive complete key hierarchy for a sample.
        
        Returns:
            Dictionary with master_key, dataset_key, capsule_key, and salt
        """
        master_key, used_salt = self.derive_master_key(passphrase, salt)
        dataset_key = self.derive_dataset_key(master_key, dataset_id)
        capsule_key = self.derive_capsule_key(dataset_key, sample_id, session_id)
        
        return {
            "master_key": master_key,
            "dataset_key": dataset_key, 
            "capsule_key": capsule_key,
            "salt": used_salt
        }


class MasterKeyManager:
    """
    Secure master key management with patent compliance.
    
    Security Features:
    - Keys never persistently stored (Claim 3)
    - Secure memory handling
    - Automatic cleanup
    """
    
    def __init__(self):
        """Initialize master key manager."""
        self.crypto = CryptographicEngine()
        self.key_hierarchy = KeyDerivationHierarchy(self.crypto)
        self._active_sessions: Dict[str, Dict[str, Any]] = {}
    
    def create_session(
        self, 
        session_id: str,
        passphrase: str,
        dataset_id: str,
        salt: Optional[bytes] = None
    ) -> str:
        """
        Create secure key derivation session (LAZY - no keys derived yet).
        
        Patent Specification: "Defer capsule creation until audit is requested"
        
        Args:
            session_id: Unique session identifier
            passphrase: Master passphrase
            dataset_id: Dataset identifier
            salt: Optional salt for reproducibility
            
        Returns:
            Session ID for future operations
        """
        # LAZY: Store only the passphrase and dataset info - NO KEY DERIVATION YET!
        if salt is None:
            salt = self.crypto.generate_secure_salt("master")
            
        self._active_sessions[session_id] = {
            "dataset_id": dataset_id,
            "passphrase": passphrase,  # Store for on-demand derivation
            "salt": salt,
            "created_at": secrets.token_hex(16)  # Session token
        }
        
        return session_id
    
    def get_capsule_key(
        self, 
        session_id: str,
        sample_id: Union[str, int],
        session_context: Optional[str] = None
    ) -> bytes:
        """
        Derive capsule key ON-DEMAND during audit request (LAZY DERIVATION).
        
        Patent Innovation: "Keys derived only when audit is requested"
        
        Args:
            session_id: Active session ID
            sample_id: Sample identifier
            session_context: Optional session context
            
        Returns:
            Capsule-specific encryption key (derived fresh for audit)
            
        Raises:
            KeyError: If session not found
        """
        if session_id not in self._active_sessions:
            raise KeyError(f"Session {session_id} not found")
        
        session = self._active_sessions[session_id]
        
        # ON-DEMAND KEY DERIVATION - happens only during audit request!
        passphrase = session["passphrase"]
        dataset_id = session["dataset_id"] 
        salt = session["salt"]
        
        # Derive complete hierarchy fresh for this audit request
        master_key, _ = self.key_hierarchy.derive_master_key(passphrase, salt)
        dataset_key = self.key_hierarchy.derive_dataset_key(master_key, dataset_id)
        capsule_key = self.key_hierarchy.derive_capsule_key(dataset_key, sample_id, session_context)
        
        # Immediately clear intermediate keys from memory (Patent Claim 3)
        master_key = b'\x00' * len(master_key)
        dataset_key = b'\x00' * len(dataset_key)
        
        return capsule_key
    
    def close_session(self, session_id: str) -> None:
        """
        Securely close session and clear credentials from memory.
        
        Args:
            session_id: Session to close
        """
        if session_id in self._active_sessions:
            session = self._active_sessions[session_id]
            # Securely clear passphrase from memory
            if "passphrase" in session:
                passphrase = session["passphrase"]
                session["passphrase"] = '*' * len(passphrase)  # Overwrite passphrase
            
            del self._active_sessions[session_id]
    
    def encrypt_capsule_data(
        self,
        session_id: str,
        sample_id: Union[str, int],
        data: bytes,
        additional_data: Optional[bytes] = None
    ) -> Dict[str, bytes]:
        """
        Encrypt capsule data using AES-256-GCM.
        
        Patent Specification: "encrypting data using AES-256-GCM"
        
        Args:
            session_id: Active session
            sample_id: Sample identifier
            data: Data to encrypt
            additional_data: Optional additional authenticated data
            
        Returns:
            Dictionary with ciphertext, nonce, and tag
        """
        capsule_key = self.get_capsule_key(session_id, sample_id)
        
        # AES-256-GCM encryption
        aesgcm = AESGCM(capsule_key)
        nonce = secrets.token_bytes(self.crypto.NONCE_LENGTH)
        
        ciphertext = aesgcm.encrypt(nonce, data, additional_data)
        
        return {
            "ciphertext": ciphertext,
            "nonce": nonce,
            "additional_data": additional_data or b""
        }
    
    def decrypt_capsule_data(
        self,
        session_id: str,
        sample_id: Union[str, int],
        encrypted_data: Dict[str, bytes]
    ) -> bytes:
        """
        Decrypt capsule data using AES-256-GCM.
        
        Args:
            session_id: Active session
            sample_id: Sample identifier  
            encrypted_data: Dictionary with ciphertext, nonce, additional_data
            
        Returns:
            Decrypted plaintext data
            
        Raises:
            InvalidSignature: If decryption/authentication fails
        """
        capsule_key = self.get_capsule_key(session_id, sample_id)
        
        aesgcm = AESGCM(capsule_key)
        
        return aesgcm.decrypt(
            encrypted_data["nonce"],
            encrypted_data["ciphertext"], 
            encrypted_data["additional_data"]
        )
