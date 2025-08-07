'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, Play, CheckCircle, XCircle, Clock } from 'lucide-react';

interface APIEndpoint {
  method: string;
  path: string;
  description: string;
  requestBody?: any;
  responseExample?: any;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
}

const apiEndpoints: APIEndpoint[] = [
  {
    method: 'POST',
    path: '/api/dataset-anchor',
    description: 'Create a cryptographically secure dataset anchor',
    requestBody: {
      dataset_id: 'customer_data_2024',
      metadata: {
        source: 'customer_database',
        record_count: 10000,
        contains_pii: true,
        description: 'Customer demographic data'
      },
      use_bridge: false
    },
    responseExample: {
      success: true,
      dataset_anchor: {
        dataset_id: 'customer_data_2024',
        dataset_fingerprint: 'fp_a7b2c3d4e5f6',
        merkle_root: 'mr_1a2b3c4d5e6f',
        created_at: '2024-01-15T10:30:00Z',
        metadata: {
          source: 'customer_database',
          record_count: 10000
        }
      },
      message: 'Dataset anchor created successfully'
    }
  },
  {
    method: 'POST',
    path: '/api/provenance',
    description: 'Create provenance capsules for data lineage tracking',
    requestBody: {
      dataset_id: 'customer_data_2024',
      data_items: [
        {
          id: 'record_001',
          content: 'customer data content',
          metadata: { source: 'crm_system' }
        }
      ]
    },
    responseExample: {
      success: true,
      capsules_created: 1,
      capsules: [
        {
          capsule_id: 'cap_xyz123',
          item_id: 'record_001',
          hash: 'hash_abc123',
          encrypted: true,
          created_at: '2024-01-15T10:30:00Z'
        }
      ]
    }
  },
  {
    method: 'POST',
    path: '/api/inference',
    description: 'Generate cryptographic receipts for AI model inferences',
    requestBody: {
      model_id: 'fraud_detection_v2',
      input_data: { transaction_amount: 1500, merchant: 'online_store' },
      output_prediction: { fraud_probability: 0.12, risk_level: 'low' },
      confidence_score: 0.94
    },
    responseExample: {
      success: true,
      receipt: {
        receipt_id: 'receipt_abc123',
        model_id: 'fraud_detection_v2',
        input_hash: 'hash_input_123',
        output_hash: 'hash_output_456',
        confidence_score: 0.94,
        timestamp: '2024-01-15T10:30:00Z',
        cryptographic_proof: 'proof_xyz789',
        verification_status: 'verified'
      }
    }
  },
  {
    method: 'POST',
    path: '/api/verify',
    description: 'Verify the integrity of anchors, capsules, or receipts',
    requestBody: {
      item_id: 'anchor_abc123',
      item_type: 'dataset_anchor',
      verification_data: {}
    },
    responseExample: {
      success: true,
      verification: {
        item_id: 'anchor_abc123',
        item_type: 'dataset_anchor',
        is_valid: true,
        verification_timestamp: '2024-01-15T10:30:00Z',
        integrity_check: 'passed',
        compliance_score: 0.95
      }
    }
  },
  {
    method: 'POST',
    path: '/api/reports',
    description: 'Generate compliance, audit, transparency, or risk assessment reports',
    requestBody: {
      report_type: 'compliance',
      filters: {
        date_range: {
          start: '2024-01-01',
          end: '2024-01-31'
        }
      },
      format: 'json'
    },
    responseExample: {
      success: true,
      report: {
        report_id: 'report_123',
        report_type: 'compliance',
        generated_at: '2024-01-15T10:30:00Z',
        data: {
          summary: {
            total_items_assessed: 150,
            compliant_items: 142,
            overall_compliance_score: 0.947
          }
        }
      }
    }
  }
];

export default function APITesterPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint>(apiEndpoints[0]);
  const [requestBody, setRequestBody] = useState<string>(JSON.stringify(apiEndpoints[0].requestBody, null, 2));
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEndpointChange = (endpoint: APIEndpoint) => {
    setSelectedEndpoint(endpoint);
    setRequestBody(JSON.stringify(endpoint.requestBody || {}, null, 2));
    setResponse(null);
    setError(null);
  };

  const handleTestAPI = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let body = {};
      if (requestBody.trim()) {
        body = JSON.parse(requestBody);
      }
      
      const res = await fetch(selectedEndpoint.path, {
        method: selectedEndpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: selectedEndpoint.method !== 'GET' ? JSON.stringify(body) : undefined,
      });
      
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">CIAF API Tester</h1>
        <p className="text-lg text-muted-foreground">
          Interact with APIs that power our lazy capsule generation, Merkle proof validation, and audit export tools — the same methods protected under our U.S. patent application.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Endpoint List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
          {apiEndpoints.map((endpoint, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-colors ${
                selectedEndpoint === endpoint ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleEndpointChange(endpoint)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Badge variant={endpoint.method === 'POST' ? 'default' : 'secondary'}>
                    {endpoint.method}
                  </Badge>
                  <code className="text-sm">{endpoint.path}</code>
                </div>
                <CardDescription className="text-xs">
                  {endpoint.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* API Tester */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant={selectedEndpoint.method === 'POST' ? 'default' : 'secondary'}>
                  {selectedEndpoint.method}
                </Badge>
                <code>{selectedEndpoint.path}</code>
              </CardTitle>
              <CardDescription>{selectedEndpoint.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="request" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="request">Request</TabsTrigger>
                  <TabsTrigger value="response">Response</TabsTrigger>
                  <TabsTrigger value="example">Example</TabsTrigger>
                </TabsList>
                
                <TabsContent value="request" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Request Body (JSON)</label>
                    <Textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      className="font-mono text-sm min-h-[200px]"
                      placeholder="Enter JSON request body..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleTestAPI} disabled={loading}>
                      {loading ? (
                        <>
                          <Clock className="w-4 h-4 mr-2" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Test API
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(requestBody)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Request
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="response" className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <XCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {response && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <label className="text-sm font-medium">API Response</label>
                        {response.success ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <pre className="bg-muted p-4 rounded-md text-sm overflow-auto max-h-[400px]">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    </div>
                  )}
                  
                  {!response && !error && (
                    <div className="text-center text-muted-foreground py-8">
                      Click "Test API" to see the response here
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="example" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Expected Response</label>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-auto max-h-[400px]">
                      {JSON.stringify(selectedEndpoint.responseExample, null, 2)}
                    </pre>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => copyToClipboard(JSON.stringify(selectedEndpoint.responseExample, null, 2))}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Example
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* API Documentation */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>API Integration Guide</CardTitle>
            <CardDescription>
              How to integrate the CIAF API into your applications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Authentication</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Currently, the API uses basic validation. In production, implement JWT or API key authentication.
              </p>
              <pre className="bg-muted p-3 rounded text-sm">
{`// Example with authentication (future implementation)
const response = await fetch('/api/dataset-anchor', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-jwt-token'
  },
  body: JSON.stringify(requestData)
});`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Error Handling</h3>
              <p className="text-sm text-muted-foreground mb-2">
                All endpoints return consistent error responses with detailed information.
              </p>
              <pre className="bg-muted p-3 rounded text-sm">
{`// Standard error response format
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "number",
      "path": ["dataset_id"]
    }
  ]
}`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Bridge Mode</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Set <code>use_bridge: true</code> to use the real CIAF Python framework instead of mock services.
              </p>
              <Alert>
                <AlertDescription>
                  Bridge mode requires the Python CIAF framework to be installed and the bridge service to be running.
                  If the bridge fails, the API automatically falls back to mock mode.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
