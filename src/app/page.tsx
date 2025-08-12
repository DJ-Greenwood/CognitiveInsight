import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Database, Lock, Receipt, KeyRound, PlayCircle, Building, Code, Clock, AlertTriangle, Zap, Shield, FileText, Activity, Factory, Truck, Heart, DollarSign, Users, Trophy, AlertCircle } from 'lucide-react';

const challengePoints = [
  {
    icon: Database,
    title: 'Excessive Audit Overhead',
    description: '“Log everything” bloats storage and compute, slowing investigations and inflating costs.',
  },
  {
    icon: AlertTriangle,
    title: 'Opaque AI Decisions',
    description: 'Outputs are hard to trace or verify, creating risk in audits and incident response.',
  }
];

const solutionFeatures = [
  {
    icon: Zap,
    title: 'On-Demand Proof Generation',
    description: 'Produce cryptographic audit evidence exactly when required, optimizing cost and latency.',
  },
  {
    icon: Receipt,
    title: 'Integrity Verification Anchoring',
    description: 'Prove data authenticity at scale with tamper-resistance designed for millions of events.',
  },
  {
    icon: Activity,
    title: 'Adaptive Compliance Response',
    description: 'Automatically shift from lightweight monitoring to detailed logging when triggered.',
  },
  {
    icon: Shield,
    title: 'Privacy-Preserving Verification',
    description: 'Enable verification without exposing sensitive underlying information.',
  }
];

const industries = [
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'HIPAA-aligned auditability without duplicating every raw record.',
  },
  {
    icon: DollarSign,
    title: 'Finance',
    description: 'SEC/FINRA-ready proofs without constant high-volume logging.',
  },
  {
    icon: Shield,
    title: 'Defense',
    description: 'Selective, real-time auditability in sensitive AI/ML pipelines.',
  },
  {
    icon: Building,
    title: 'AI Governance',
    description: 'Explainability and trust signals for black-box models.',
  },
  {
    icon: Activity,
    title: 'IoT & Edge Devices',
    description: 'Lightweight integrity proofs for sensors and field systems.',
  },
  {
    icon: Factory,
    title: 'Energy & Critical Infrastructure',
    description: 'Compliance and event integrity for CISA-regulated environments.',
  }
];

const benefits = [
  {
    icon: Database,
    title: 'Storage & Cost Savings',
    description: '10×–100× reduction in audit storage footprint.*',
  },
  {
    icon: Zap,
    title: 'Performance Gains',
    description: 'Registration up to 1000× faster than eager logging.*',
  },
  {
    icon: CheckCircle,
    title: 'Regulatory Confidence',
    description: 'Designed to meet or exceed tamper-evidence expectations.',
  },
  {
    icon: Trophy,
    title: 'Scalability',
    description: 'Architecture proven to scale to 100M+ events in testing.',
  }
];

