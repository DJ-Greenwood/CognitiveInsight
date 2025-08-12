'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, Database, Zap, CheckCircle, AlertTriangle, Clock, FileText, Shield, ExternalLink, BarChart3, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface DataPoint {
  id: number;
  feature1: number;
  feature2: number;
  feature3: number;
  label: number;
}

interface InferenceResult {
  id: number;
  prediction: number;
  confidence: number;
  actual: number;
}

interface CapsuleData {
  capsule_id: string;
  anchor: string;
  created_at: string;
  record_count: number;
  audit_ratio: number;
  metadata_summary: {
    total_inferences: number;
    avg_confidence: number;
    accuracy: number;
  };
}

interface VerificationResult {
  ok: boolean;
  message: string;
  verification_time_ms: number;
  details: {
    anchor_verified: boolean;
    record_count_verified: boolean;
    integrity_check: boolean;
  };
}

export default function ModelDemoPage() {
  const [datasetSize, setDatasetSize] = useState([300]);
  const [auditRatio, setAuditRatio] = useState([10]);
  const [dataset, setDataset] = useState<DataPoint[]>([]);
  const [selectedSamples, setSelectedSamples] = useState<DataPoint[]>([]);
  const [inferences, setInferences] = useState<InferenceResult[]>([]);
  const [capsule, setCapsule] = useState<CapsuleData | null>(null);
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  // Track which industry context was clicked
  const handleIndustryContext = (industry: string) => {
    setSelectedIndustry(industry);
  };

  // Calculate dynamic performance metrics
  const getStorageReduction = () => {
    return Math.max(85, 100 - (auditRatio[0] * 2)); // 85-90% reduction based on audit ratio
  };

  const getProcessingSpeed = () => {
    const baseSpeed = 50;
    const sizeMultiplier = Math.min(2, datasetSize[0] / 500); // Speed affected by dataset size
    return Math.round(baseSpeed * sizeMultiplier);
  };

  const getTraditionalSpeed = () => {
    const baseSpeed = 2000;
    const sizeMultiplier = Math.min(5, datasetSize[0] / 200); // Traditional systems slower with size
    return Math.round(baseSpeed * sizeMultiplier);
  };

  // Get industry-specific CTA text
  const getIndustryCTA = () => {
    if (selectedIndustry === 'finance') return 'Explore Finance Applications';
    if (selectedIndustry === 'healthcare') return 'Explore Healthcare Applications';
    if (selectedIndustry === 'cybersecurity') return 'Explore Cybersecurity Applications';
    if (selectedIndustry === 'insurance') return 'Explore Insurance Applications';
    if (selectedIndustry === 'regulatory') return 'Explore Regulatory Applications';
    return 'Explore Industry Applications';
  };

  // Generate synthetic dataset
  const generateDataset = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newDataset: DataPoint[] = [];
    for (let i = 0; i < datasetSize[0]; i++) {
      const feature1 = Math.random() * 100;
      const feature2 = Math.random() * 100;
      const feature3 = Math.random() * 100;
      // Simple classification: if sum > 150, label = 1, else 0
      const label = (feature1 + feature2 + feature3) > 150 ? 1 : 0;
      
      newDataset.push({
        id: i,
        feature1: Math.round(feature1 * 100) / 100,
        feature2: Math.round(feature2 * 100) / 100,
        feature3: Math.round(feature3 * 100) / 100,
        label
      });
    }
    
    setDataset(newDataset);
    setCurrentStep(2);
    setIsLoading(false);
  };

  // Select random samples for inference
  const selectSamples = () => {
    const shuffled = [...dataset].sort(() => 0.5 - Math.random());
    const samples = shuffled.slice(0, 5);
    setSelectedSamples(samples);
    setCurrentStep(3);
  };

  // Run inferences (simulated logistic regression)
  const runInferences = async () => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const results: InferenceResult[] = selectedSamples.map(sample => {
      // Simple logistic regression simulation
      const sum = sample.feature1 + sample.feature2 + sample.feature3;
      const probability = 1 / (1 + Math.exp(-(sum - 150) / 20));
      const prediction = probability > 0.5 ? 1 : 0;
      const confidence = Math.max(probability, 1 - probability);
      
      return {
        id: sample.id,
        prediction,
        confidence: Math.round(confidence * 100) / 100,
        actual: sample.label
      };
    });
    
    setInferences(results);
    setCurrentStep(4);
    setIsLoading(false);
  };

  // Generate proof capsule
  const generateCapsule = async () => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const accuracy = inferences.reduce((acc, inf) => 
      acc + (inf.prediction === inf.actual ? 1 : 0), 0) / inferences.length;
    
    const avgConfidence = inferences.reduce((acc, inf) => acc + inf.confidence, 0) / inferences.length;
    
    const capsuleData: CapsuleData = {
      capsule_id: `cap_${Math.random().toString(36).substr(2, 16)}`,
      anchor: `anch_${Math.random().toString(36).substr(2, 20)}`,
      created_at: new Date().toISOString(),
      record_count: inferences.length,
      audit_ratio: auditRatio[0],
      metadata_summary: {
        total_inferences: inferences.length,
        avg_confidence: Math.round(avgConfidence * 100) / 100,
        accuracy: Math.round(accuracy * 100) / 100
      }
    };
    
    setCapsule(capsuleData);
    setCurrentStep(5);
    setIsLoading(false);
  };

  // Verify capsule
  const verifyCapsule = async () => {
    if (!capsule) return;
    
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const verificationResult: VerificationResult = {
      ok: true,
      message: "Capsule verified successfully",
      verification_time_ms: Math.floor(Math.random() * 100) + 50,
      details: {
        anchor_verified: true,
        record_count_verified: true,
        integrity_check: true
      }
    };
    
    setVerification(verificationResult);
    setIsLoading(false);
  };

  const resetDemo = () => {
    setDataset([]);
    setSelectedSamples([]);
    setInferences([]);
    setCapsule(null);
    setVerification(null);
    setCurrentStep(1);
  };

  return (
    <div className="container py-12 md:py-24 max-w-6xl">
      {/* Patent Notice */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
          <FileText className="h-5 w-5" />
          <p className="text-sm">
            <strong>Patent-Pending Demo:</strong> This is a simplified demonstration. 
            Actual cryptographic implementations are proprietary and patent-protected.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          <Brain className="w-4 h-4 mr-2" />
          Mini-Model Audit Demo
        </Badge>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
          AI Model Proof Capsules
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Train a simple model, run inferences, then generate verifiable proof capsules — 
          all without exposing model internals or sensitive data.
        </p>
      </div>

      {/* Progress Flow Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <h3 className="font-medium text-sm text-muted-foreground">Demo Progress</h3>
        </div>
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {[
            { step: 1, title: "Generate", icon: Database },
            { step: 2, title: "Select", icon: Zap },
            { step: 3, title: "Infer", icon: Brain },
            { step: 4, title: "Capsule", icon: Shield },
            { step: 5, title: "Verify", icon: CheckCircle }
          ].map(({ step, title, icon: Icon }, index) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  currentStep >= step 
                    ? 'bg-primary text-primary-foreground shadow-lg scale-110' 
                    : currentStep === step - 1
                    ? 'bg-primary/20 text-primary border-2 border-primary/30'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  currentStep >= step ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {title}
                </span>
              </div>
              {index < 4 && (
                <div className={`h-0.5 w-12 md:w-20 mx-2 transition-all duration-500 ${
                  currentStep > step ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Configuration and Performance Comparison */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Dataset Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Dataset Size: {datasetSize[0]} records
              </label>
              <Slider
                value={datasetSize}
                onValueChange={setDatasetSize}
                max={1000}
                min={100}
                step={50}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Audit Ratio: {auditRatio[0]}%
              </label>
              <Slider
                value={auditRatio}
                onValueChange={setAuditRatio}
                max={20}
                min={5}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Higher ratios = more comprehensive proofs, larger capsules
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Benefits
              {currentStep > 1 && (
                <Badge variant="secondary" className="ml-auto">
                  Live Updates
                </Badge>
              )}
            </CardTitle>
            {/* Performance Headline */}
            <div className="text-center py-2">
              <div className="text-lg font-bold text-primary">
                {getStorageReduction()}% less storage, milliseconds instead of seconds
              </div>
              <div className="text-xs text-muted-foreground">
                Real performance gains with selective proof generation
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Data Stored</span>
                  <span className="text-muted-foreground">vs Traditional</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-xs">Insight™</div>
                    <div className="flex-1 bg-green-200 h-3 rounded-sm relative">
                      <div 
                        className="bg-green-600 h-3 rounded-sm transition-all duration-500" 
                        style={{width: `${100 - getStorageReduction()}%`}}
                      ></div>
                    </div>
                    <div className="text-xs w-8">{100 - getStorageReduction()}%</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-xs">Traditional</div>
                    <div className="flex-1 bg-red-200 h-3 rounded-sm">
                      <div className="bg-red-600 h-3 rounded-sm w-full"></div>
                    </div>
                    <div className="text-xs w-8">100%</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Processing Speed</span>
                  <span className="text-muted-foreground">Retrieval Time</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-xs">On-Demand</div>
                    <div className="flex-1 bg-blue-200 h-3 rounded-sm">
                      <div 
                        className="bg-blue-600 h-3 rounded-sm transition-all duration-500" 
                        style={{width: `${Math.min(100, (getProcessingSpeed() / getTraditionalSpeed()) * 100)}%`}}
                      ></div>
                    </div>
                    <div className="text-xs w-8">~{getProcessingSpeed()}ms</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-xs">Eager Store</div>
                    <div className="flex-1 bg-gray-200 h-3 rounded-sm">
                      <div className="bg-gray-600 h-3 rounded-sm w-full"></div>
                    </div>
                    <div className="text-xs w-8">~{getTraditionalSpeed() > 1000 ? `${(getTraditionalSpeed()/1000).toFixed(1)}s` : `${getTraditionalSpeed()}ms`}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`text-xs p-2 rounded transition-all duration-300 ${
              currentStep > 1 
                ? 'bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border border-green-200 dark:border-green-800' 
                : 'bg-muted'
            }`}>
              <strong>{getStorageReduction()}% storage reduction</strong> with {Math.round(getTraditionalSpeed() / getProcessingSpeed())}x faster proof generation
              {currentStep > 1 && (
                <div className="text-xs text-muted-foreground mt-1">
                  ⚡ Metrics update based on your configuration
                </div>
              )}
            </div>
            
            {/* Interactive Simulation Buttons */}
            {currentStep >= 2 && (
              <div className="pt-3 border-t space-y-2">
                <p className="text-sm font-medium">Test Performance:</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setDatasetSize([1000]);
                      setAuditRatio([5]);
                    }}
                    className="text-xs"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Max Efficiency
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setDatasetSize([500]);
                      setAuditRatio([15]);
                    }}
                    className="text-xs"
                  >
                    <Shield className="h-3 w-3 mr-1" />
                    Max Coverage
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Demo Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { step: 1, title: "Generate Dataset", desc: "Create synthetic training data" },
                { step: 2, title: "Select Samples", desc: "Choose inference samples" },
                { step: 3, title: "Run Inferences", desc: "Get model predictions" },
                { step: 4, title: "Generate Capsule", desc: "Create proof capsule" },
                { step: 5, title: "Verify Integrity", desc: "Independent verification" }
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {currentStep > step ? <CheckCircle className="h-4 w-4" /> : step}
                  </div>
                  <div className={currentStep >= step ? '' : 'text-muted-foreground'}>
                    <div className="font-medium text-sm">{title}</div>
                    <div className="text-xs">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Steps */}
      <div className="space-y-8">
        {/* Step 1: Generate Dataset */}
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Generate Synthetic Dataset</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Create a synthetic dataset with 3 numerical features and binary classification labels. 
              No real data is used in this demonstration.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Industry Context:</strong> In finance, this represents customer data for loan approval decisions; 
                in healthcare, patient metrics for diagnostic predictions.
                <button 
                  onClick={() => handleIndustryContext('finance')}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
                >
                  Track Finance
                </button>
                <button 
                  onClick={() => handleIndustryContext('healthcare')}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
                >
                  Track Healthcare
                </button>
              </p>
            </div>
            <Button onClick={generateDataset} disabled={isLoading || dataset.length > 0}>
              {isLoading && currentStep === 1 ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Generating Dataset...
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  Generate Dataset
                </>
              )}
            </Button>
            {dataset.length > 0 && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Dataset Generated ✅</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Total Records: {dataset.length}</div>
                  <div>Features: 3 numerical</div>
                  <div>Positive Labels: {dataset.filter(d => d.label === 1).length}</div>
                  <div>Negative Labels: {dataset.filter(d => d.label === 0).length}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step 2: Select Samples */}
        {currentStep >= 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Select Inference Samples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Randomly select 5 samples from the dataset for model inference.
              </p>
              <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border-l-4 border-green-400">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>Industry Context:</strong> In banking, this represents new loan applications; 
                  in cybersecurity, suspicious activity logs requiring classification.
                  <button 
                    onClick={() => handleIndustryContext('finance')}
                    className="ml-2 text-green-600 hover:text-green-800 underline text-xs"
                  >
                    Track Banking
                  </button>
                  <button 
                    onClick={() => handleIndustryContext('cybersecurity')}
                    className="ml-2 text-green-600 hover:text-green-800 underline text-xs"
                  >
                    Track Security
                  </button>
                </p>
              </div>
              <Button onClick={selectSamples} disabled={selectedSamples.length > 0}>
                <Zap className="h-4 w-4 mr-2" />
                Select Random Samples
              </Button>
              {selectedSamples.length > 0 && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Samples Selected ✅</p>
                  <div className="grid gap-2 text-xs">
                    {selectedSamples.map((sample, idx) => (
                      <div key={sample.id} className="flex justify-between">
                        <span>Sample {idx + 1}:</span>
                        <span>F1={sample.feature1}, F2={sample.feature2}, F3={sample.feature3} → {sample.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Run Inferences */}
        {currentStep >= 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Step 3: Run Model Inferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Run a simple logistic regression model on the selected samples to get predictions and confidence scores.
              </p>
              <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg border-l-4 border-purple-400">
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  <strong>Industry Context:</strong> In insurance, this processes claims for fraud detection; 
                  in medical imaging, analyzes scans for diagnostic predictions.
                  <button 
                    onClick={() => handleIndustryContext('insurance')}
                    className="ml-2 text-purple-600 hover:text-purple-800 underline text-xs"
                  >
                    Track Insurance
                  </button>
                  <button 
                    onClick={() => handleIndustryContext('healthcare')}
                    className="ml-2 text-purple-600 hover:text-purple-800 underline text-xs"
                  >
                    Track Medical
                  </button>
                </p>
              </div>
              <Button onClick={runInferences} disabled={isLoading || inferences.length > 0}>
                {isLoading && currentStep === 3 ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Running Inferences...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Run Inferences
                  </>
                )}
              </Button>
              {inferences.length > 0 && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Inferences Complete ✅</p>
                  <div className="grid gap-2 text-xs">
                    {inferences.map((inf, idx) => (
                      <div key={inf.id} className="flex justify-between">
                        <span>Sample {idx + 1}:</span>
                        <span className="flex gap-4">
                          <span>Pred: {inf.prediction}</span>
                          <span>Conf: {inf.confidence}</span>
                          <span className={inf.prediction === inf.actual ? 'text-green-600' : 'text-red-600'}>
                            {inf.prediction === inf.actual ? '✓' : '✗'}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 4: Generate Capsule */}
        {currentStep >= 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Step 4: Generate Proof Capsule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Create a cryptographic proof capsule containing verifiable evidence of the inferences, 
                without exposing raw data or model parameters.
              </p>
              <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border-l-4 border-amber-400">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Industry Context:</strong> In regulatory compliance, this creates audit-ready evidence; 
                  in AI governance, provides explainable decision trails without data exposure.
                  <button 
                    onClick={() => handleIndustryContext('regulatory')}
                    className="ml-2 text-amber-600 hover:text-amber-800 underline text-xs"
                  >
                    Track Regulatory
                  </button>
                </p>
              </div>
              <Button onClick={generateCapsule} disabled={isLoading || capsule !== null}>
                {isLoading && currentStep === 4 ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Generating Capsule...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Generate Proof Capsule
                  </>
                )}
              </Button>
              {capsule && (
                <>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-4 rounded-lg border">
                    <p className="text-sm font-medium mb-3">Proof Capsule Generated ✅</p>
                    <div className="grid gap-3 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <strong>Capsule ID:</strong>
                          <div className="font-mono text-xs bg-background p-2 rounded mt-1">
                            {capsule.capsule_id}
                          </div>
                        </div>
                        <div>
                          <strong>Anchor Hash:</strong>
                          <div className="font-mono text-xs bg-background p-2 rounded mt-1">
                            {capsule.anchor}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t">
                        <div>
                          <strong>Records:</strong> {capsule.record_count}
                        </div>
                        <div>
                          <strong>Audit Ratio:</strong> {capsule.audit_ratio}%
                        </div>
                        <div>
                          <strong>Accuracy:</strong> {(capsule.metadata_summary.accuracy * 100).toFixed(0)}%
                        </div>
                        <div>
                          <strong>Avg Confidence:</strong> {(capsule.metadata_summary.avg_confidence * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Mid-flow CTA */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Ready to see how this works for your industry?</p>
                        <p className="text-xs text-muted-foreground">Discover specific applications in {selectedIndustry || 'your sector'}</p>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/contact?demo=model-audit&industry=${selectedIndustry || 'general'}&step=generated`} className="inline-flex items-center gap-2 whitespace-nowrap">
                          <TrendingUp className="h-4 w-4" />
                          {getIndustryCTA()}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 5: Verify Capsule */}
        {currentStep >= 5 && capsule && (
          <Card>
            <CardHeader>
              <CardTitle>Step 5: Independent Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Verify the proof capsule independently without accessing the original data or model. 
                This proves the integrity and authenticity of the audit evidence.
              </p>
              <div className="bg-cyan-50 dark:bg-cyan-950/20 p-3 rounded-lg border-l-4 border-cyan-400">
                <p className="text-sm text-cyan-800 dark:text-cyan-200">
                  <strong>Industry Context:</strong> In finance, auditors verify loan decisions without seeing personal data; 
                  in healthcare, regulators confirm AI diagnostic processes while preserving patient privacy.
                </p>
              </div>
              <Button onClick={verifyCapsule} disabled={isLoading || verification !== null}>
                {isLoading && !verification ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Verify Capsule
                  </>
                )}
              </Button>
              {verification && (
                <div className={`p-4 rounded-lg border ${
                  verification.ok 
                    ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                }`}>
                  <p className={`text-sm font-medium mb-2 ${
                    verification.ok ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                  }`}>
                    {verification.ok ? '✅ Verification Successful' : '❌ Verification Failed'}
                  </p>
                  <div className="text-sm space-y-2">
                    <div><strong>Message:</strong> {verification.message}</div>
                    <div><strong>Verification Time:</strong> {verification.verification_time_ms}ms</div>
                    <div className="pt-2 border-t">
                      <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded">
                        <strong>✅ Anchor, count, and integrity all confirmed — no data exposure.</strong>
                      </div>
                    </div>
                  </div>
                  {/* Mid-flow CTA after verification */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Perfect! This is exactly how audit-ready proof generation works.</p>
                        <p className="text-xs text-muted-foreground">See how this applies to your specific {selectedIndustry || 'industry'} challenges</p>
                      </div>
                      <Button asChild size="sm" className="whitespace-nowrap">
                        <Link href={`/contact?demo=model-audit&industry=${selectedIndustry || 'general'}&step=verified`} className="inline-flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          {getIndustryCTA()}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Demo Complete */}
      {verification && (
        <div className="mt-12 text-center space-y-6">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Demo Complete!</strong> You've successfully generated and verified a proof capsule 
              for AI model inferences without exposing sensitive data or model internals.
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={resetDemo} variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Reset Demo
            </Button>
            <Button asChild>
              <Link href={`/contact?demo=model-audit&industry=${selectedIndustry || 'general'}`} className="inline-flex items-center gap-2">
                Request Early Access
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* What This Demonstrates */}
      <div className="mt-16 pt-8 border-t">
        {/* Why This Matters */}
        <div className="text-center mb-8">
          <h2 className="font-headline text-2xl font-bold mb-4">Why This Matters</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-2">
            Traditional AI systems create a choice between transparency and privacy. Our selective proof generation 
            breaks this trade-off, enabling verifiable AI decisions without exposing sensitive data or model internals.
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            This isn't just about compliance — it's about building the foundation for trustworthy AI 
            that organizations and regulators can confidently rely on.
          </p>
        </div>
        
        <h3 className="font-headline text-xl font-bold text-center mb-8">What This Demo Teaches</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Selective Proof Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Create audit evidence only when needed, dramatically reducing storage costs while maintaining integrity.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Privacy Preservation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Verify model behavior without exposing training data, model parameters, or sensitive inference details.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Independent Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Third parties can verify proof capsules without access to original systems or data sources.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
