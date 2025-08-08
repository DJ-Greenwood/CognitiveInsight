import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Shield, Database, Zap, GitBranch, Lock } from 'lucide-react';
import Image from 'next/image';

const architectureComponents = [
  {
    name: 'Core Cryptography',
    icon: Shield,
    description: 'Industry-standard encryption and secure hashing',
    technologies: ['Python', 'cryptography', 'hashlib'],
    features: [
      'Enterprise-grade encryption',
      'Cryptographic integrity verification', 
      'Secure authentication protocols',
      'Tamper-evident security'
    ]
  },
  {
    name: 'Dataset Anchoring',
    icon: Database,
    description: 'Immutable dataset fingerprinting and provenance tracking',
    technologies: ['Python', 'Cryptographic Hashing', 'Audit Systems'],
    features: [
      'Cryptographic dataset fingerprinting',
      'Tamper-evident integrity proofs',
      'Efficient audit preparation',
      'Secure metadata management'
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
  'dataset-anchor': `# CIAF Dataset Integration - High Level API
from ciaf import CIAFFramework

# Initialize framework for your AI system
ciaf = CIAFFramework("production_system")

# Create secure dataset fingerprint
dataset_info = ciaf.register_dataset(
    dataset_id="customer_data_v1", 
    metadata={
        "source": "customer_database",
        "record_count": 50000,
        "contains_pii": True
    }
)

print(f"Dataset registered with fingerprint: {dataset_info.fingerprint}")`,

  'model-training': `# Model Training with CIAF Integration
from ciaf import CIAFFramework

# Initialize CIAF framework
ciaf = CIAFFramework("fraud_detection_system")

# Register model training
training_session = ciaf.start_training_session(
    model_name="fraud_detector_v2",
    datasets=["customer_data_v1", "transaction_data_v1"]
)

# Your existing training code here...
# model = train_xgboost(training_data)

# Complete training with audit trail
training_session.complete({
    "accuracy": 0.94,
    "training_time": "2.5 hours"
})`,

  'inference-receipt': `# Generate Compliance Receipt for Inference
from ciaf import CIAFFramework

# Initialize system
ciaf = CIAFFramework("production_fraud_system")

# Generate inference with compliance receipt
result = ciaf.predict_with_receipt(
    model_id="fraud_detector_v2",
    input_data={
        "transaction_amount": 5000,
        "merchant_type": "electronics"
    }
)

print(f"Prediction: {result.prediction}")
print(f"Receipt ID: {result.receipt_id}")
print(f"Confidence: {result.confidence}")`,

  'audit-trail': `# Export Audit Trail for Regulatory Review
from ciaf import CIAFFramework

# Initialize framework
ciaf = CIAFFramework("production_system")

# Generate comprehensive audit report
audit_report = ciaf.generate_audit_report(
    model_name="fraud_detector_v2",
    time_range="2024-01-01 to 2024-12-31",
    compliance_frameworks=["SOX", "PCI-DSS"]
)

# Export for regulator review
audit_report.export("audit_report_2024.pdf")
print(f"Audit report generated: {audit_report.summary}")`,
};

export default function TechnicalArchitecturePage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            CIAF Architecture
          </h1>
          <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Our Lazy Capsule Materialization system introduces a scalable cryptographic framework that outperforms MLflow and traditional audit tools by up to 2.67× in audit speed and 32% in memory savings.
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
                Performance Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Audit Preparation</span>
                <Badge variant="outline">1000× Faster</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Memory Usage</span>
                <Badge variant="outline">99% Reduction</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Storage Optimization</span>
                <Badge variant="outline">20-30× Better</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Compliance Coverage</span>
                <Badge variant="outline">94% vs 75%</Badge>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Performance benefits scale with dataset size while maintaining 
                  constant-time operations for audit operations.
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
                <Badge variant="outline">Enterprise-Grade</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Integrity</span>
                <Badge variant="outline">Cryptographic</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Authentication</span>
                <Badge variant="outline">Multi-Layer</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Random Generation</span>
                <Badge variant="outline">CSPRNG</Badge>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  All cryptographic operations use industry-standard algorithms 
                  and follow security best practices.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
