"""
ML Model Wrappers for Real-time Lazy Capsule Materialization

This module provides wrapper classes around popular ML frameworks to enable:
1. Automatic lazy capsule registration during model training
2. Real-time tracking of model creation and parameters
3. Enhanced testability through audit trail integration
4. Seamless integration with the patent's lazy materialization system

Patent Claims Implemented:
- Lazy capsule materialization during model training
- Real-time audit trail generation
- Multi-framework support with consistent API
- Enhanced testability through provenance tracking

Supported Frameworks:
- Scikit-learn
- TensorFlow/Keras
- PyTorch
- XGBoost
- LightGBM
- Generic ML framework adapter
"""

import time
import json
import uuid
import inspect
from abc import ABC, abstractmethod
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Union, Tuple, Callable
from dataclasses import dataclass, asdict
import logging

# Import the lazy capsule system
from .capsule import LazyCapsuler
from .merkle import MerkleTreeBuilder


@dataclass
class ModelTrainingEvent:
    """
    Model training event for real-time tracking.
    
    Captures key information about model training phases:
    - Training start/end events
    - Parameter updates
    - Performance metrics
    - Data splits and validation
    """
    event_id: str
    model_id: str
    event_type: str  # 'training_start', 'epoch_end', 'validation', 'training_complete'
    timestamp: str
    parameters: Dict[str, Any]
    metrics: Dict[str, float]
    data_info: Dict[str, Any]
    framework: str
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to JSON-serializable dictionary."""
        return asdict(self)


@dataclass
class ModelTestabilityInfo:
    """
    Enhanced testability information for ML models.
    
    Provides comprehensive information needed for:
    - Reproducible model testing
    - Performance validation
    - Data lineage verification
    - Audit compliance
    """
    model_id: str
    framework: str
    model_type: str
    training_data_hash: str
    validation_data_hash: Optional[str]
    test_data_hash: Optional[str]
    hyperparameters: Dict[str, Any]
    training_metrics: Dict[str, float]
    validation_metrics: Dict[str, float]
    model_size_bytes: int
    training_duration_seconds: float
    reproducibility_seed: Optional[int]
    created_at: str
    audit_trail_id: str
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to JSON-serializable dictionary."""
        return asdict(self)


