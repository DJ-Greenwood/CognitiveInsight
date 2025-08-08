"""
Lazy Capsule Materialization for Cryptographic AI Audit Trails

This package implements the USPTO Provisional Patent Application:
"Method and System for Lazy Capsule Materialization in Cryptographic 
Audit Trails for Artificial Intelligence Systems"

Patent Inventor: Denzil James Greenwood
Patent Reference: USPTO Provisional Application

Key Features:
- Lazy capsule materialization (1,000× performance improvement)
- Hierarchical key derivation (PBKDF2-HMAC-SHA256)
- Merkle tree integrity verification
- AES-256-GCM encryption
- Zero-knowledge audit capability
- Multi-model versioning support

Architecture:
- Core: Cryptographic primitives and key management
- Audit: Audit trail management and compliance
- Capsule: Lazy capsule materialization engine
- Merkle: Merkle tree construction and verification
- Cache: Intelligent caching for 20-30× speedup
- Registry: Multi-model version tracking
"""

from .audit_trail import AuditTrailManager
from .capsule import LazyCapsuler, AuditCapsule
from .core import (
    CryptographicEngine,
    KeyDerivationHierarchy, 
    MasterKeyManager
)
from .merkle import MerkleTreeBuilder, MerkleProof
from .registry import MultiModelRegistry
from .cache import ProofCache, VerificationCache
from .metadata import MetadataManager, AuditMetadata

__version__ = "0.1.0"
__author__ = "Denzil James Greenwood"
__patent__ = "USPTO Provisional Application - Lazy Capsule Materialization"

__all__ = [
    # Main API
    "AuditTrailManager",
    "LazyCapsuler",
    "AuditCapsule",
    
    # Core cryptographic components
    "CryptographicEngine", 
    "KeyDerivationHierarchy",
    "MasterKeyManager",
    
    # Merkle tree components
    "MerkleTreeBuilder",
    "MerkleProof",
    
    # Registry and versioning
    "MultiModelRegistry",
    
    # Caching components
    "ProofCache",
    "VerificationCache",
    
    # Metadata management
    "MetadataManager",
    "AuditMetadata",
]

# Patent implementation verification
PATENT_CLAIMS_IMPLEMENTED = {
    "claim_1": "Cryptographically verifiable audit trails with lazy generation",
    "claim_2": "JSON metadata with tamper-evident logs", 
    "claim_3": "Deterministic key derivation without storage",
    "claim_4": "Performance enhancement via caching",
    "claim_5": "Multi-Model Registry for version tracking",
    "claim_6": "System with memory and processors",
    "claim_7": "Computer-readable medium with instructions"
}

PERFORMANCE_TARGETS = {
    "audit_preparation_speedup": "1000x",
    "memory_efficiency": "99%",
    "proof_cache_acceleration": "20-30x", 
    "storage_complexity": "O(1) per sample"
}

def get_patent_info():
    """Return patent implementation information."""
    return {
        "title": "Method and System for Lazy Capsule Materialization in Cryptographic Audit Trails for Artificial Intelligence Systems",
        "inventor": "Denzil James Greenwood",
        "residence": "Marietta, Oklahoma",
        "citizenship": "United States",
        "claims_implemented": PATENT_CLAIMS_IMPLEMENTED,
        "performance_targets": PERFORMANCE_TARGETS,
        "version": __version__
    }
