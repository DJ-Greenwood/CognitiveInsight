'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  Shield, 
  CheckCircle, 
  FileText, 
  Lock, 
  Zap, 
  ArrowRight, 
  PlayCircle,
  Eye,
  Download,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

const demoSteps = [
  {
    id: 1,
    title: 'Upload Data',
    description: 'Securely upload your ML model outputs or audit data',
    icon: Upload,
    status: 'complete',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    detail: 'Sample financial transaction data (anonymized)',
    tech: 'End-to-end encryption during transit'
  },
  {
    id: 2,
    title: 'Generate Anchor',
    description: 'Create cryptographic fingerprint for integrity verification',
    icon: Shield,
    status: 'complete',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    detail: 'SHA-256 hash with merkle tree structure',
    tech: 'Tamper-evident cryptographic anchoring'
  },
  {
    id: 3,
    title: 'Verify Integrity',
    description: 'Instantly verify data hasn\'t been tampered with',
    icon: CheckCircle,
    status: 'active',
    color: 'text-sky-600',
    bgColor: 'bg-sky-100 dark:bg-sky-900/20',
    detail: 'Verification completed in 0.023 seconds',
    tech: 'Zero-knowledge proof verification'
  },
  {
    id: 4,
    title: 'Generate Proof',
    description: 'Create audit-ready tamper-evident report',
    icon: FileText,
    status: 'pending',
    color: 'text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-900/20',
    detail: 'Regulatory-compliant audit trail',
    tech: 'Cryptographically signed evidence'
  }
];

const mockMetrics = {
  dataSize: '2.3 MB',
  processingTime: '0.127 seconds',
  storageReduction: '94.2%',
  verificationSpeed: '1000x faster',
  integrityScore: '100%'
};

export function InteractiveDemoPreview() {
  const [currentStep, setCurrentStep] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayDemo = () => {
    setIsPlaying(true);
    // Simulate demo progression
    setTimeout(() => {
      setCurrentStep(4);
      setTimeout(() => {
        setIsPlaying(false);
      }, 1500);
    }, 2000);
  };

  return (
    <section className="w-full py-16 md:py-20 bg-background">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <PlayCircle className="w-4 h-4 mr-2" />
            Interactive Demo Preview
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            See Insight™ in Action
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-4">
            Experience the cryptographic audit process from upload to tamper-evident proof generation
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* Demo Interface */}
            <Card className="bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 dark:from-sky-950/20 dark:via-blue-950/20 dark:to-sky-900/20 border-sky-200 dark:border-sky-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-sky-600" />
                    Insight™ Demo Console
                  </CardTitle>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    <Eye className="w-3 h-3 mr-1" />
                    Live Simulation
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Progress Steps */}
                <div className="space-y-4">
                  {demoSteps.map((step) => {
                    const isActive = step.id === currentStep;
                    const isComplete = step.id < currentStep || step.status === 'complete';
                    const isPending = step.id > currentStep && step.status !== 'complete';
                    
                    return (
                      <div key={step.id} className={`flex items-start gap-4 p-4 rounded-lg transition-all ${
                        isActive ? 'bg-white dark:bg-gray-900 shadow-md border-2 border-sky-300 dark:border-sky-700' :
                        isComplete ? 'bg-white/60 dark:bg-gray-900/60' :
                        'bg-white/30 dark:bg-gray-900/30'
                      }`}>
                        <div className={`p-2 rounded-full ${
                          isActive ? step.bgColor : 
                          isComplete ? 'bg-green-100 dark:bg-green-900/20' : 
                          'bg-gray-100 dark:bg-gray-800'
                        }`}>
                          <step.icon className={`w-4 h-4 ${
                            isActive ? step.color :
                            isComplete ? 'text-green-600' :
                            'text-gray-400'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm">{step.title}</h4>
                            {isActive && isPlaying && (
                              <div className="flex space-x-1">
                                <div className="w-1 h-1 bg-sky-600 rounded-full animate-pulse"></div>
                                <div className="w-1 h-1 bg-sky-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                <div className="w-1 h-1 bg-sky-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                              </div>
                            )}
                            {isComplete && <CheckCircle className="w-4 h-4 text-green-600" />}
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{step.description}</p>
                          <p className="text-xs font-mono text-sky-700 dark:text-sky-300">{step.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Demo Progress</span>
                    <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
                  </div>
                  <Progress value={(currentStep / 4) * 100} className="h-2" />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    onClick={handlePlayDemo} 
                    disabled={isPlaying || currentStep === 4}
                    className="flex-1"
                    size="lg"
                  >
                    {isPlaying ? (
                      <>
                        <Zap className="w-4 h-4 mr-2 animate-pulse" />
                        Processing...
                      </>
                    ) : currentStep === 4 ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Demo Complete
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Continue Demo
                      </>
                    )}
                  </Button>
                  
                  <Button asChild variant="outline" size="lg">
                    <Link href="/demo">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Demo Results & Metrics */}
            <div className="space-y-6">
              
              {/* Real-time Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{mockMetrics.storageReduction}</div>
                      <div className="text-xs text-muted-foreground">Storage Reduction</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{mockMetrics.verificationSpeed}</div>
                      <div className="text-xs text-muted-foreground">Faster Verification</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{mockMetrics.processingTime}</div>
                      <div className="text-xs text-muted-foreground">Processing Time</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{mockMetrics.integrityScore}</div>
                      <div className="text-xs text-muted-foreground">Integrity Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sample Output */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Sample Audit Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg font-mono text-xs space-y-2">
                    <div className="text-green-600">✓ Data Integrity: VERIFIED</div>
                    <div className="text-blue-600">✓ Cryptographic Anchor: 0x7a9b2c8d...</div>
                    <div className="text-purple-600">✓ Timestamp: 2025-08-12T10:30:45Z</div>
                    <div className="text-orange-600">✓ Verification Method: SHA-256 + Merkle Tree</div>
                    <div className="text-gray-600">📄 Report Size: 2.1 KB (vs 2.3 MB raw data)</div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Badge variant="outline" className="text-xs">
                      <Download className="w-3 h-3 mr-1" />
                      Downloadable PDF Report
                    </Badge>
                    <Button variant="outline" size="sm" disabled>
                      <Download className="w-4 h-4 mr-2" />
                      Download Sample
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Signals */}
              <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm text-yellow-800 dark:text-yellow-200 mb-1">
                        Simulation Environment
                      </h4>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300 leading-relaxed">
                        This demo uses synthetic data and simulated processes. Results are representative 
                        of expected performance based on internal testing. Actual results may vary.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Full Demo CTA */}
          <div className="text-center mt-12">
            <Card className="bg-gradient-to-r from-sky-500 to-blue-600 text-white border-0 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-3 font-headline">
                  Ready for the Full Experience?
                </h3>
                <p className="text-sky-100 mb-6">
                  Try our complete interactive demo with real-world scenarios and downloadable reports
                </p>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/demo">
                    Launch Full Demo <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
