import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2, Book, Download, ExternalLink, Copy } from 'lucide-react';

const apiEndpoints = [
  {
    method: 'POST',
    endpoint: '/api/dataset-anchor/create',
    description: 'Create a new cryptographically secured dataset anchor',
    requestBody: `{
  "dataset_id": "customer_data_v1",
  "metadata": {
    "source": "customer_database",
    "record_count": 50000,
    "contains_pii": true
  },
  "master_password": "secure_key",
  "salt": "optional_custom_salt"
}`,
    responseBody: `{
  "success": true,
  "dataset_anchor": {
    "dataset_id": "customer_data_v1",
    "dataset_fingerprint": "a4b5c6d7e8f9...",
    "merkle_root": "9f8e7d6c5b4a...",
    "created_at": "2025-08-04T12:00:00Z"
  }
}`
  },
  {
    method: 'POST',
    endpoint: '/api/provenance/create-capsules',
    description: 'Generate provenance capsules for dataset items',
    requestBody: `{
  "dataset_id": "customer_data_v1",
  "data_items": [
    {
      "id": "item_001",
      "content": "customer_record_data",
      "metadata": {
        "source_system": "CRM",
        "last_modified": "2025-08-01T10:30:00Z"
      }
    }
  ]
}`,
    responseBody: `{
  "success": true,
  "capsules_created": 1,
  "capsules": [
    {
      "capsule_id": "cap_abc123",
      "item_id": "item_001",
      "hash": "def456789abc...",
      "encrypted": true
    }
  ]
}`
  },
  {
    method: 'POST',
    endpoint: '/api/model/train',
    description: 'Train model with CIAF provenance tracking',
    requestBody: `{
  "model_name": "fraud_detection_v2",
  "model_version": "2.1.0",
  "capsule_ids": ["cap_abc123", "cap_def456"],
  "training_params": {
    "algorithm": "xgboost",
    "max_depth": 6,
    "learning_rate": 0.1
  },
  "authorized_datasets": ["customer_data_v1"]
}`,
    responseBody: `{
  "success": true,
  "training_snapshot": {
    "snapshot_id": "snap_xyz789",
    "model_version": "2.1.0",
    "merkle_root_hash": "fedcba987654...",
    "training_completed_at": "2025-08-04T15:30:00Z"
  }
}`
  },
  {
    method: 'POST',
    endpoint: '/api/inference/create-receipt',
    description: 'Generate uncertainty receipt for model inference',
    requestBody: `{
  "model_name": "fraud_detection_v2",
  "query": "{\\"transaction_amount\\": 5000}",
  "ai_output": "FLAGGED: High fraud probability",
  "confidence_score": 0.87,
  "training_snapshot_id": "snap_xyz789"
}`,
    responseBody: `{
  "success": true,
  "receipt": {
    "receipt_hash": "rec_123abc456",
    "confidence_score": 0.87,
    "timestamp": "2025-08-04T16:45:00Z",
    "privacy_preserving": true
  }
}`
  }
];

const sdkExamples = {
  python: `# Install CIAF Python SDK
pip install ciaf-sdk

# Initialize CIAF client
from ciaf_sdk import CIAFClient

client = CIAFClient(
    api_key="your_api_key",
    base_url="https://api.cognitiveinsight.ai"
)

# Create dataset anchor
anchor = client.create_dataset_anchor(
    dataset_id="my_dataset",
    metadata={"source": "database", "records": 1000},
    master_password="secure_key"
)

# Train model with provenance
snapshot = client.train_model(
    model_name="my_model",
    data_capsules=anchor.capsules,
    training_params={"algorithm": "xgboost"}
)

# Generate inference receipt
receipt = client.create_inference_receipt(
    model_name="my_model",
    query='{"input": "data"}',
    ai_output="prediction_result"
)

print(f"Receipt hash: {receipt.receipt_hash}")`,

  javascript: `// Install CIAF JavaScript SDK
npm install @ciaf/sdk

// Initialize CIAF client
import { CIAFClient } from '@ciaf/sdk';

const client = new CIAFClient({
  apiKey: 'your_api_key',
  baseUrl: 'https://api.cognitiveinsight.ai'
});

// Create dataset anchor
const anchor = await client.createDatasetAnchor({
  datasetId: 'my_dataset',
  metadata: { source: 'database', records: 1000 },
  masterPassword: 'secure_key'
});

// Train model with provenance
const snapshot = await client.trainModel({
  modelName: 'my_model',
  dataCapsules: anchor.capsules,
  trainingParams: { algorithm: 'xgboost' }
});

// Generate inference receipt
const receipt = await client.createInferenceReceipt({
  modelName: 'my_model',
  query: JSON.stringify({ input: 'data' }),
  aiOutput: 'prediction_result'
});

console.log(\`Receipt hash: \${receipt.receiptHash}\`);`,

  curl: `# Create dataset anchor
curl -X POST https://api.cognitiveinsight.ai/api/dataset-anchor/create \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "dataset_id": "my_dataset",
    "metadata": {"source": "database", "records": 1000},
    "master_password": "secure_key"
  }'

# Train model
curl -X POST https://api.cognitiveinsight.ai/api/model/train \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model_name": "my_model",
    "model_version": "1.0.0",
    "training_params": {"algorithm": "xgboost"}
  }'

# Create inference receipt
curl -X POST https://api.cognitiveinsight.ai/api/inference/create-receipt \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model_name": "my_model",
    "query": "{\\"input\\": \\"data\\"}",
    "ai_output": "prediction_result"
  }'`
};

