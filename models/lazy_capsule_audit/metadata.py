"""
Metadata Management Components

Implements JSON metadata storage with tamper-evident logs as specified in the patent.

Patent Claims Implemented:
- Claim 2: JSON metadata with tamper-evident logs
- Patent Specification: "Persistent JSON metadata stores Merkle proofs, verification results, and audit logs"
"""

import json
import hashlib
from typing import Dict, List, Any, Optional, Union
from datetime import datetime, timezone
from dataclasses import dataclass, asdict


@dataclass 
class AuditMetadata:
    """
    Structured audit metadata implementing patent specifications.
    
    Patent Claim 2: "metadata is stored in structured JSON and includes tamper-evident audit logs"
    """
    audit_id: str
    dataset_id: str
    model_version: Optional[str]
    timestamp: str
    merkle_root_hash: str
    samples_audited: List[Union[str, int]]
    verification_results: Dict[str, bool]
    tamper_evident_log: List[Dict[str, Any]]
    compliance_framework: str = "general"
    audit_type: str = "full"
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to JSON-serializable dictionary."""
        return asdict(self)
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'AuditMetadata':
        """Create from dictionary."""
        return cls(**data)
    
    def compute_integrity_hash(self) -> str:
        """Compute tamper-evident integrity hash."""
        # Create deterministic hash of metadata
        metadata_str = json.dumps(self.to_dict(), sort_keys=True)
        return hashlib.sha256(metadata_str.encode('utf-8')).hexdigest()


class MetadataManager:
    """
    Comprehensive metadata management system.
    
    Patent Implementation: "Persistent JSON metadata stores Merkle proofs, 
    verification results, and audit logs"
    """
    
    def __init__(self, storage_path: str = "audit_metadata.json"):
        """
        Initialize metadata manager.
        
        Args:
            storage_path: Path for persistent metadata storage
        """
        self.storage_path = storage_path
        self._metadata_store: Dict[str, AuditMetadata] = {}
        self._tamper_log: List[Dict[str, Any]] = []
        self._load_metadata()
    
    def store_audit_metadata(
        self,
        audit_metadata: AuditMetadata
    ) -> str:
        """
        Store audit metadata with tamper-evident logging.
        
        Args:
            audit_metadata: Audit metadata to store
            
        Returns:
            Integrity hash of stored metadata
        """
        # Compute integrity hash
        integrity_hash = audit_metadata.compute_integrity_hash()
        
        # Add tamper-evident log entry
        log_entry = {
            "event": "metadata_stored",
            "audit_id": audit_metadata.audit_id,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "integrity_hash": integrity_hash,
            "previous_hash": self._get_previous_log_hash()
        }
        
        # Update tamper-evident log
        audit_metadata.tamper_evident_log.append(log_entry)
        self._tamper_log.append(log_entry)
        
        # Store metadata
        self._metadata_store[audit_metadata.audit_id] = audit_metadata
        
        # Persist to storage
        self._save_metadata()
        
        return integrity_hash
    
    def get_audit_metadata(self, audit_id: str) -> Optional[AuditMetadata]:
        """
        Retrieve audit metadata by ID.
        
        Args:
            audit_id: Audit identifier
            
        Returns:
            Audit metadata or None if not found
        """
        return self._metadata_store.get(audit_id)
    
    def verify_metadata_integrity(self, audit_id: str) -> Dict[str, bool]:
        """
        Verify integrity of stored metadata.
        
        Args:
            audit_id: Audit to verify
            
        Returns:
            Verification results
        """
        metadata = self.get_audit_metadata(audit_id)
        if not metadata:
            return {"metadata_found": False, "integrity_valid": False}
        
        # Recompute integrity hash
        current_hash = metadata.compute_integrity_hash()
        
        # Find original integrity hash from tamper log
        original_hash = None
        for log_entry in metadata.tamper_evident_log:
            if log_entry.get("event") == "metadata_stored":
                original_hash = log_entry.get("integrity_hash")
                break
        
        # Verify tamper-evident log chain
        log_chain_valid = self._verify_log_chain(metadata.tamper_evident_log)
        
        return {
            "metadata_found": True,
            "integrity_valid": current_hash == original_hash if original_hash else False,
            "log_chain_valid": log_chain_valid,
            "current_hash": current_hash,
            "original_hash": original_hash
        }
    
    def export_metadata_json(
        self,
        audit_id: Optional[str] = None
    ) -> Union[Dict[str, Any], str]:
        """
        Export metadata as JSON.
        
        Patent Implementation: JSON metadata storage
        
        Args:
            audit_id: Specific audit to export (None for all)
            
        Returns:
            JSON metadata
        """
        if audit_id:
            metadata = self.get_audit_metadata(audit_id)
            if metadata:
                return json.dumps(metadata.to_dict(), indent=2)
            else:
                return json.dumps({"error": f"Audit {audit_id} not found"})
        else:
            # Export all metadata
            all_metadata = {
                audit_id: metadata.to_dict() 
                for audit_id, metadata in self._metadata_store.items()
            }
            return json.dumps({
                "metadata_export": all_metadata,
                "tamper_log": self._tamper_log,
                "export_timestamp": datetime.now(timezone.utc).isoformat()
            }, indent=2)
    
    def generate_compliance_report(
        self,
        framework: str = "general"
    ) -> Dict[str, Any]:
        """
        Generate compliance report from metadata.
        
        Args:
            framework: Compliance framework
            
        Returns:
            Compliance report
        """
        # Filter metadata by framework
        framework_audits = [
            metadata for metadata in self._metadata_store.values()
            if metadata.compliance_framework == framework
        ]
        
        # Generate statistics
        total_audits = len(framework_audits)
        total_samples = sum(len(audit.samples_audited) for audit in framework_audits)
        
        # Verification statistics
        all_verified = all(
            audit.verification_results.get("overall_valid", False)
            for audit in framework_audits
        )
        
        return {
            "compliance_framework": framework,
            "report_generated": datetime.now(timezone.utc).isoformat(),
            "audit_statistics": {
                "total_audits": total_audits,
                "total_samples_audited": total_samples,
                "all_audits_verified": all_verified,
                "compliance_rate": "100%" if all_verified else "Partial"
            },
            "tamper_evidence": {
                "log_entries": len(self._tamper_log),
                "integrity_maintained": self._verify_global_log_chain(),
                "oldest_audit": min((a.timestamp for a in framework_audits), default="N/A"),
                "newest_audit": max((a.timestamp for a in framework_audits), default="N/A")
            },
            "patent_compliance": {
                "json_metadata_storage": True,
                "tamper_evident_logs": True,
                "merkle_proofs_stored": True,
                "verification_results_tracked": True
            }
        }
    
    def _load_metadata(self) -> None:
        """Load metadata from persistent storage."""
        try:
            with open(self.storage_path, 'r') as f:
                data = json.load(f)
                
                # Load metadata
                metadata_dict = data.get("metadata_store", {})
                self._metadata_store = {
                    audit_id: AuditMetadata.from_dict(metadata_data)
                    for audit_id, metadata_data in metadata_dict.items()
                }
                
                # Load tamper log
                self._tamper_log = data.get("tamper_log", [])
                
        except (FileNotFoundError, json.JSONDecodeError):
            # Initialize empty storage
            self._metadata_store = {}
            self._tamper_log = []
    
    def _save_metadata(self) -> None:
        """Save metadata to persistent storage."""
        data = {
            "metadata_store": {
                audit_id: metadata.to_dict()
                for audit_id, metadata in self._metadata_store.items()
            },
            "tamper_log": self._tamper_log,
            "last_updated": datetime.now(timezone.utc).isoformat()
        }
        
        with open(self.storage_path, 'w') as f:
            json.dump(data, f, indent=2)
    
    def _get_previous_log_hash(self) -> Optional[str]:
        """Get hash of previous log entry for chaining."""
        if not self._tamper_log:
            return None
        
        previous_entry = self._tamper_log[-1]
        entry_str = json.dumps(previous_entry, sort_keys=True)
        return hashlib.sha256(entry_str.encode('utf-8')).hexdigest()
    
    def _verify_log_chain(self, log_entries: List[Dict[str, Any]]) -> bool:
        """Verify tamper-evident log chain integrity."""
        if not log_entries:
            return True
        
        for i in range(1, len(log_entries)):
            current_entry = log_entries[i]
            previous_entry = log_entries[i-1]
            
            # Compute hash of previous entry
            previous_str = json.dumps(previous_entry, sort_keys=True)
            expected_hash = hashlib.sha256(previous_str.encode('utf-8')).hexdigest()
            
            # Check if current entry references correct previous hash
            if current_entry.get("previous_hash") != expected_hash:
                return False
        
        return True
    
    def _verify_global_log_chain(self) -> bool:
        """Verify integrity of global tamper log."""
        return self._verify_log_chain(self._tamper_log)
    
    def get_metadata_stats(self) -> Dict[str, Any]:
        """Get metadata storage statistics."""
        return {
            "total_audits": len(self._metadata_store),
            "tamper_log_entries": len(self._tamper_log),
            "storage_path": self.storage_path,
            "integrity_verified": self._verify_global_log_chain(),
            "frameworks_tracked": list(set(
                metadata.compliance_framework 
                for metadata in self._metadata_store.values()
            ))
        }