class MLModelWrapperBase(ABC):
    """
    Abstract base class for ML model wrappers.
    
    Defines the interface that all framework-specific wrappers must implement
    to enable lazy capsule materialization and real-time tracking.
    """
    
    def __init__(
        self,
        model_id: Optional[str] = None,
        lazy_capsuler: Optional[LazyCapsuler] = None,
        enable_tracking: bool = True,
        chunk_size: Optional[int] = None
    ):
        """
        Initialize ML model wrapper.
        
        Args:
            model_id: Unique model identifier (auto-generated if None)
            lazy_capsuler: Existing lazy capsuler (creates new if None)
            enable_tracking: Enable real-time tracking
            chunk_size: Chunk size for large dataset processing
        """
        self.model_id = model_id or f"model_{uuid.uuid4().hex[:8]}"
        self.framework = self.get_framework_name()
        self.enable_tracking = enable_tracking
        
        # Initialize lazy capsule system
        if lazy_capsuler is None:
            merkle_builder = MerkleTreeBuilder(chunk_size=chunk_size)
            # For ML wrapper, we'll use a simplified approach
            # Store the merkle builder directly instead of full lazy capsuler
            self.merkle_builder = merkle_builder
            self.dataset_id = f"{self.model_id}_dataset"
        else:
            self.lazy_capsuler = lazy_capsuler
            self.merkle_builder = lazy_capsuler.merkle_builder
            self.dataset_id = lazy_capsuler.dataset_id
        
        self.training_events: List[ModelTrainingEvent] = []
        self.testability_info: Optional[ModelTestabilityInfo] = None
        
        # Tracking state
        self.training_start_time: Optional[float] = None
        self.training_data_info: Optional[Dict[str, Any]] = None
        self.validation_data_info: Optional[Dict[str, Any]] = None
        self.current_hyperparameters: Dict[str, Any] = {}
        
        # Set up logging
        self.logger = logging.getLogger(f"MLWrapper.{self.framework}.{self.model_id}")
        
        if self.enable_tracking:
            self.logger.info(f"Initialized {self.framework} model wrapper with lazy capsule tracking")
    
    @abstractmethod
    def get_framework_name(self) -> str:
        """Return the ML framework name."""
        pass
    
    @abstractmethod
    def wrap_model(self, model: Any) -> Any:
        """Wrap the ML model with tracking capabilities."""
        pass
    
    @abstractmethod
    def extract_hyperparameters(self, model: Any) -> Dict[str, Any]:
        """Extract hyperparameters from the model."""
        pass
    
    @abstractmethod
    def get_model_size(self, model: Any) -> int:
        """Get model size in bytes."""
        pass
    
    def track_training_start(
        self,
        X_train: Any,
        y_train: Any,
        X_val: Optional[Any] = None,
        y_val: Optional[Any] = None,
        **kwargs
    ) -> None:
        """
        Track training start event with data registration.
        
        Args:
            X_train: Training features
            y_train: Training labels
            X_val: Optional validation features
            y_val: Optional validation labels
            **kwargs: Additional training parameters
        """
        if not self.enable_tracking:
            return
        
        self.training_start_time = time.time()
        
        # Register training data with lazy capsule system
        self._register_training_data(X_train, y_train, X_val, y_val)
        
        # Create training start event
        event = ModelTrainingEvent(
            event_id=f"{self.model_id}_training_start_{uuid.uuid4().hex[:8]}",
            model_id=self.model_id,
            event_type="training_start",
            timestamp=datetime.now(timezone.utc).isoformat(),
            parameters=kwargs,
            metrics={},
            data_info=self.training_data_info or {},
            framework=self.framework
        )
        
        self.training_events.append(event)
        self.logger.info(f"Training started for model {self.model_id}")
    
    def track_training_complete(
        self,
        model: Any,
        final_metrics: Optional[Dict[str, float]] = None
    ) -> ModelTestabilityInfo:
        """
        Track training completion and generate testability info.
        
        Args:
            model: Trained model
            final_metrics: Final training metrics
            
        Returns:
            Comprehensive testability information
        """
        if not self.enable_tracking:
            return self._create_minimal_testability_info(model)
        
        training_duration = 0.0
        if self.training_start_time:
            training_duration = time.time() - self.training_start_time
        
        # Extract model information
        hyperparameters = self.extract_hyperparameters(model)
        model_size = self.get_model_size(model)
        
        # Create training complete event
        event = ModelTrainingEvent(
            event_id=f"{self.model_id}_training_complete_{uuid.uuid4().hex[:8]}",
            model_id=self.model_id,
            event_type="training_complete",
            timestamp=datetime.now(timezone.utc).isoformat(),
            parameters=hyperparameters,
            metrics=final_metrics or {},
            data_info={"training_duration": training_duration},
            framework=self.framework
        )
        
        self.training_events.append(event)
        
        # Generate comprehensive dataset hash
        dataset_hash_info = self.merkle_builder.hash_dataset_comprehensive(
            self.dataset_id
        )
        
        # Create testability info
        self.testability_info = ModelTestabilityInfo(
            model_id=self.model_id,
            framework=self.framework,
            model_type=type(model).__name__,
            training_data_hash=dataset_hash_info.dataset_hash.hex(),
            validation_data_hash=self.validation_data_info.get("hash") if self.validation_data_info else None,
            test_data_hash=None,  # Will be set during testing
            hyperparameters=hyperparameters,
            training_metrics=final_metrics or {},
            validation_metrics={},  # Will be updated during validation
            model_size_bytes=model_size,
            training_duration_seconds=training_duration,
            reproducibility_seed=hyperparameters.get("random_state") or hyperparameters.get("seed"),
            created_at=datetime.now(timezone.utc).isoformat(),
            audit_trail_id=self.dataset_id
        )
        
        self.logger.info(f"Training completed for model {self.model_id} in {training_duration:.2f}s")
        return self.testability_info
    
    def track_validation(
        self,
        X_val: Any,
        y_val: Any,
        validation_metrics: Dict[str, float]
    ) -> None:
        """
        Track validation phase with metrics.
        
        Args:
            X_val: Validation features
            y_val: Validation labels
            validation_metrics: Validation performance metrics
        """
        if not self.enable_tracking:
            return
        
        # Register validation data
        self._register_validation_data(X_val, y_val)
        
        # Create validation event
        event = ModelTrainingEvent(
            event_id=f"{self.model_id}_validation_{uuid.uuid4().hex[:8]}",
            model_id=self.model_id,
            event_type="validation",
            timestamp=datetime.now(timezone.utc).isoformat(),
            parameters={},
            metrics=validation_metrics,
            data_info=self.validation_data_info or {},
            framework=self.framework
        )
        
        self.training_events.append(event)
        
        # Update testability info if available
        if self.testability_info:
            self.testability_info.validation_metrics = validation_metrics
            if self.validation_data_info and "hash" in self.validation_data_info:
                self.testability_info.validation_data_hash = self.validation_data_info["hash"]
    
    def track_testing(
        self,
        X_test: Any,
        y_test: Any,
        test_metrics: Dict[str, float]
    ) -> None:
        """
        Track testing phase with metrics.
        
        Args:
            X_test: Test features
            y_test: Test labels
            test_metrics: Test performance metrics
        """
        if not self.enable_tracking:
            return
        
        # Register test data
        test_data_info = self._register_test_data(X_test, y_test)
        
        # Update testability info
        if self.testability_info and test_data_info and "hash" in test_data_info:
            self.testability_info.test_data_hash = test_data_info["hash"]
    
    def generate_audit_capsules(
        self,
        sample_ids: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Generate audit capsules for model testability.
        
        Args:
            sample_ids: Specific samples to audit (audits all if None)
            
        Returns:
            Audit results with capsule information
        """
        if sample_ids is None:
            # Audit a representative sample
            registry = self.merkle_builder._sample_registry.get(self.dataset_id)
            if registry:
                all_samples = list(registry["plaintext_samples"].keys())
                sample_ids = all_samples[:min(10, len(all_samples))]  # Audit first 10 samples
        
        if not sample_ids:
            self.logger.warning("No samples available for audit")
            return {"capsules": [], "audit_info": {}}
        
        # For ML wrapper, we'll create a simplified audit process
        # Build tree during audit
        root_hash = self.merkle_builder.build_tree_during_audit(self.dataset_id, sample_ids)
        
        # Generate dataset hash info
        dataset_hash_info = self.merkle_builder.hash_dataset_comprehensive(self.dataset_id)
        
        # Create simple audit results
        capsules = []
        for sample_id in sample_ids:
            # Generate proof
            proof = self.merkle_builder.generate_proof_during_audit(self.dataset_id, sample_id)
            
            # Create simple capsule info (without full encryption for demo)
            capsule_info = {
                "sample_id": sample_id,
                "dataset_id": self.dataset_id,
                "merkle_proof": proof.to_dict(),
                "capsule_hash": f"capsule_hash_{sample_id}",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
            capsules.append(capsule_info)
        
        audit_results = {
            "capsules": capsules,
            "audit_info": {
                "dataset_hash": dataset_hash_info.dataset_hash.hex(),
                "root_hash": root_hash.hex(),
                "samples_audited": len(sample_ids),
                "audit_timestamp": datetime.now(timezone.utc).isoformat()
            }
        }
        
        # Add model-specific information
        audit_results["model_info"] = {
            "model_id": self.model_id,
            "framework": self.framework,
            "training_events_count": len(self.training_events),
            "testability_info": self.testability_info.to_dict() if self.testability_info else None
        }
        
        return audit_results
    
    def get_comprehensive_tracking_info(self) -> Dict[str, Any]:
        """
        Get comprehensive tracking information for testability analysis.
        
        Returns:
            Complete tracking information including events, hashes, and metrics
        """
        # Get hash information
        hash_info = self.merkle_builder.get_comprehensive_hash_info(
            self.dataset_id
        )
        
        return {
            "model_id": self.model_id,
            "framework": self.framework,
            "training_events": [event.to_dict() for event in self.training_events],
            "testability_info": self.testability_info.to_dict() if self.testability_info else None,
            "hash_information": hash_info,
            "audit_trail_id": self.dataset_id,
            "tracking_enabled": self.enable_tracking,
            "generated_at": datetime.now(timezone.utc).isoformat()
        }
    
    def _register_training_data(
        self,
        X_train: Any,
        y_train: Any,
        X_val: Optional[Any] = None,
        y_val: Optional[Any] = None
    ) -> None:
        """Register training data with lazy capsule system."""
        import numpy as np
        
        # Convert data to serializable format
        if hasattr(X_train, 'shape'):
            n_samples = X_train.shape[0]
            
            # Register individual samples
            for i in range(min(n_samples, 1000)):  # Limit for demo purposes
                sample_id = f"train_sample_{i:06d}"
                
                # Create sample data dict
                sample_data = {
                    "sample_id": sample_id,
                    "sample_type": "training",
                    "index": i
                }
                
                # Add features (limit size for practicality)
                if hasattr(X_train, 'iloc'):
                    # Pandas DataFrame
                    sample_data["features"] = X_train.iloc[i].to_dict()
                elif hasattr(X_train, '__getitem__'):
                    # Array-like
                    features = X_train[i]
                    if hasattr(features, 'tolist'):
                        features = features.tolist()
                    sample_data["features"] = features[:50] if len(str(features)) > 1000 else features
                
                # Add label
                if hasattr(y_train, 'iloc'):
                    # Pandas Series
                    label = y_train.iloc[i]
                elif hasattr(y_train, '__getitem__'):
                    label = y_train[i]
                    if hasattr(label, 'item'):
                        label = label.item()
                    sample_data["label"] = label
                
                # Register with lazy capsule system
                self.merkle_builder.register_sample_for_lazy_processing(
                    self.dataset_id,
                    sample_id,
                    sample_data
                )
            
            # Store training data info
            self.training_data_info = {
                "samples_registered": min(n_samples, 1000),
                "total_samples": n_samples,
                "features_shape": str(getattr(X_train, 'shape', 'unknown')),
                "labels_shape": str(getattr(y_train, 'shape', 'unknown')),
                "data_type": type(X_train).__name__
            }
        
        self.logger.info(f"Registered training data with {self.training_data_info.get('samples_registered', 0)} samples")
    
    def _register_validation_data(self, X_val: Any, y_val: Any) -> None:
        """Register validation data information."""
        if hasattr(X_val, 'shape'):
            # Create hash of validation data for reproducibility
            validation_hash = self.merkle_builder.hash_sample({
                "X_val_shape": str(X_val.shape),
                "y_val_shape": str(y_val.shape),
                "X_val_type": type(X_val).__name__,
                "y_val_type": type(y_val).__name__
            })
            
            self.validation_data_info = {
                "samples_count": X_val.shape[0],
                "features_shape": str(X_val.shape),
                "labels_shape": str(y_val.shape),
                "hash": validation_hash.hex()
            }
    
    def _register_test_data(self, X_test: Any, y_test: Any) -> Dict[str, Any]:
        """Register test data information."""
        if hasattr(X_test, 'shape'):
            # Create hash of test data for reproducibility
            test_hash = self.merkle_builder.hash_sample({
                "X_test_shape": str(X_test.shape),
                "y_test_shape": str(y_test.shape),
                "X_test_type": type(X_test).__name__,
                "y_test_type": type(y_test).__name__
            })
            
            return {
                "samples_count": X_test.shape[0],
                "features_shape": str(X_test.shape),
                "labels_shape": str(y_test.shape),
                "hash": test_hash.hex()
            }
        
        return {}
    
    def _create_minimal_testability_info(self, model: Any) -> ModelTestabilityInfo:
        """Create minimal testability info when tracking is disabled."""
        return ModelTestabilityInfo(
            model_id=self.model_id,
            framework=self.framework,
            model_type=type(model).__name__,
            training_data_hash="tracking_disabled",
            validation_data_hash=None,
            test_data_hash=None,
            hyperparameters={},
            training_metrics={},
            validation_metrics={},
            model_size_bytes=0,
            training_duration_seconds=0.0,
            reproducibility_seed=None,
            created_at=datetime.now(timezone.utc).isoformat(),
            audit_trail_id="tracking_disabled"
        )


class SklearnWrapper(MLModelWrapperBase):
    """
    Scikit-learn model wrapper for lazy capsule materialization.
    
    Provides seamless integration with scikit-learn models while enabling
    real-time tracking and enhanced testability.
    """
    
    def get_framework_name(self) -> str:
        return "scikit-learn"
    
    def wrap_model(self, model: Any) -> Any:
        """
        Wrap scikit-learn model with tracking capabilities.
        
        Args:
            model: Scikit-learn model instance
            
        Returns:
            Wrapped model with enhanced tracking
        """
        original_fit = model.fit
        original_predict = model.predict
        
        def tracked_fit(X, y, **kwargs):
            """Tracked fit method."""
            # Extract validation data if provided
            X_val = kwargs.pop('X_val', None)
            y_val = kwargs.pop('y_val', None)
            
            # Track training start
            self.track_training_start(X, y, X_val, y_val, **kwargs)
            
            # Call original fit
            result = original_fit(X, y, **kwargs)
            
            # Extract training metrics if available
            training_metrics = {}
            if hasattr(model, 'score'):
                try:
                    training_metrics['training_score'] = model.score(X, y)
                except:
                    pass
            
            # Track training complete
            self.track_training_complete(model, training_metrics)
            
            return result
        
        def tracked_predict(X, **kwargs):
            """Tracked predict method."""
            result = original_predict(X, **kwargs)
            
            # Log prediction if tracking enabled
            if self.enable_tracking:
                self.logger.debug(f"Prediction made on {getattr(X, 'shape', ['unknown'])[0]} samples")
            
            return result
        
        # Replace methods
        model.fit = tracked_fit
        model.predict = tracked_predict
        
        # Store reference to wrapper
        model._lazy_capsule_wrapper = self
        
        return model
    
    def extract_hyperparameters(self, model: Any) -> Dict[str, Any]:
        """Extract hyperparameters from scikit-learn model."""
        if hasattr(model, 'get_params'):
            return model.get_params()
        return {}
    
    def get_model_size(self, model: Any) -> int:
        """Estimate scikit-learn model size in bytes."""
        import sys
        
        try:
            # Get size of model object
            size = sys.getsizeof(model)
            
            # Add size of important attributes
            for attr_name in dir(model):
                if not attr_name.startswith('_'):
                    try:
                        attr = getattr(model, attr_name)
                        if hasattr(attr, '__len__') and not callable(attr):
                            size += sys.getsizeof(attr)
                    except:
                        pass
            
            return size
        except:
            return 0


class TensorFlowWrapper(MLModelWrapperBase):
    """
    TensorFlow/Keras model wrapper for lazy capsule materialization.
    """
    
    def get_framework_name(self) -> str:
        return "tensorflow"
    
    def wrap_model(self, model: Any) -> Any:
        """Wrap TensorFlow/Keras model with tracking."""
        original_fit = model.fit
        original_compile = model.compile
        
        def tracked_compile(*args, **kwargs):
            """Track model compilation."""
            result = original_compile(*args, **kwargs)
            
            # Store compilation parameters
            self.current_hyperparameters.update({
                'optimizer': str(kwargs.get('optimizer', 'unknown')),
                'loss': str(kwargs.get('loss', 'unknown')),
                'metrics': str(kwargs.get('metrics', []))
            })
            
            return result
        
        def tracked_fit(X, y, **kwargs):
            """Tracked fit method for TensorFlow."""
            # Extract validation data
            validation_data = kwargs.get('validation_data')
            X_val, y_val = None, None
            if validation_data:
                X_val, y_val = validation_data[:2]
            
            # Track training start
            fit_kwargs = {k: v for k, v in kwargs.items() if k != 'validation_data'}
            self.track_training_start(X, y, X_val, y_val, **fit_kwargs)
            
            # Call original fit
            history = original_fit(X, y, **kwargs)
            
            # Extract final metrics from history
            final_metrics = {}
            if hasattr(history, 'history') and history.history:
                for metric, values in history.history.items():
                    if values:
                        final_metrics[f'final_{metric}'] = float(values[-1])
            
            # Track training complete
            self.track_training_complete(model, final_metrics)
            
            return history
        
        # Replace methods
        model.compile = tracked_compile
        model.fit = tracked_fit
        model._lazy_capsule_wrapper = self
        
        return model
    
    def extract_hyperparameters(self, model: Any) -> Dict[str, Any]:
        """Extract TensorFlow model hyperparameters."""
        params = self.current_hyperparameters.copy()
        
        # Add model architecture info
        if hasattr(model, 'layers'):
            params['layer_count'] = len(model.layers)
            params['trainable_params'] = model.count_params() if hasattr(model, 'count_params') else 0
        
        return params
    
    def get_model_size(self, model: Any) -> int:
        """Get TensorFlow model size in bytes."""
        try:
            if hasattr(model, 'count_params'):
                # Estimate: 4 bytes per parameter (float32)
                return model.count_params() * 4
        except:
            pass
        return 0


class PyTorchWrapper(MLModelWrapperBase):
    """
    PyTorch model wrapper for lazy capsule materialization.
    """
    
    def get_framework_name(self) -> str:
        return "pytorch"
    
    def wrap_model(self, model: Any) -> Any:
        """Wrap PyTorch model with tracking."""
        # PyTorch models require manual training loop wrapping
        # This is a placeholder for the wrapper interface
        model._lazy_capsule_wrapper = self
        return model
    
    def extract_hyperparameters(self, model: Any) -> Dict[str, Any]:
        """Extract PyTorch model hyperparameters."""
        params = {}
        
        # Get model parameters count
        if hasattr(model, 'parameters'):
            try:
                total_params = sum(p.numel() for p in model.parameters())
                trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
                params.update({
                    'total_parameters': total_params,
                    'trainable_parameters': trainable_params
                })
            except:
                pass
        
        return params
    
    def get_model_size(self, model: Any) -> int:
        """Get PyTorch model size in bytes."""
        try:
            if hasattr(model, 'parameters'):
                total_params = sum(p.numel() for p in model.parameters())
                return total_params * 4  # Estimate 4 bytes per parameter
        except:
            pass
        return 0


class XGBoostWrapper(MLModelWrapperBase):
    """
    XGBoost model wrapper for lazy capsule materialization.
    """
    
    def get_framework_name(self) -> str:
        return "xgboost"
    
    def wrap_model(self, model: Any) -> Any:
        """Wrap XGBoost model with tracking."""
        original_fit = model.fit
        
        def tracked_fit(X, y, **kwargs):
            """Tracked fit method for XGBoost."""
            # Extract validation data
            eval_set = kwargs.get('eval_set')
            X_val, y_val = None, None
            if eval_set and len(eval_set) > 0:
                X_val, y_val = eval_set[0]
            
            # Track training start
            fit_kwargs = {k: v for k, v in kwargs.items() if k != 'eval_set'}
            self.track_training_start(X, y, X_val, y_val, **fit_kwargs)
            
            # Call original fit
            result = original_fit(X, y, **kwargs)
            
            # Extract metrics if available
            final_metrics = {}
            if hasattr(model, 'evals_result_'):
                evals = model.evals_result_
                for eval_name, metrics in evals.items():
                    for metric_name, values in metrics.items():
                        if values:
                            final_metrics[f'{eval_name}_{metric_name}'] = float(values[-1])
            
            # Track training complete
            self.track_training_complete(model, final_metrics)
            
            return result
        
        model.fit = tracked_fit
        model._lazy_capsule_wrapper = self
        return model
    
    def extract_hyperparameters(self, model: Any) -> Dict[str, Any]:
        """Extract XGBoost hyperparameters."""
        if hasattr(model, 'get_params'):
            return model.get_params()
        return {}
    
    def get_model_size(self, model: Any) -> int:
        """Get XGBoost model size in bytes."""
        try:
            # Use save_raw to get model data size
            import io
            buffer = io.BytesIO()
            model.save_model(buffer)
            return len(buffer.getvalue())
        except:
            return 0


def create_wrapper(
    framework: str,
    model_id: Optional[str] = None,
    enable_tracking: bool = True,
    chunk_size: Optional[int] = None
) -> MLModelWrapperBase:
    """
    Factory function to create appropriate ML framework wrapper.
    
    Args:
        framework: ML framework name ('sklearn', 'tensorflow', 'pytorch', 'xgboost')
        model_id: Optional model identifier
        enable_tracking: Enable real-time tracking
        chunk_size: Chunk size for large datasets
        
    Returns:
        Framework-specific wrapper instance
    """
    framework_map = {
        'sklearn': SklearnWrapper,
        'scikit-learn': SklearnWrapper,
        'tensorflow': TensorFlowWrapper,
        'keras': TensorFlowWrapper,
        'pytorch': PyTorchWrapper,
        'torch': PyTorchWrapper,
        'xgboost': XGBoostWrapper,
        'xgb': XGBoostWrapper
    }
    
    framework_lower = framework.lower()
    if framework_lower not in framework_map:
        raise ValueError(f"Unsupported framework: {framework}. Supported: {list(framework_map.keys())}")
    
    wrapper_class = framework_map[framework_lower]
    return wrapper_class(
        model_id=model_id,
        enable_tracking=enable_tracking,
        chunk_size=chunk_size
    )


def wrap_model(
    model: Any,
    framework: str,
    model_id: Optional[str] = None,
    enable_tracking: bool = True,
    chunk_size: Optional[int] = None
) -> Tuple[Any, MLModelWrapperBase]:
    """
    Convenience function to wrap an existing model with lazy capsule tracking.
    
    Args:
        model: ML model to wrap
        framework: ML framework name
        model_id: Optional model identifier
        enable_tracking: Enable real-time tracking
        chunk_size: Chunk size for large datasets
        
    Returns:
        Tuple of (wrapped_model, wrapper_instance)
    """
    wrapper = create_wrapper(
        framework=framework,
        model_id=model_id,
        enable_tracking=enable_tracking,
        chunk_size=chunk_size
    )
    
    wrapped_model = wrapper.wrap_model(model)
    return wrapped_model, wrapper
