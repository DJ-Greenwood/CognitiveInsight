"""
CIAF REST API Server

FastAPI-based REST API for the Cognitive Insight AI Framework.
Provides HTTP endpoints for all CIAF operations.
"""

from fastapi import FastAPI, HTTPException, Depends, Security, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any
import uvicorn
from datetime import datetime
import logging
import os
from contextlib import asynccontextmanager

# Import CIAF modules
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))

from models.ciaf import (
    CIAFFramework,
    DatasetAnchor,
    ProvenanceCapsule,
    ModelAggregationKey,
    TrainingSnapshot,
    InferenceReceipt,
    AuditTrailGenerator,
    MetadataStorage
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Security
security = HTTPBearer()

# Global CIAF framework instance
ciaf_framework: Optional[CIAFFramework] = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan management"""
    global ciaf_framework
    logger.info("Starting CIAF API Server...")
    ciaf_framework = CIAFFramework("CIAF_API_Server")
    yield
    logger.info("Shutting down CIAF API Server...")

# Initialize FastAPI app
app = FastAPI(
    title="CIAF REST API",
    description="Cryptographically Integrated AI Framework REST API",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class DatasetMetadata(BaseModel):
    source: str
    date_created: str
    record_count: int
    contains_pii: bool = False
    description: Optional[str] = None

class CreateDatasetAnchorRequest(BaseModel):
    dataset_id: str = Field(..., description="Unique identifier for the dataset")
    metadata: DatasetMetadata
    master_password: str = Field(..., description="Master password for key derivation")
    salt: Optional[str] = Field(None, description="Optional custom salt")

class DatasetAnchorResponse(BaseModel):
    success: bool
    dataset_anchor: Dict[str, Any]
    message: str

class DataItem(BaseModel):
    id: str
    content: str
    metadata: Dict[str, Any]

class CreateProvenanceCapsuleRequest(BaseModel):
    dataset_id: str
    data_items: List[DataItem]

class ProvenanceCapsuleResponse(BaseModel):
    success: bool
    capsules_created: int
    capsules: List[Dict[str, Any]]

class TrainingRequest(BaseModel):
    model_name: str
    model_version: str
    capsule_ids: List[str]
    training_params: Dict[str, Any]
    authorized_datasets: List[str]

class TrainingResponse(BaseModel):
    success: bool
    training_snapshot: Dict[str, Any]

class InferenceRequest(BaseModel):
    model_name: str
    query: str
    ai_output: str
    confidence_score: float
    training_snapshot_id: str
    metadata: Optional[Dict[str, Any]] = None

class InferenceResponse(BaseModel):
    success: bool
    receipt: Dict[str, Any]

class AuditRequest(BaseModel):
    model_name: str
    event_type: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None

class AuditResponse(BaseModel):
    success: bool
    audit_records: List[Dict[str, Any]]
    total_records: int

# Authentication function
async def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    """Verify API token - implement your authentication logic here"""
    token = credentials.credentials
    
    # For demo purposes, accept any token starting with "ciaf_"
    # In production, implement proper JWT validation or API key verification
    if not token.startswith("ciaf_"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return token

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }

# Dataset Anchor endpoints
@app.post("/api/dataset-anchor/create", response_model=DatasetAnchorResponse)
async def create_dataset_anchor(
    request: CreateDatasetAnchorRequest,
    token: str = Depends(verify_token)
):
    """Create a new cryptographically secured dataset anchor"""
    try:
        logger.info(f"Creating dataset anchor: {request.dataset_id}")
        
        anchor = ciaf_framework.create_dataset_anchor(
            dataset_id=request.dataset_id,
            dataset_metadata=request.metadata.dict(),
            master_password=request.master_password
        )
        
        return DatasetAnchorResponse(
            success=True,
            dataset_anchor={
                "dataset_id": anchor.dataset_id,
                "dataset_fingerprint": anchor.dataset_fingerprint,
                "created_at": datetime.utcnow().isoformat(),
                "metadata": request.metadata.dict()
            },
            message=f"Dataset anchor created successfully for {request.dataset_id}"
        )
        
    except Exception as e:
        logger.error(f"Error creating dataset anchor: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/dataset-anchor/{dataset_id}")
async def get_dataset_anchor(
    dataset_id: str,
    token: str = Depends(verify_token)
):
    """Get dataset anchor information"""
    try:
        if dataset_id not in ciaf_framework.dataset_anchors:
            raise HTTPException(status_code=404, detail="Dataset anchor not found")
            
        anchor = ciaf_framework.dataset_anchors[dataset_id]
        
        return {
            "success": True,
            "dataset_anchor": {
                "dataset_id": anchor.dataset_id,
                "dataset_fingerprint": anchor.dataset_fingerprint,
                "data_items_count": len(anchor.data_items),
                "metadata": anchor.metadata
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving dataset anchor: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Provenance Capsule endpoints
@app.post("/api/provenance/create-capsules", response_model=ProvenanceCapsuleResponse)
async def create_provenance_capsules(
    request: CreateProvenanceCapsuleRequest,
    token: str = Depends(verify_token)
):
    """Generate provenance capsules for dataset items"""
    try:
        logger.info(f"Creating provenance capsules for dataset: {request.dataset_id}")
        
        # Convert DataItem objects to dictionaries
        data_items = []
        for item in request.data_items:
            data_items.append({
                "content": item.content,
                "metadata": {**item.metadata, "id": item.id}
            })
        
        capsules = ciaf_framework.create_provenance_capsules(
            dataset_id=request.dataset_id,
            data_items=data_items
        )
        
        capsule_data = []
        for capsule in capsules:
            capsule_data.append({
                "capsule_id": capsule.capsule_id,
                "item_id": capsule.original_item_id,
                "hash": capsule.capsule_hash,
                "encrypted": True,
                "created_at": datetime.utcnow().isoformat()
            })
        
        return ProvenanceCapsuleResponse(
            success=True,
            capsules_created=len(capsules),
            capsules=capsule_data
        )
        
    except Exception as e:
        logger.error(f"Error creating provenance capsules: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Model Training endpoints
@app.post("/api/model/train", response_model=TrainingResponse)
async def train_model(
    request: TrainingRequest,
    token: str = Depends(verify_token)
):
    """Train model with CIAF provenance tracking"""
    try:
        logger.info(f"Training model: {request.model_name} v{request.model_version}")
        
        # Create Model Aggregation Key
        mak = ciaf_framework.create_model_aggregation_key(
            model_name=request.model_name,
            authorized_datasets=request.authorized_datasets
        )
        
        # Get capsules (in a real implementation, you'd retrieve by IDs)
        # For demo, we'll use empty list
        capsules = []
        
        # Train model
        snapshot = ciaf_framework.train_model(
            model_name=request.model_name,
            capsules=capsules,
            mak=mak,
            training_params=request.training_params,
            model_version=request.model_version
        )
        
        return TrainingResponse(
            success=True,
            training_snapshot={
                "snapshot_id": snapshot.snapshot_id,
                "model_version": snapshot.model_version,
                "provenance_root_hash": snapshot.merkle_root_hash,
                "training_completed_at": datetime.utcnow().isoformat(),
                "training_params": request.training_params
            }
        )
        
    except Exception as e:
        logger.error(f"Error training model: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Inference endpoints
@app.post("/api/inference/create-receipt", response_model=InferenceResponse)
async def create_inference_receipt(
    request: InferenceRequest,
    token: str = Depends(verify_token)
):
    """Generate uncertainty receipt for model inference"""
    try:
        logger.info(f"Creating inference receipt for model: {request.model_name}")
        
        # Create inference receipt (simplified for demo)
        from models.ciaf.inference import InferenceReceipt
        
        receipt = InferenceReceipt(
            query=request.query,
            ai_output=request.ai_output,
            model_version="current",
            training_snapshot_id=request.training_snapshot_id,
            confidence_score=request.confidence_score
        )
        
        return InferenceResponse(
            success=True,
            receipt={
                "receipt_hash": receipt.receipt_hash,
                "confidence_score": request.confidence_score,
                "timestamp": receipt.timestamp,
                "privacy_preserving": True,
                "model_name": request.model_name
            }
        )
        
    except Exception as e:
        logger.error(f"Error creating inference receipt: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Audit endpoints
@app.post("/api/audit/query", response_model=AuditResponse)
async def query_audit_trail(
    request: AuditRequest,
    token: str = Depends(verify_token)
):
    """Query audit trail for a model"""
    try:
        logger.info(f"Querying audit trail for model: {request.model_name}")
        
        # Create audit trail generator
        audit_gen = AuditTrailGenerator(request.model_name)
        
        # Get audit records
        records = audit_gen.get_audit_trail()
        
        # Convert records to dictionaries
        audit_data = []
        for record in records:
            audit_data.append({
                "event_id": record.event_id,
                "event_type": record.event_type.value,
                "timestamp": record.timestamp,
                "model_name": record.model_name,
                "model_version": record.model_version,
                "user_id": record.user_id,
                "compliance_status": record.compliance_status,
                "risk_level": record.risk_level
            })
        
        return AuditResponse(
            success=True,
            audit_records=audit_data,
            total_records=len(audit_data)
        )
        
    except Exception as e:
        logger.error(f"Error querying audit trail: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Utility endpoints
@app.get("/api/models")
async def list_models(token: str = Depends(verify_token)):
    """List all registered models"""
    try:
        models = list(ciaf_framework.ml_simulators.keys())
        return {
            "success": True,
            "models": models,
            "count": len(models)
        }
    except Exception as e:
        logger.error(f"Error listing models: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/datasets")
async def list_datasets(token: str = Depends(verify_token)):
    """List all dataset anchors"""
    try:
        datasets = []
        for dataset_id, anchor in ciaf_framework.dataset_anchors.items():
            datasets.append({
                "dataset_id": dataset_id,
                "fingerprint": anchor.dataset_fingerprint,
                "data_items_count": len(anchor.data_items)
            })
        
        return {
            "success": True,
            "datasets": datasets,
            "count": len(datasets)
        }
    except Exception as e:
        logger.error(f"Error listing datasets: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/performance/{dataset_id}")
async def get_performance_metrics(
    dataset_id: str,
    token: str = Depends(verify_token)
):
    """Get performance metrics for a dataset"""
    try:
        metrics = ciaf_framework.get_performance_metrics(dataset_id)
        return {
            "success": True,
            "metrics": metrics
        }
    except Exception as e:
        logger.error(f"Error getting performance metrics: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(
        "ciaf_api:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
