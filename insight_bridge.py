#!/usr/bin/env python3
"""
Insight Framework Bridge Service
A Python bridge service that connects the Insight framework to the Next.js frontend
"""

import asyncio
import json
import logging
import sys
from pathlib import Path
from typing import Dict, Any, Optional
from datetime import datetime

# Add the models directory to the Python path
current_dir = Path(__file__).parent
models_dir = current_dir / "models"
sys.path.insert(0, str(models_dir))

try:
    from insight.api.framework_new import InsightFramework
    from insight.anchoring.dataset_anchor import DatasetAnchor
    from insight.provenance.provenance_capsules import ProvenanceCapsule
    from insight.inference.receipts import InferenceReceipt
    from insight.compliance.validators import ComplianceValidator
    from insight.compliance.reports import ReportGenerator
except ImportError as e:
    print(f"Error importing Insight modules: {e}")
    print("Make sure the Insight framework is properly installed")
    sys.exit(1)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class InsightBridgeService:
    """Bridge service for connecting Insight framework to Next.js frontend"""
    
    def __init__(self):
        self.framework = InsightFramework()
        self.logger = logging.getLogger(self.__class__.__name__)
        
    async def create_dataset_anchor(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a dataset anchor"""
        try:
            dataset_id = data.get('dataset_id')
            dataset_metadata = data.get('metadata', {})
            
            anchor = await self.framework.create_dataset_anchor(
                dataset_id=dataset_id,
                metadata=dataset_metadata
            )
            
            return {
                'success': True,
                'anchor_id': anchor.anchor_id,
                'dataset_id': anchor.dataset_id,
                'hash': anchor.hash,
                'created_at': anchor.created_at.isoformat(),
                'metadata': anchor.metadata
            }
            
        except Exception as e:
            self.logger.error(f"Error creating dataset anchor: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    async def create_provenance_capsules(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create provenance capsules for data items"""
        try:
            dataset_id = data.get('dataset_id')
            data_items = data.get('data_items', [])
            
            capsules = []
            for item in data_items:
                capsule = await self.framework.create_provenance_capsule(
                    dataset_id=dataset_id,
                    item_id=item.get('id'),
                    content=item.get('content'),
                    metadata=item.get('metadata', {})
                )
                
                capsules.append({
                    'capsule_id': capsule.capsule_id,
                    'item_id': capsule.item_id,
                    'hash': capsule.hash,
                    'encrypted': capsule.encrypted,
                    'created_at': capsule.created_at.isoformat()
                })
            
            return {
                'success': True,
                'capsules_created': len(capsules),
                'capsules': capsules
            }
            
        except Exception as e:
            self.logger.error(f"Error creating provenance capsules: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    async def create_inference_receipt(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create an inference receipt"""
        try:
            model_id = data.get('model_id')
            input_data = data.get('input_data')
            output_prediction = data.get('output_prediction')
            confidence_score = data.get('confidence_score')
            metadata = data.get('metadata', {})
            
            receipt = await self.framework.create_inference_receipt(
                model_id=model_id,
                input_data=input_data,
                output_prediction=output_prediction,
                confidence_score=confidence_score,
                metadata=metadata
            )
            
            return {
                'success': True,
                'receipt': {
                    'receipt_id': receipt.receipt_id,
                    'model_id': receipt.model_id,
                    'input_hash': receipt.input_hash,
                    'output_hash': receipt.output_hash,
                    'confidence_score': receipt.confidence_score,
                    'timestamp': receipt.timestamp.isoformat(),
                    'cryptographic_proof': receipt.cryptographic_proof,
                    'verification_status': receipt.verification_status
                }
            }
            
        except Exception as e:
            self.logger.error(f"Error creating inference receipt: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    async def verify_item(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Verify an item (anchor, capsule, or receipt)"""
        try:
            item_id = data.get('item_id')
            item_type = data.get('item_type')
            
            if item_type == 'dataset_anchor':
                result = await self.framework.verify_dataset_anchor(item_id)
            elif item_type == 'provenance_capsule':
                result = await self.framework.verify_provenance_capsule(item_id)
            elif item_type == 'inference_receipt':
                result = await self.framework.verify_inference_receipt(item_id)
            else:
                raise ValueError(f"Unsupported item type: {item_type}")
            
            return {
                'success': True,
                'verification': {
                    'item_id': item_id,
                    'item_type': item_type,
                    'is_valid': result.is_valid,
                    'verification_timestamp': datetime.now().isoformat(),
                    'details': result.details,
                    'compliance_score': result.compliance_score
                }
            }
            
        except Exception as e:
            self.logger.error(f"Error verifying item: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    async def generate_report(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate a compliance or audit report"""
        try:
            report_type = data.get('report_type')
            filters = data.get('filters', {})
            
            report_generator = ReportGenerator()
            
            if report_type == 'compliance':
                report = await report_generator.generate_compliance_report(filters)
            elif report_type == 'audit':
                report = await report_generator.generate_audit_report(filters)
            elif report_type == 'transparency':
                report = await report_generator.generate_transparency_report(filters)
            elif report_type == 'risk_assessment':
                report = await report_generator.generate_risk_assessment_report(filters)
            else:
                raise ValueError(f"Unsupported report type: {report_type}")
            
            return {
                'success': True,
                'report': {
                    'report_id': report.report_id,
                    'report_type': report.report_type,
                    'generated_at': report.generated_at.isoformat(),
                    'data': report.data,
                    'status': report.status
                }
            }
            
        except Exception as e:
            self.logger.error(f"Error generating report: {e}")
            return {
                'success': False,
                'error': str(e)
            }

async def handle_request(request_data: str) -> str:
    """Handle a single request from the frontend"""
    try:
        data = json.loads(request_data)
        operation = data.get('operation')
        params = data.get('params', {})
        
        bridge = InsightBridgeService()
        
        if operation == 'create_dataset_anchor':
            result = await bridge.create_dataset_anchor(params)
        elif operation == 'create_provenance_capsules':
            result = await bridge.create_provenance_capsules(params)
        elif operation == 'create_inference_receipt':
            result = await bridge.create_inference_receipt(params)
        elif operation == 'verify_item':
            result = await bridge.verify_item(params)
        elif operation == 'generate_report':
            result = await bridge.generate_report(params)
        else:
            result = {
                'success': False,
                'error': f'Unknown operation: {operation}'
            }
        
        return json.dumps(result)
        
    except Exception as e:
        logger.error(f"Error handling request: {e}")
        return json.dumps({
            'success': False,
            'error': str(e)
        })

async def main():
    """Main function for running the bridge service"""
    logger.info("Starting Insight Bridge Service")
    
    # Read from stdin and write to stdout for communication with Node.js
    while True:
        try:
            # Read request from stdin
            line = input()
            if not line:
                break
                
            # Process request
            result = await handle_request(line)
            
            # Write result to stdout
            print(result)
            sys.stdout.flush()
            
        except EOFError:
            # End of input
            break
        except Exception as e:
            logger.error(f"Error in main loop: {e}")
            error_response = json.dumps({
                'success': False,
                'error': str(e)
            })
            print(error_response)
            sys.stdout.flush()

if __name__ == "__main__":
    asyncio.run(main())
