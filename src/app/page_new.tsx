import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InteractiveDemoPreview } from '@/components/InteractiveDemoPreview';
import { PilotProgramCTA } from '@/components/PilotProgramCTA';
import {
  CheckCircle, Receipt, KeyRound, PlayCircle, Clock,
  Zap, Shield, FileText, Activity, Heart, DollarSign,
  Users, Sparkles, Download, ArrowRight, Building, Layers, 
  Timer, Lock
} from 'lucide-react';

// Value metrics for the new tight copy
const valueMetrics = [
  {
    metric: '90%',
    title: 'Cost Reduction',
    description: 'Selective, on-demand auditing cuts storage & ops',
    color: 'text-green-600'
  },
  {
    metric: '1000×',
    title: 'Faster Registration',
    description: 'Avoid eager logging overhead',
    color: 'text-blue-600'
  },
  {
    metric: '99.9%',
    title: 'Audit-Ready',
    description: 'Cryptographic integrity by design',
    color: 'text-purple-600'
  }
];

// How Insight Works features
const insightFeatures = [
  {
    icon: Receipt,
    title: 'Cryptographic Receipts',
    description: 'For each action (hashes, timestamps, anchors)'
  },
  {
    icon: Layers,
    title: 'Lazy Capsule Materialization',
    description: 'Proofs generated only when needed'
  },
  {
    icon: Activity,
    title: 'End-to-End Provenance',
    description: 'Datasets, models, and runs are traceable'
  },
  {
    icon: Timer,
    title: 'Sub-Second Verification',
    description: 'At scale via Merkle anchoring'
  }
];

// Examples of where it helps
const helpExamples = [
  {
    icon: Heart,
    industry: 'Healthcare',
    label: 'simulation',
    result: 'HIPAA prep cut from 6 months → 2 weeks; zero patient-data exposure to auditors.',
    color: 'from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20'
  },
  {
    icon: DollarSign,
    industry: 'Finance',
    label: 'simulation',
    result: 'Storage $50K→$7.5K/mo; queries 45s→<2s during SEC audits.',
    color: 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20'
  },
  {
    icon: Shield,
    industry: 'Defense',
    label: 'simulation',
    result: 'Zero-knowledge proofs preserve classification while achieving full audit coverage.',
    color: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20'
  }
];

