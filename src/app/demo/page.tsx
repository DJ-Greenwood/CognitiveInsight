'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, Database, Lock, Receipt, AlertTriangle, Copy, Eye, EyeOff } from 'lucide-react';

type DemoStep = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  duration: number;
  details?: string[];
  jsonData?: any;
  apiEndpoint?: string;
  requestPayload?: any;
};

const initialSteps: DemoStep[] = [
  {
    id: 'dataset-anchor',
    title: 'Create Dataset Anchor',
    description: 'Cryptographically fingerprint training dataset',
    status: 'pending',
    duration: 2000,
    apiEndpoint: '/api/dataset-anchor',
    requestPayload: {
      dataset_id: 'customer_fraud_detection_2024',
      metadata: {
        source: 'customer_transactions',
        date_created: '2024-08-04T10:00:00Z',
        record_count: 50000,
        contains_pii: true,
        description: 'Customer transaction data for fraud detection model training',
        data_classification: 'confidential',
        retention_period: '7_years'
      },
      use_bridge: false
    },
    details: [
      'Computing SHA-256 hash of dataset...',
      'Generating Merkle tree root...',
      'Creating cryptographic fingerprint...',
      'Dataset integrity verified ✓'
    ]
  },
  {
    id: 'provenance-capsules',
    title: 'Generate Provenance Capsules',
    description: 'Create tamper-evident data lineage records',
    status: 'pending',
    duration: 3000,
    apiEndpoint: '/api/provenance',
    requestPayload: {
      dataset_id: 'customer_fraud_detection_2024',
      data_items: [
        {
          id: 'transaction_batch_001',
          content: 'encrypted_transaction_data_batch_1',
          metadata: {
            source: 'payment_processor_api',
            timestamp: '2024-08-01T00:00:00Z',
            record_count: 10000,
            data_quality_score: 0.95
          }
        },
        {
          id: 'transaction_batch_002',
          content: 'encrypted_transaction_data_batch_2',
          metadata: {
            source: 'merchant_pos_systems',
            timestamp: '2024-08-01T12:00:00Z',
            record_count: 15000,
            data_quality_score: 0.92
          }
        },
        {
          id: 'transaction_batch_003',
          content: 'encrypted_transaction_data_batch_3',
          metadata: {
            source: 'online_banking_api',
            timestamp: '2024-08-02T00:00:00Z',
            record_count: 25000,
            data_quality_score: 0.98
          }
        }
      ]
    },
    details: [
      'Processing 50,000 transaction records...',
      'Creating provenance capsules for 3 data batches',
      'Applying AES-GCM encryption to capsules',
      'Lazy materialization enabled for efficiency'
    ]
  },
  {
    id: 'model-training',
    title: 'Model Training with MAK',
    description: 'Train fraud detection model with authorized dataset binding',
    status: 'pending',
    duration: 4000,
    apiEndpoint: '/api/inference',
    requestPayload: {
      model_id: 'fraud_detection_xgboost_v2.1',
      input_data: {
        training_dataset_id: 'customer_fraud_detection_2024',
        algorithm: 'XGBoost',
        hyperparameters: {
          max_depth: 6,
          learning_rate: 0.1,
          n_estimators: 100,
          objective: 'binary:logistic'
        },
        training_duration_minutes: 45,
        cross_validation_folds: 5
      },
      output_prediction: {
        model_accuracy: 0.947,
        precision: 0.923,
        recall: 0.889,
        f1_score: 0.906,
        auc_roc: 0.952,
        feature_importance: {
          transaction_amount: 0.234,
          merchant_category: 0.187,
          time_since_last_transaction: 0.156,
          geographical_distance: 0.143
        }
      },
      confidence_score: 0.94,
      metadata: {
        training_environment: 'secure_training_cluster',
        data_scientist: 'alice.smith@company.com',
        training_job_id: 'train_job_20240804_001'
      }
    },
    details: [
      'Generating Model Anchor Key (MAK)...',
      'Binding model to authorized dataset',
      'Training XGBoost fraud detection model',
      'Capturing training snapshot and metrics'
    ]
  },
  {
    id: 'uncertainty-receipt',
    title: 'Generate Inference Receipt',
    description: 'Create compliance receipt for model predictions',
    status: 'pending',
    duration: 2500,
    apiEndpoint: '/api/inference',
    requestPayload: {
      model_id: 'fraud_detection_xgboost_v2.1',
      input_data: {
        transaction_id: 'txn_20240804_098765',
        transaction_amount: 2459.99,
        merchant_name: 'Electronics Store XYZ',
        merchant_category: 'electronics',
        card_present: false,
        transaction_time: '2024-08-04T14:23:45Z',
        user_location: 'San Francisco, CA',
        merchant_location: 'Los Angeles, CA',
        time_since_last_transaction_hours: 2.5
      },
      output_prediction: {
        fraud_probability: 0.87,
        risk_level: 'high',
        risk_factors: [
          'high_transaction_amount',
          'geographical_distance',
          'card_not_present'
        ],
        recommended_action: 'block_and_verify'
      },
      confidence_score: 0.91,
      metadata: {
        prediction_timestamp: '2024-08-04T14:23:46Z',
        model_version: 'v2.1',
        inference_time_ms: 45,
        request_id: 'req_20240804_14234589'
      }
    },
    details: [
      'Processing transaction for fraud detection...',
      'Computing confidence scores and uncertainty bounds',
      'Performing bias assessment across demographic groups',
      'Generating cryptographically signed receipt'
    ]
  },
  {
    id: 'audit-trail',
    title: 'Audit Trail & Compliance Report',
    description: 'Generate immutable compliance records',
    status: 'pending',
    duration: 1500,
    apiEndpoint: '/api/reports',
    requestPayload: {
      report_type: 'audit',
      filters: {
        date_range: {
          start: '2024-08-01T00:00:00Z',
          end: '2024-08-04T23:59:59Z'
        },
        dataset_ids: ['customer_fraud_detection_2024'],
        model_ids: ['fraud_detection_xgboost_v2.1'],
        compliance_threshold: 0.95
      },
      format: 'json'
    },
    details: [
      'Establishing cryptographic hash chain...',
      'Logging all regulatory events and decisions',
      'Validating compliance across GDPR, PCI-DSS requirements',
      'Generating immutable audit trail'
    ]
  }
];

