import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Lightbulb, Heart, FileText, Building, DollarSign, Shield, Activity, Factory, Users, Mail, Clock, Sparkles } from 'lucide-react';

const industries = [
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'HIPAA-compliant audits without logging every record.',
  },
  {
    icon: DollarSign,
    title: 'Finance',
    description: 'SEC-ready proofs without overwhelming storage.',
  },
  {
    icon: Shield,
    title: 'Defense',
    description: 'AI/ML auditability in classified pipelines.',
  },
  {
    icon: Activity,
    title: 'IoT & Edge Devices',
    description: 'Lightweight integrity verification in the field.',
  },
  {
    icon: Factory,
    title: 'Energy & Critical Infrastructure',
    description: 'Compliance under CISA/NERC standards.',
  },
  {
    icon: Building,
    title: 'AI Governance',
    description: 'Explainability for black-box models.',
  }
];

const partnerships = [
  { text: 'Pilot partners in regulated industries.' },
  { text: 'Investors & funders who believe in smarter compliance.' },
  { text: 'Advisors & collaborators in AI governance, cryptography, and regulatory affairs.' },
];

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-lg py-2 px-4 rounded-full">
            About CognitiveInsight.ai
          </Badge>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
            Turning Confusion into Clarity
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto">
            I founded CognitiveInsight.ai to help organizations navigate the growing complexity of AI compliance, data governance, and regulatory audits — without the crushing cost or operational slowdown.
          </p>
        </div>

        {/* Human-led, AI-assisted disclosure */}
        <div className="rounded-lg border bg-muted/40 p-4 mb-12">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong>Human-led, AI-assisted:</strong> I design and build Insight™. I use AI tools to accelerate research, drafting, and prototyping. These tools reference my own historical project discussions to provide context — all final decisions and outputs are mine.
            </p>
          </div>
        </div>

        {/* Main Description */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-8 rounded-lg mb-16">
          <p className="text-lg text-foreground leading-relaxed">
            I’m building <strong>Insight™</strong>, a patent-pending compliance framework that transforms how data audits are done. Instead of logging everything and drowning in records, Insight™ creates on-demand, cryptographically verifiable proofs that meet or exceed regulatory standards — at a fraction of the cost.
          </p>
        </div>

        {/* Why This Matters Section */}
        <div className="mb-16">
          <h2 className="font-headline text-3xl font-bold mb-8 text-center">Why This Matters</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-red-600">The Problem</h3>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                  <p className="text-foreground leading-relaxed mb-4">
                    <strong>Modern AI and data systems are generating audit requirements faster than organizations can handle.</strong>
                    The traditional approach — “log everything, sort it out later” — is breaking down under the volume and complexity.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Storage costs spiral out of control with millions of daily events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>AI decisions remain black boxes, impossible to audit effectively</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Regulatory investigations take months while evidence is scattered across systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Data breaches during audits expose sensitive information unnecessarily</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-green-600">The Stakes</h3>
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <p className="text-foreground leading-relaxed mb-4">
                    <strong>The regulatory landscape is tightening rapidly.</strong>
                    New AI governance frameworks, data protection laws, and industry standards are demanding unprecedented levels of transparency and accountability.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>EU AI Act requires comprehensive audit trails for high-risk AI systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Healthcare organizations face HIPAA violations for inadequate data integrity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Financial institutions must prove non-rewriteable record retention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Critical infrastructure faces new cybersecurity logging requirements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-amber-900 dark:text-amber-100">
                Organizations need a fundamentally different approach
              </h3>
              <p className="text-lg text-amber-800 dark:text-amber-200 leading-relaxed max-w-3xl mx-auto">
                The solution isn’t more storage or faster searches — it’s <strong>selective, on-demand proof generation</strong>
                that can instantly produce cryptographically verifiable audit evidence without the overhead of traditional logging systems.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <h2 className="font-headline text-3xl font-bold mb-6 text-center">My Story</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <p className="text-lg text-foreground/80 leading-relaxed">
                CognitiveInsight.ai began as a side project — a place where people could engage with an AI assistant designed to be a supportive, thoughtful partner. While building this, I developed a zero-knowledge encryption system that keeps user data fully encrypted on-device before storage, with derived keys the server never sees.
              </p>
              <div className="bg-muted p-6 rounded-lg border-l-4 border-primary">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-2">In refining that system, a bigger idea emerged:</p>
                    <p className="text-muted-foreground italic">
                      “What if compliance audits could work the same way — only materializing when needed, but still provably correct?”
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-lg text-foreground/80 leading-relaxed">
                That question became <strong>selective, on-demand proof generation</strong> — the foundation for the Insight™ framework.
              </p>
            </div>
            <div className="flex justify-center items-start">
              <div className="bg-muted/30 rounded-full aspect-square shadow-lg border-2 border-dashed border-muted-foreground/20 p-8 w-64 h-64 flex flex-col items-center justify-center">
                <div className="text-5xl mb-3">👨‍💻</div>
                <h3 className="text-lg font-semibold text-muted-foreground mb-1">Coming Soon</h3>
                <p className="text-sm text-muted-foreground text-center">Founder Photo</p>
              </div>
            </div>
          </div>
        </div>

        {/* About the Founder Section */}
        <div className="mb-16">
          <h2 className="font-headline text-3xl font-bold mb-6 text-center">About the Founder</h2>
          <div className="bg-background border rounded-lg p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-primary mb-2">Denzil James Greenwood</h3>
              <p className="text-lg text-muted-foreground">
                Entrepreneur, Independent Researcher, and Systems Thinker
              </p>
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6 text-center">
              I focus on AI, encryption, and compliance — approaching problems with both technical precision and regulatory foresight to make solutions not just functional, but future-proof.
            </p>

            <div className="grid gap-4 md:gap-6">
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    Zero-Knowledge Encryption (ZKE) SDK
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Creator of the ZKE SDK for web and enterprise applications.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-primary" />
                    Patent-Pending Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Inventor of two patent-pending technologies for cryptographically verifiable AI audit trails.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Activity className="h-5 w-5 text-primary" />
                    High-Performance Solutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Developer of data integrity solutions that scale from IoT devices to enterprise AI systems.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Where We're Going Section */}
        <div className="mb-16">
          <h2 className="font-headline text-3xl font-bold mb-6 text-center">Where This Is Going</h2>
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
            CognitiveInsight.ai is in early development, and I’m actively building the protocols to deploy Insight™ across industries including:
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Card key={industry.title} className="h-full text-center transition-all hover:shadow-lg hover:-translate-y-1 relative">
                <Badge variant="secondary" className="absolute top-2 right-2 z-10 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Under Development
                </Badge>
                <CardHeader>
                  <div className="mx-auto w-fit rounded-md bg-primary p-3 mb-2">
                    <industry.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-headline text-lg">{industry.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{industry.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Join Us Section */}
        <div className="mb-16">
          <h2 className="font-headline text-3xl font-bold mb-6 text-center">Join Me</h2>
          <p className="text-lg text-muted-foreground mb-8 text-center">I’m looking for:</p>
          <div className="grid gap-4 max-w-4xl mx-auto mb-8">
            {partnerships.map((partnership, index) => (
              <div key={index} className="flex items-center p-6 bg-muted rounded-lg border">
                <Users className="mr-4 h-6 w-6 text-primary flex-shrink-0" />
                <span className="text-lg">{partnership.text}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-xl text-muted-foreground mb-6">
              Together, we can <strong>turn confusion into clarity</strong>.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact" className="inline-flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Me to Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