const partnershipAreas = [
  { text: 'Funding — grants, angel investment, or strategic partnerships.' },
  { text: 'Pilot partners — run Insight™ in a live, regulated environment.' },
  { text: 'Advisors — compliance, AI governance, and cryptography expertise.' },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Patent Notice Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" aria-hidden />
            <span>Insight™ is patent-pending under U.S. Utility Patent Applications</span>
          </p>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          aria-labelledby="hero-title"
          className="relative w-full py-24 md:py-32 lg:py-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-hero-gradient-middle to-black"
        >
          <div className="container px-4 md:px-6 text-center text-primary-foreground">
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="text-lg py-2 px-4 rounded-full"
                aria-label="Patent-Pending and In Early Development"
              >
                Patent-Pending | In Early Development
              </Badge>
              <h1 id="hero-title" className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Turn Confusion to Clarity
              </h1>
              <p className="mx-auto max-w-[800px] text-lg md:text-xl text-gray-200">
                From excessive data streams to unknown AI black-box structures, our patent-pending audit technology delivers verifiable compliance — on demand.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild variant="secondary">
                <Link href="/contact" aria-label="Request Early Access">Request Early Access</Link>
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="bg-transparent border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              >
                <Link href="/contact" aria-label="Partner With Us">Partner With Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* The Challenge */}
        <section aria-labelledby="challenge-title" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <Badge variant="destructive" className="mb-4" aria-label="The Challenge">
                <AlertCircle className="w-4 h-4 mr-2" aria-hidden />
                The Challenge
              </Badge>
              <h2 id="challenge-title" className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                The Problem with Modern AI Systems
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed mt-4">
                AI and modern data systems generate overwhelming volumes of logs and outputs — often without structure or clear lineage. In regulated industries, this creates two critical issues:
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl items-start gap-8 sm:grid-cols-2 md:gap-12 mt-12">
              {challengePoints.map((challenge) => (
                <Card
                  key={challenge.title}
                  className="h-full text-center border-destructive/20 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-destructive"
                >
                  <CardHeader>
                    <div className="mx-auto w-fit rounded-md bg-destructive/10 p-3" aria-hidden>
                      <challenge.icon className="h-8 w-8 text-destructive" />
                    </div>
                    <CardTitle className="font-headline mt-4 text-destructive">{challenge.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{challenge.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg">
                The result is heightened <strong>compliance risk</strong>, <strong>costly investigations</strong>, and <strong>erosion of trust</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section aria-labelledby="solution-title" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <Badge variant="default" className="mb-4 bg-green-600 hover:bg-green-700" aria-label="Our Solution">
                <CheckCircle className="w-4 h-4 mr-2" aria-hidden />
                Our Solution
              </Badge>
              <h2 id="solution-title" className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Insight™</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed mt-4">
                Insight is our cryptographic audit framework that brings <strong>selective, on-demand proof generation</strong> to compliance.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl items-start gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
              {solutionFeatures.map((feature) => (
                <Card
                  key={feature.title}
                  className="h-full text-center transition-all hover:shadow-lg hover:-translate-y-1 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-600"
                >
                  <CardHeader>
                    <div className="mx-auto w-fit rounded-md bg-green-600 p-3" aria-hidden>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="font-headline mt-4 text-base lg:text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-2 font-headline">The Result</h3>
                <p className="text-lg text-muted-foreground">
                  Instant, verifiable audits with up to <strong className="text-green-700 dark:text-green-400">90% lower storage costs</strong> and
                  <strong className="text-blue-700 dark:text-blue-400"> 1000× faster data registration</strong><sup>1</sup>.
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  <sup>1</sup> Based on internal benchmarks. See{' '}
                  <Link href="/benchmarks" className="underline underline-offset-2">methodology</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section aria-labelledby="industries-title" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm text-muted-foreground font-headline">
                Target Industries
              </div>
              <h2 id="industries-title" className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline mt-3">
                Industries We’re Targeting
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed mt-4">
                Insight™ adapts to high-stakes sectors where auditability and compliance are mission-critical.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl items-start gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-12">
              {industries.map((industry) => (
                <Card
                  key={industry.title}
                  className="h-full text-center transition-all hover:shadow-lg hover:-translate-y-1 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary relative"
                >
                  <Badge variant="secondary" className="absolute top-2 right-2 z-10 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    Under Development
                  </Badge>
                  <CardHeader>
                    <div className="mx-auto w-fit rounded-md bg-primary p-3" aria-hidden>
                      <industry.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="font-headline mt-4 text-lg">{industry.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{industry.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section aria-labelledby="benefits-title" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <Badge variant="outline" className="mb-4" aria-label="Projected Benefits">
                <Trophy className="w-4 h-4 mr-2" aria-hidden />
                Projected Benefits
              </Badge>
              <h2 id="benefits-title" className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Why Choose Insight™</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed mt-4">
                A new compliance architecture with measurable gains across cost, performance, and trust.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-12">
              {benefits.map((benefit) => (
                <Card
                  key={benefit.title}
                  className="h-full text-center transition-all hover:shadow-lg hover:-translate-y-1 border-primary/20 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                >
                  <CardHeader>
                    <div className="mx-auto w-fit rounded-md bg-primary p-3" aria-hidden>
                      <benefit.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="font-headline mt-4">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              * Estimates based on internal tests; actual results will vary by workload and configuration.
            </p>
          </div>
        </section>

        {/* Partners */}
        <section aria-labelledby="partners-title" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <Badge variant="outline" className="mb-4" aria-label="Partnership Opportunities">
                <Users className="w-4 h-4 mr-2" aria-hidden />
                Partnership Opportunities
              </Badge>
              <h2 id="partners-title" className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">We’re Looking for Partners & Support</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed mt-4">
                We are in early development and seeking:
              </p>
            </div>

            <div className="mx-auto max-w-4xl mt-12">
              <div className="grid gap-4 md:gap-6">
                {partnershipAreas.map((area, index) => (
                  <div key={index} className="flex items-center p-6 bg-background rounded-lg border">
                    <CheckCircle className="mr-4 h-6 w-6 text-green-600 flex-shrink-0" aria-hidden />
                    <span className="text-lg">{area.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you share our vision for faster, leaner, and more transparent compliance, <strong>let’s build it together.</strong>
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button size="lg" asChild>
                  <Link href="/contact" aria-label="Join Early Access">Join Early Access</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact" aria-label="Contact Us">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Join the Early Access Program</h2>
              <p className="max-w-[700px] text-lg md:text-xl text-primary-foreground/90">
                Be the first to experience Insight™ and shape the future of compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact" aria-label="Request Access">Request Access</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link href="/contact" aria-label="Get in touch">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