export default function InteractiveDemoPage() {
  const [steps, setSteps] = useState<DemoStep[]>(initialSteps);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showJson, setShowJson] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleJsonVisibility = (stepId: string) => {
    setShowJson(prev => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const runDemo = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    
    // Reset all steps
    setSteps(initialSteps.map(step => ({ ...step, status: 'pending', jsonData: undefined })));
    
    for (let i = 0; i < initialSteps.length; i++) {
      setCurrentStep(i);
      const currentStepData = initialSteps[i];
      
      // Set current step to processing
      setSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'processing' } : step
      ));
      
      // Simulate API call and get JSON response
      try {
        if (currentStepData.apiEndpoint && currentStepData.requestPayload) {
          const response = await fetch(currentStepData.apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentStepData.requestPayload),
          });
          
          const jsonData = await response.json();
          
          // Wait for step duration (simulating processing time)
          await new Promise(resolve => setTimeout(resolve, currentStepData.duration));
          
          // Set current step to completed with JSON data
          setSteps(prev => prev.map((step, index) => 
            index === i ? { ...step, status: 'completed', jsonData } : step
          ));
        } else {
          // Wait for step duration
          await new Promise(resolve => setTimeout(resolve, currentStepData.duration));
          
          // Set current step to completed without API call
          setSteps(prev => prev.map((step, index) => 
            index === i ? { ...step, status: 'completed' } : step
          ));
        }
      } catch (error) {
        console.error(`Error in step ${currentStepData.id}:`, error);
        
        // Set step to error state
        setSteps(prev => prev.map((step, index) => 
          index === i ? { ...step, status: 'error' } : step
        ));
      }
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: DemoStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />;
    }
  };

  const getStepIcon = (stepId: string) => {
    const iconMap = {
      'dataset-anchor': Database,
      'provenance-capsules': Lock,
      'model-training': Receipt,
      'uncertainty-receipt': Receipt,
      'audit-trail': CheckCircle
    };
    const Icon = iconMap[stepId as keyof typeof iconMap] || Database;
    return <Icon className="h-6 w-6" />;
  };

  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Interactive CIAF Demo
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Watch the Cryptographically Integrated AI Framework in action
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Demo Progress</CardTitle>
            <CardDescription>
              This simulation shows how CIAF processes work in a real AI system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{completedSteps}/{steps.length} completed</span>
            </div>
            <Progress value={progress} className="w-full" />
            
            <div className="flex justify-center">
              <Button 
                onClick={runDemo} 
                disabled={isRunning}
                className="px-8"
              >
                {isRunning ? 'Running Demo...' : 'Start CIAF Demo'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {steps.map((step, index) => (
            <Card 
              key={step.id} 
              className={`transition-all duration-300 ${
                step.status === 'processing' ? 'ring-2 ring-primary' : ''
              } ${step.status === 'completed' ? 'bg-green-50 dark:bg-green-950' : ''}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-muted">
                      {getStepIcon(step.id)}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-headline">{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                      {step.status}
                    </Badge>
                    {getStatusIcon(step.status)}
                  </div>
                </div>
              </CardHeader>
              
              {(step.status === 'processing' || step.status === 'completed') && (
                <CardContent className="pt-0">
                  <Tabs defaultValue="progress" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="progress">Progress</TabsTrigger>
                      <TabsTrigger value="request" disabled={!step.requestPayload}>
                        Request
                      </TabsTrigger>
                      <TabsTrigger value="response" disabled={!step.jsonData}>
                        Response
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="progress" className="space-y-2 mt-4">
                      {step.details?.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          {detail}
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="request" className="mt-4">
                      {step.requestPayload && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">
                              API Request to {step.apiEndpoint}
                            </label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(JSON.stringify(step.requestPayload, null, 2))}
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              Copy
                            </Button>
                          </div>
                          <pre className="bg-muted p-3 rounded-md text-xs overflow-auto max-h-[300px] border">
                            {JSON.stringify(step.requestPayload, null, 2)}
                          </pre>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="response" className="mt-4">
                      {step.jsonData && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">
                              API Response
                              {step.jsonData.success ? (
                                <Badge variant="default" className="ml-2">Success</Badge>
                              ) : (
                                <Badge variant="destructive" className="ml-2">Error</Badge>
                              )}
                            </label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(JSON.stringify(step.jsonData, null, 2))}
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              Copy JSON
                            </Button>
                          </div>
                          <pre className="bg-muted p-3 rounded-md text-xs overflow-auto max-h-[300px] border">
                            {JSON.stringify(step.jsonData, null, 2)}
                          </pre>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <Card className="bg-muted">
          <CardHeader>
            <CardTitle className="font-headline">What This Demo Shows</CardTitle>
            <CardDescription>
              Real API integration showing actual JSON data flows in the CIAF system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              <strong>Live API Integration:</strong> This demo makes real API calls to our CIAF endpoints and displays the actual JSON responses generated at each step.
            </p>
            <p className="text-sm">
              <strong>Cryptographic Operations:</strong> Each API call performs real cryptographic operations including hashing, encryption, and digital signatures.
            </p>
            <p className="text-sm">
              <strong>Data Transparency:</strong> You can view both the request payloads sent to each API and the complete JSON responses, showing exactly how data flows through the system.
            </p>
            <p className="text-sm">
              <strong>Regulatory Compliance:</strong> The generated JSON artifacts provide comprehensive audit trails and compliance documentation required for AI governance.
            </p>
            <p className="text-sm">
              <strong>Copy & Use:</strong> All JSON data can be copied and used for testing, integration, or compliance documentation purposes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Integration Guide</CardTitle>
            <CardDescription>
              How to integrate these API calls into your own applications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Step 1: Dataset Anchoring</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Create a cryptographic fingerprint of your training dataset before model development begins.
              </p>
              <code className="text-xs bg-muted p-2 rounded block">
                POST /api/dataset-anchor
              </code>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Step 2: Provenance Tracking</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Generate tamper-evident capsules for each data batch to maintain complete lineage.
              </p>
              <code className="text-xs bg-muted p-2 rounded block">
                POST /api/provenance
              </code>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Step 3: Model Training & Inference</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Create cryptographic receipts for both training processes and individual predictions.
              </p>
              <code className="text-xs bg-muted p-2 rounded block">
                POST /api/inference
              </code>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Step 4: Compliance Reporting</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Generate comprehensive audit trails and compliance reports for regulatory requirements.
              </p>
              <code className="text-xs bg-muted p-2 rounded block">
                POST /api/reports
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
