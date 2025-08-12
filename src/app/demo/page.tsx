import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Shield, AlertTriangle, ExternalLink, FileText, Anchor } from 'lucide-react';

export default function DemoPage() {
  return (
    <div className="container py-12 md:py-24">
      {/* Patent Notice Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
          <FileText className="h-5 w-5" />
          <p className="text-sm font-medium">
            <strong>Patent-Pending Technology Demo</strong> - The implementations shown here are simplified demonstrations. 
            Actual cryptographic methods are protected under pending U.S. patent applications.
          </p>
        </div>
      </div>

      {/* Simulation Disclaimer */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <div className="text-center">
          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">
            🔬 Interactive Simulations of Insight™ Framework
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4 max-w-4xl mx-auto">
            These demos are <strong>interactive simulations</strong> that demonstrate the core concepts and workflow of the Insight™ framework. 
            All data is generated for demonstration purposes only — no real cryptographic operations, actual blockchain transactions, 
            or live data processing occurs.
          </p>
          <div className="grid gap-4 md:grid-cols-3 text-sm text-blue-700 dark:text-blue-300">
            <div className="bg-white/50 dark:bg-blue-900/30 p-3 rounded">
              <strong>Simulated Components:</strong> Data generation, proof capsules, verification reports
            </div>
            <div className="bg-white/50 dark:bg-blue-900/30 p-3 rounded">
              <strong>Educational Purpose:</strong> Illustrate workflow concepts and user experience
            </div>
            <div className="bg-white/50 dark:bg-blue-900/30 p-3 rounded">
              <strong>Real Implementation:</strong> Available through early access program
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4 text-lg py-2 px-4 rounded-full">
          Interactive Demonstrations
        </Badge>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
          Experience Insight™ in Action
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
          See how selective, on-demand proof generation transforms compliance across different domains — 
          from AI model audits to cybersecurity incident verification.
        </p>
        <div className="bg-muted p-6 rounded-lg max-w-3xl mx-auto">
          <h3 className="font-semibold mb-3">What These Demos Show vs. Hide:</h3>
          <div className="grid gap-4 md:grid-cols-2 text-sm">
            <div>
              <h4 className="font-medium text-green-600 mb-2">✅ What You'll See:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Selective proof generation flow</li>
                <li>• Independent verification process</li>
                <li>• Cost/performance trade-offs</li>
                <li>• Capsule metadata summaries</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-600 mb-2">🔒 What We Don't Reveal:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Cryptographic key derivation</li>
                <li>• Internal proof structures</li>
                <li>• Raw capsule wire formats</li>
                <li>• Persistent key material</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-16">
        {/* Mini-Model Audit Demo */}
        <Card className="h-full border-2 border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-fit rounded-full bg-blue-500 p-4 mb-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="font-headline text-2xl">Mini-Model Audit</CardTitle>
            <p className="text-muted-foreground">Toy AI Model Demonstration</p>
            <Badge variant="outline" className="w-fit mx-auto mt-2">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Under Development
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Train a small logistic regression model on synthetic data, run inferences, 
              then generate verifiable proof capsules — all without exposing model internals or raw data.
            </p>
            
            <div className="space-y-3">
              <h4 className="font-medium">Demo Flow:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-medium">1</div>
                  <span>Generate synthetic dataset (300 rows)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-medium">2</div>
                  <span>Train/load small model</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-medium">3</div>
                  <span>Run inferences (3-5 samples)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-medium">4</div>
                  <span>Generate proof capsule</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-medium">5</div>
                  <span>Verify independently</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full" asChild>
                <Link href="/demo/model" className="inline-flex items-center gap-2">
                  Try Model Demo
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cybersecurity Log Proofs Demo */}
        <Card className="h-full border-2 border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-fit rounded-full bg-red-500 p-4 mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="font-headline text-2xl">Cybersecurity Log Proofs</CardTitle>
            <p className="text-muted-foreground">SIEM / Operations Demonstration</p>
            <Badge variant="outline" className="w-fit mx-auto mt-2">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Under Development
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Process high-volume security logs, apply selective filters, then generate verifiable 
              incident capsules — proving compliance without storing everything.
            </p>
            
            <div className="space-y-3">
              <h4 className="font-medium">Demo Flow:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-xs font-medium">1</div>
                  <span>Stream synthetic security logs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-xs font-medium">2</div>
                  <span>Apply filters (severity, IP, service)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-xs font-medium">3</div>
                  <span>Generate incident capsule</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-xs font-medium">4</div>
                  <span>Verify capsule integrity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-xs font-medium">5</div>
                  <span>Generate verification report</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full" asChild>
                <Link href="/demo/secops" className="inline-flex items-center gap-2">
                  Try SecOps Demo
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Blockchain Anchoring Demo */}
        <Card className="h-full border-2 border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-fit rounded-full bg-emerald-500 p-4 mb-4">
              <Anchor className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="font-headline text-2xl">Blockchain Anchoring</CardTitle>
            <p className="text-muted-foreground">Immutable Audit Evidence</p>
            <Badge variant="outline" className="w-fit mx-auto mt-2">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Under Development
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Transform compliance data into tamper-proof, blockchain-anchored proof capsules that provide 
              independent verification without exposing sensitive information.
            </p>
            
            <div className="space-y-3">
              <h4 className="font-medium">Demo Flow:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-xs font-medium">1</div>
                  <span>Select compliance dataset</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-xs font-medium">2</div>
                  <span>Apply filters (status, category, date)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-xs font-medium">3</div>
                  <span>Generate proof capsule</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-xs font-medium">4</div>
                  <span>Anchor to blockchain</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-xs font-medium">5</div>
                  <span>Verify independently</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full" asChild>
                <Link href="/demo/blockchain" className="inline-flex items-center gap-2">
                  Try Blockchain Demo
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Concepts */}
      <div className="mb-16 max-w-4xl mx-auto">
        <h2 className="font-headline text-3xl font-bold text-center mb-8">Key Concepts Demonstrated</h2>
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
              <CardTitle className="text-lg">Independent Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Verify capsule integrity without accessing raw data or exposing sensitive model parameters.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Cross-Domain Scalability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Same conceptual flow works for tiny ML models and high-volume operational logs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-8">
        <h2 className="font-headline text-2xl font-bold mb-4">Ready to Transform Your Compliance?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          These demonstrations show just a glimpse of what Insight™ can do. 
          Join our early access program to explore the full capabilities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/contact?demo=overview">Request Early Access</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/framework">Learn More About Insight™</Link>
          </Button>
        </div>
      </div>

      {/* Footer Patent Notice */}
      <div className="mt-12 pt-8 border-t border-muted text-center">
        <p className="text-xs text-muted-foreground">
          📜 <strong>Patent Notice:</strong> Insight™ is patent-pending under U.S. Utility Patent Applications covering 
          cryptographic audit trail generation, selective materialization, and zero-knowledge compliance methods.
          These demonstrations are simplified and do not reveal proprietary implementation details.
        </p>
      </div>
    </div>
  );
}