export default function APIDocumentationPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Patent-Grade Cryptographic APIs
          </h1>
          <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Interact with APIs that power our lazy capsule generation, Merkle proof validation, and audit export tools — the same methods protected under our U.S. patent application.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download OpenAPI Spec
            </Button>
            <Button variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              Interactive API Explorer
            </Button>
          </div>
        </div>

        {/* Quick Start */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center">
              <Code2 className="mr-2" />
              Quick Start Guide
            </CardTitle>
            <CardDescription>
              Get up and running with CIAF APIs in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Badge variant="outline">Base URL: https://api.cognitiveinsight.ai</Badge>
              <Badge variant="outline">Authentication: Bearer Token</Badge>
              <Badge variant="outline">Content-Type: application/json</Badge>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">1. Get API Key</h4>
                <p className="text-xs text-muted-foreground">
                  Sign up and generate your API key from the dashboard
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">2. Install SDK</h4>
                <p className="text-xs text-muted-foreground">
                  Choose from Python, JavaScript, or use direct REST calls
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">3. Create Anchor</h4>
                <p className="text-xs text-muted-foreground">
                  Start by creating a dataset anchor for your data
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Endpoints */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">API Endpoints</CardTitle>
            <CardDescription>
              Core endpoints for implementing CIAF in your applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant={endpoint.method === 'POST' ? 'default' : 'secondary'}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono">{endpoint.endpoint}</code>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="font-semibold text-sm mb-2">Request Body</h5>
                      <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                        <code>{endpoint.requestBody}</code>
                      </pre>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm mb-2">Response</h5>
                      <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                        <code>{endpoint.responseBody}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SDK Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">SDK Examples</CardTitle>
            <CardDescription>
              Code examples for different programming languages and tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="python" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
              </TabsList>
              
              {Object.entries(sdkExamples).map(([language, code]) => (
                <TabsContent key={language} value={language}>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{code}</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-2 right-2"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Error Codes & Rate Limits */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Error Codes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <code className="text-sm">400</code>
                <span className="text-sm text-muted-foreground">Bad Request</span>
              </div>
              <div className="flex justify-between items-center">
                <code className="text-sm">401</code>
                <span className="text-sm text-muted-foreground">Unauthorized</span>
              </div>
              <div className="flex justify-between items-center">
                <code className="text-sm">403</code>
                <span className="text-sm text-muted-foreground">Forbidden</span>
              </div>
              <div className="flex justify-between items-center">
                <code className="text-sm">429</code>
                <span className="text-sm text-muted-foreground">Rate Limited</span>
              </div>
              <div className="flex justify-between items-center">
                <code className="text-sm">500</code>
                <span className="text-sm text-muted-foreground">Internal Error</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Rate Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Dataset Operations</span>
                <code className="text-sm">100/hour</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Model Training</span>
                <code className="text-sm">10/hour</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Inference Receipts</span>
                <code className="text-sm">1000/hour</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Audit Queries</span>
                <code className="text-sm">500/hour</code>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Rate limits can be increased for enterprise customers
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support */}
        <Card className="bg-muted">
          <CardHeader>
            <CardTitle className="font-headline flex items-center">
              <Book className="mr-2" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <span className="font-semibold">Technical Support</span>
                <span className="text-xs text-muted-foreground mt-1">
                  24/7 support for API integration
                </span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <span className="font-semibold">Developer Community</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Join our Discord community
                </span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <span className="font-semibold">Enterprise Support</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Custom integration assistance
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
