import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Shield, Database, Zap, GitBranch, Lock } from 'lucide-react';

const architectureComponents = [
  {
    name: 'Core Cryptography',
    icon: Shield,
    description: 'AES-GCM encryption, SHA-256 hashing, HMAC authentication',
    technologies: ['Python', 'cryptography', 'hashlib', 'hmac'],
    features: [
      'AES-256 GCM encryption for data protection',
      'SHA-256 hashing for integrity verification', 
      'HMAC-SHA256 for authenticated key derivation',
      'Secure random number generation'
    ]
  },
  {
    name: 'Dataset Anchoring',
    icon: Database,
    description: 'Immutable dataset fingerprinting and provenance tracking',
    technologies: ['Python', 'Merkle Trees', 'Lazy Evaluation'],
    features: [
      'Cryptographic dataset fingerprinting',
      'Merkle tree-based integrity proofs',
      'Lazy capsule materialization',
      'Hierarchical key derivation'
    ]
  },
  {
    name: 'Provenance System',
    icon: GitBranch,
    description: 'Complete data lineage and transformation tracking',
    technologies: ['Python', 'JSON', 'UUID', 'Timestamps'],
    features: [
      'End-to-end data lineage tracking',
      'Tamper-evident transformation logs',
      'Model aggregation key (MAK) binding',
      'Training snapshot capture'
    ]
  },
  {
    name: 'Compliance Engine',
    icon: Lock,
    description: 'Automated compliance checking and audit trail generation',
    technologies: ['Python', 'JSON Schema', 'Audit Logging'],
    features: [
      'Multi-framework compliance checking',
      'Automated audit trail generation',
      'Risk assessment and categorization',
      'Corrective action logging'
    ]
  }
];

const codeExamples = {
  'dataset-anchor': `# Create a cryptographically secured dataset anchor
from ciaf import DatasetAnchor, MetadataCapture

# Initialize dataset anchor with master password
anchor = DatasetAnchor(
    dataset_id="customer_data_v1",
    metadata={
        "source": "customer_database",
        "date_created": "2025-08-04",
        "record_count": 50000,
        "contains_pii": True
    },
    master_password="secure_master_key",
    salt=b"dataset_specific_salt"
)

# Create provenance capsules with lazy materialization
capsules = []
for data_item in training_data:
    capsule = anchor.create_lazy_capsule(
        item_id=data_item["id"],
        original_data=data_item["content"],
        metadata=data_item["metadata"]
    )
    capsules.append(capsule)

print(f"Created {len(capsules)} provenance capsules")
print(f"Dataset fingerprint: {anchor.dataset_fingerprint}")`,

  'model-training': `# Train model with CIAF integration
from ciaf import CIAFFramework, ModelAggregationKey

# Initialize CIAF framework
ciaf = CIAFFramework("production_ai_system")

# Create Model Aggregation Key
mak = ciaf.create_model_aggregation_key(
    model_name="fraud_detection_v2",
    authorized_datasets=["customer_data_v1", "transaction_data_v1"]
)

# Train model with provenance tracking
training_params = {
    "algorithm": "xgboost",
    "max_depth": 6,
    "learning_rate": 0.1,
    "training_duration": "2.5 hours",
    "validation_accuracy": 0.94
}

snapshot = ciaf.train_model(
    model_name="fraud_detection_v2",
    capsules=provenance_capsules,
    mak=mak,
    training_params=training_params,
    model_version="2.1.0"
)

print(f"Training snapshot ID: {snapshot.snapshot_id}")
print(f"Merkle root hash: {snapshot.merkle_root_hash}")`,

  'inference-receipt': `# Generate uncertainty receipt for model inference
from ciaf.inference import InferenceReceipt, ZKEChain

# Create ZK-enabled inference chain
zk_chain = ZKEChain("fraud_detection_chain")

# Sample inference query
query = {
    "transaction_amount": 5000,
    "merchant_category": "electronics",
    "user_location": "New York",
    "time_of_day": "evening"
}

# Generate inference with uncertainty receipt
receipt = zk_chain.create_receipt(
    query=json.dumps(query),
    ai_output="FLAGGED: High fraud probability (0.87)",
    model_version="2.1.0",
    training_snapshot_id=snapshot.snapshot_id,
    confidence_score=0.87,
    bias_indicators={
        "geographic_bias": 0.12,
        "temporal_bias": 0.08
    }
)

print(f"Receipt hash: {receipt.receipt_hash}")
print(f"Uncertainty quantified: {receipt.confidence_score}")
print(f"Privacy preserved: {receipt.privacy_preserving}")`,

  'audit-trail': `# Generate comprehensive audit trail
from ciaf.compliance import AuditTrailGenerator

# Initialize audit trail for model
audit_gen = AuditTrailGenerator(
    model_name="fraud_detection_v2",
    compliance_frameworks=["GDPR", "SOX", "PCI-DSS"]
)

# Record training event
training_record = audit_gen.record_training_event(
    training_snapshot=snapshot,
    training_params=training_params,
    user_id="data_scientist_001"
)

# Record inference events
inference_record = audit_gen.record_inference_event(
    receipt=receipt,
    query_metadata={"contains_pii": False, "high_risk": True},
    user_id="api_service"
)

# Verify audit trail integrity
integrity_check = audit_gen.verify_audit_integrity()
print(f"Audit integrity verified: {integrity_check['integrity_verified']}")

# Export for regulatory submission
audit_export = audit_gen.export_audit_trail(format="json")
print(f"Audit trail exported: {len(audit_export)} bytes")`
};

export default function TechnicalArchitecturePage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Technical Architecture
          </h1>
          <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Deep dive into the CIAF framework architecture, implementation details, and code examples
          </p>
        </div>

        {/* Architecture Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {architectureComponents.map((component) => (
            <Card key={component.name} className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                    <component.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-headline text-lg">{component.name}</CardTitle>
                </div>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    {component.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {component.features.map((feature, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start">
                        <span className="mr-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Code Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center">
              <Code className="mr-2" />
              Implementation Examples
            </CardTitle>
            <CardDescription>
              Real Python code showing how to implement CIAF components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="dataset-anchor" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dataset-anchor">Dataset Anchor</TabsTrigger>
                <TabsTrigger value="model-training">Model Training</TabsTrigger>
                <TabsTrigger value="inference-receipt">Inference</TabsTrigger>
                <TabsTrigger value="audit-trail">Audit Trail</TabsTrigger>
              </TabsList>
              
              {Object.entries(codeExamples).map(([key, code]) => (
                <TabsContent key={key} value={key}>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{code}</code>
                  </pre>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Performance & Security */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center">
                <Zap className="mr-2" />
                Performance Characteristics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Dataset Anchoring</span>
                <Badge variant="outline">~1-2ms per 1K records</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Provenance Capsule Creation</span>
                <Badge variant="outline">~0.5ms per capsule</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Inference Receipt Generation</span>
                <Badge variant="outline">~10-50ms per query</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Audit Trail Verification</span>
                <Badge variant="outline">~100ms per 1K records</Badge>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Performance scales linearly with dataset size. Lazy materialization 
                  ensures minimal memory footprint for large datasets.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center">
                <Shield className="mr-2" />
                Security Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Encryption</span>
                <Badge variant="outline">AES-256 GCM</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Hashing</span>
                <Badge variant="outline">SHA-256</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Key Derivation</span>
                <Badge variant="outline">HMAC-SHA256</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Random Generation</span>
                <Badge variant="outline">os.urandom()</Badge>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  All cryptographic operations use industry-standard algorithms 
                  and are implemented using the Python cryptography library.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
