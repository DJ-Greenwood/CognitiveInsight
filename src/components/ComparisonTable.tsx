'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, X, AlertTriangle, Zap, Trophy } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    category: 'Audit Efficiency',
    features: [
      {
        name: 'On-demand proof generation',
        insight: true,
        mlflow: false,
        wandb: false,
        dvc: false,
        description: 'Generate cryptographic proofs only when needed for audits'
      },
      {
        name: 'Storage optimization',
        insight: true,
        mlflow: 'partial',
        wandb: 'partial', 
        dvc: true,
        description: 'Minimize storage footprint while maintaining audit capability'
      },
      {
        name: 'Tamper-evident verification',
        insight: true,
        mlflow: false,
        wandb: false,
        dvc: 'partial',
        description: 'Cryptographic proof that data hasn\'t been modified'
      }
    ]
  },
  {
    category: 'Privacy & Security',
    features: [
      {
        name: 'Zero-knowledge proofs',
        insight: true,
        mlflow: false,
        wandb: false,
        dvc: false,
        description: 'Verify integrity without exposing sensitive data'
      },
      {
        name: 'Privacy-preserving audits',
        insight: true,
        mlflow: false,
        wandb: false,
        dvc: false,
        description: 'Conduct audits without sharing raw data with third parties'
      },
      {
        name: 'Selective disclosure',
        insight: true,
        mlflow: false,
        wandb: false,
        dvc: false,
        description: 'Share only necessary information for compliance'
      }
    ]
  },
  {
    category: 'Regulatory Compliance',
    features: [
      {
        name: 'Built for regulated industries',
        insight: true,
        mlflow: 'partial',
        wandb: 'partial',
        dvc: false,
        description: 'Designed specifically for HIPAA, SEC, FDA, DoD requirements'
      },
      {
        name: 'Audit trail integrity',
        insight: true,
        mlflow: 'partial',
        wandb: 'partial',
        dvc: 'partial',
        description: 'Mathematically provable audit trail authenticity'
      },
      {
        name: 'Real-time compliance monitoring',
        insight: true,
        mlflow: false,
        wandb: 'partial',
        dvc: false,
        description: 'Continuous compliance status without constant logging'
      }
    ]
  },
  {
    category: 'Performance & Scale',
    features: [
      {
        name: 'Sub-second verification',
        insight: true,
        mlflow: false,
        wandb: 'partial',
        dvc: false,
        description: 'Fast cryptographic verification of large datasets'
      },
      {
        name: '100M+ event scalability',
        insight: true,
        mlflow: 'partial',
        wandb: 'partial',
        dvc: 'partial',
        description: 'Proven architecture for high-volume environments'
      },
      {
        name: 'Lazy evaluation optimization',
        insight: true,
        mlflow: false,
        wandb: false,
        dvc: false,
        description: 'Process only what\'s needed, when it\'s needed'
      }
    ]
  }
];

const tools = [
  { 
    name: 'Insight™', 
    key: 'insight', 
    tagline: 'Patent-Pending Cryptographic Audit Framework',
    color: 'bg-sky-500',
    textColor: 'text-sky-700',
    bgColor: 'bg-sky-50 dark:bg-sky-950/20'
  },
  { 
    name: 'MLflow', 
    key: 'mlflow', 
    tagline: 'ML Experiment Tracking',
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20'
  },
  { 
    name: 'W&B', 
    key: 'wandb', 
    tagline: 'Weights & Biases ML Platform',
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20'
  },
  { 
    name: 'DVC', 
    key: 'dvc', 
    tagline: 'Data Version Control',
    color: 'bg-purple-500',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20'
  }
];

function FeatureIcon({ value }: { value: boolean | 'partial' | string }) {
  if (value === true) {
    return <CheckCircle className="w-5 h-5 text-green-600" />;
  } else if (value === 'partial') {
    return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
  } else {
    return <X className="w-5 h-5 text-gray-400" />;
  }
}

export function ComparisonTable() {
  return (
    <section className="w-full py-16 md:py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Trophy className="w-4 h-4 mr-2" />
            Feature Comparison
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            Insight™ vs. Traditional ML Tools
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-4">
            See how Insight™'s cryptographic approach differs from existing ML lifecycle management tools
          </p>
        </div>

        {/* Comparison Table */}
        <Card className="overflow-hidden max-w-7xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20">
            <div className="grid grid-cols-5 gap-4 items-center">
              <div className="col-span-1">
                <CardTitle className="text-lg font-headline">Feature</CardTitle>
              </div>
              {tools.map((tool) => (
                <div key={tool.key} className={`text-center p-4 rounded-lg ${tool.bgColor} border border-gray-200 dark:border-gray-700`}>
                  <div className={`inline-block w-3 h-3 rounded-full ${tool.color} mb-2`}></div>
                  <h3 className="font-bold text-sm mb-1">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground">{tool.tagline}</p>
                </div>
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {features.map((category, categoryIndex) => (
              <div key={category.category}>
                {/* Category Header */}
                <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-sm text-muted-foreground tracking-wide uppercase">
                    {category.category}
                  </h3>
                </div>
                
                {/* Features */}
                {category.features.map((feature, featureIndex) => (
                  <div key={feature.name} className="grid grid-cols-5 gap-4 items-center p-6 border-b border-gray-100 dark:border-gray-800 hover:bg-muted/30 transition-colors">
                    {/* Feature Name */}
                    <div className="col-span-1">
                      <div className="font-medium text-sm mb-1">{feature.name}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        {feature.description}
                      </div>
                    </div>
                    
                    {/* Tool Comparisons */}
                    <div className="text-center">
                      <FeatureIcon value={feature.insight} />
                    </div>
                    <div className="text-center">
                      <FeatureIcon value={feature.mlflow} />
                    </div>
                    <div className="text-center">
                      <FeatureIcon value={feature.wandb} />
                    </div>
                    <div className="text-center">
                      <FeatureIcon value={feature.dvc} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex justify-center items-center gap-8 mt-8 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Full Support</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span>Partial Support</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="w-4 h-4 text-gray-400" />
            <span>Not Supported</span>
          </div>
        </div>

        {/* Key Differentiator Call-out */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-sky-500 to-blue-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-sky-100" />
              <h3 className="text-2xl font-bold mb-3 font-headline">
                The Insight™ Advantage
              </h3>
              <p className="text-lg text-sky-100 mb-6 max-w-2xl mx-auto">
                While traditional ML tools focus on experiment tracking and versioning, 
                Insight™ is purpose-built for cryptographic audit compliance in regulated industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/demo">
                    See Live Demo
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-sky-200 text-sky-100 hover:bg-sky-100 hover:text-sky-900" asChild>
                  <Link href="/contact">
                    Request Pilot
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