// Comparison features
const comparisonFeatures = [
  {
    category: 'Primary Purpose',
    insight: 'Cryptographic audit & compliance',
    traditional: 'Experiment tracking/versioning'
  },
  {
    category: 'Audit Efficiency',
    insight: 'On-demand proofs',
    traditional: 'Persistent logging'
  },
  {
    category: 'Tamper Evidence',
    insight: 'Cryptographic verification',
    traditional: 'Metadata logs'
  },
  {
    category: 'Privacy',
    insight: 'Zero-knowledge / selective disclosure',
    traditional: 'Raw-data sharing'
  },
  {
    category: 'Scale',
    insight: 'Sub-second checks; 100M+ events architecture',
    traditional: 'Database queries'
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium">
            Patent-pending. In early development. 
            <Link href="/contact" className="underline hover:no-underline ml-2">
              Request pilot access.
            </Link>
          </p>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-32 lg:py-40 bg-gradient-to-br from-sky-900 via-blue-800 to-sky-700">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-sky-900/20 to-transparent"></div>
          
          <div className="container px-4 md:px-6 text-center text-white relative z-10">
            <div className="space-y-6">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Turn Confusion into Cryptographic Clarity
              </h1>
              <p className="mx-auto max-w-[800px] text-lg md:text-xl text-sky-100">
                A patent-pending audit layer for AI systems that issues verifiable, tamper-evident receipts on demand—without logging everything.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild variant="secondary" className="bg-sky-100 text-sky-900 hover:bg-sky-200">
                <Link href="/contact">Request Early Access</Link>
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="bg-transparent border-sky-200 text-sky-100 hover:bg-sky-100 hover:text-sky-900"
              >
                <Link href="/demo">Launch Live Demo</Link>
              </Button>
            </div>

            {/* Human-led, AI-assisted disclosure */}
            <div className="mt-8 mx-auto max-w-[800px]">
              <div className="inline-flex items-start gap-2 text-left rounded-md border border-sky-300/20 bg-sky-100/10 px-3 py-2 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 mt-0.5 text-sky-300" />
                <p className="text-xs md:text-sm text-sky-100">
                  <strong>Human-led, AI-assisted:</strong> I use AI to accelerate research and drafts; all final decisions and outputs are mine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Value at a Glance */}
        <section className="w-full py-16 md:py-20 bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 dark:from-sky-950/20 dark:via-blue-950/20 dark:to-sky-900/20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-sky-900 dark:text-sky-100">
                Value at a Glance
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 max-w-5xl mx-auto">
              {valueMetrics.map((metric) => (
                <Card key={metric.title} className="text-center border-sky-200 dark:border-sky-800 bg-white/80 dark:bg-sky-950/40 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className={`text-4xl font-bold ${metric.color} mt-2`}>
                      {metric.metric}
                    </div>
                    <CardTitle className="font-headline text-xl text-sky-900 dark:text-sky-100">
                      {metric.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sky-700 dark:text-sky-300 text-sm leading-relaxed">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-xs text-sky-600 dark:text-sky-400 max-w-2xl mx-auto">
                * Internal benchmarks & simulations; results vary by workload and configuration.
              </p>
            </div>
          </div>
        </section>

        {/* How Insight™ Works */}
        <section className="w-full py-16 md:py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                How Insight™ Works (at a glance)
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {insightFeatures.map((feature) => (
                <Card key={feature.title} className="text-center transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Preview */}
        <InteractiveDemoPreview />

        {/* Where It Helps */}
        <section className="w-full py-16 md:py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                Where It Helps (examples)
              </h2>
            </div>

            <div className="space-y-6 max-w-5xl mx-auto">
              {helpExamples.map((example) => (
                <Card key={example.industry} className={`overflow-hidden bg-gradient-to-br ${example.color} border-0`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-white dark:bg-gray-900 shadow-md">
                        <example.icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{example.industry}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {example.label}
                          </Badge>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {example.result}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
                Simulations based on controlled tests; seeking pilot partners for real-world validation.
              </p>
            </div>
          </div>
        </section>

        {/* Insight™ vs ML Tooling */}
        <section className="w-full py-16 md:py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                Insight™ vs. ML Tooling
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left py-4 px-6 font-semibold">Feature</th>
                          <th className="text-left py-4 px-6 font-semibold text-primary">Insight™</th>
                          <th className="text-left py-4 px-6 font-semibold text-muted-foreground">MLflow/W&B/DVC</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonFeatures.map((feature, index) => (
                          <tr key={index} className="border-t border-muted/50">
                            <td className="py-4 px-6 font-medium">{feature.category}</td>
                            <td className="py-4 px-6 text-primary">{feature.insight}</td>
                            <td className="py-4 px-6 text-muted-foreground">{feature.traditional}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/demo">See Live Demo</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Request Pilot</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Standards Alignment */}
        <section className="w-full py-8 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Aligned with</p>
              <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
                <span>NIST AI RMF</span>
                <span>•</span>
                <span>HIPAA</span>
                <span>•</span>
                <span>SEC 17a-4</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Alignment, not certification
              </p>
            </div>
          </div>
        </section>

        {/* Pilot Program CTA */}
        <PilotProgramCTA />

        {/* Footer CTA */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-sky-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Join the Early Access Program
              </h2>
              <p className="max-w-[700px] text-lg md:text-xl text-sky-100">
                Be the first to experience Insight™ and shape the future of compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Request Access</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-sky-200 text-sky-100 hover:bg-sky-100 hover:text-sky-900"
                  asChild
                >
                  <Link href="/demo">Try Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <p className="text-sm">
              © 2025 CognitiveInsight AI. Patent applications filed under U.S. patent law.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
