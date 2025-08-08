import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Database, Lock, Receipt, KeyRound, PlayCircle, Building, Code, Clock } from 'lucide-react';

const trustSeals = [
  {
    icon: Database,
    title: 'Provenance Capsules',
    description: 'Cryptographically sealed records verifying data origin and integrity.',
    link: '/framework'
  },
  {
    icon: KeyRound,
    title: 'Model Anchor Keys',
    description: 'Unique identifiers that link AI models to their authorized datasets and use cases.',
    link: '/framework'
  },
  {
    icon: Receipt,
    title: 'Uncertainty Receipts',
    description: 'Tamper-evident proof of a model&apos;s performance, limitations, and compliance checks.',
    link: '/framework'
  },
];

const showcaseFeatures = [
  {
    icon: PlayCircle,
    title: 'Interactive Framework',
    description: 'Explore CIAF components and their cryptographic integration',
    href: '/framework',
    color: 'bg-blue-500',
    status: 'available'
  },
  {
    icon: Building,
    title: 'About CognitiveInsight',
    description: 'Learn about our mission and approach to AI governance',
    href: '/about',
    color: 'bg-green-500',
    status: 'available'
  },
  {
    icon: Code,
    title: 'Contact & Support',
    description: 'Get in touch with our team for technical discussions',
    href: '/contact',
    color: 'bg-purple-500',
    status: 'available'
  }
];

const trustFeatures = [
    { text: 'Client-side encryption ensures your data never leaves your control.' },
    { text: 'Tamper-evident audit trails provide immutable proof of compliance.' },
    { text: 'Regulator-ready receipts simplify and accelerate governance reviews.' },
    { text: 'Zero-knowledge compliance verification (Coming Q4 2025)', comingSoon: true },
    { text: 'Multi-party computation for federated learning (Coming Q1 2026)', comingSoon: true },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium">
            <Clock className="inline w-4 h-4 mr-2" />
            🚀 New Features Coming Soon: Zero-Knowledge Compliance & Federated CIAF
            <Link href="/contact" className="ml-2 underline hover:no-underline">
              Join Early Access →
            </Link>
          </p>
        </div>
      </div>
      
      <main className="flex-1">
        <section className="relative w-full py-24 md:py-32 lg:py-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-hero-gradient-middle to-black">
          <div className="container px-4 md:px-6 text-center text-primary-foreground">
            <div className="space-y-4">
               <Badge variant="secondary" className="text-lg py-2 px-4 rounded-full">Advanced AI Governance</Badge>
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Verifiable AI Governance for a Transparent Future
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl text-gray-300">
                CognitiveInsight.AI ensures cryptographically verifiable audit trails through its CIAF system. From model training to inference, every critical action is traceable, tamper-evident, and exportable — without compromising speed or privacy.
              </p>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild variant="secondary">
                <Link href="/framework">Explore Framework</Link>
              </Button>
              <Button size="lg" asChild variant="outline" className="bg-transparent border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Showcase Features */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm text-muted-foreground font-headline">Explore CIAF</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">See What CIAF Can Do</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experience the power of cryptographically integrated AI through our comprehensive showcases and demonstrations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-4xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              {showcaseFeatures.map((feature) => (
                <Link key={feature.title} href={feature.href}>
                  <Card className="h-full text-center transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer relative">
                    {feature.status === 'coming-soon' && (
                      <Badge variant="secondary" className="absolute top-2 right-2 z-10">
                        <Clock className="w-3 h-3 mr-1" />
                        Coming Soon
                      </Badge>
                    )}
                    <CardHeader>
                      <div className={`mx-auto w-fit rounded-md ${feature.color} p-3`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="font-headline mt-4">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                 <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground font-headline">Core Components</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">The Pillars of Trustified AI</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our Cryptographically Integrated AI Framework (CIAF) is built on three core pillars that provide end-to-end verifiability for your AI systems.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              {trustSeals.map((seal) => (
                <Link key={seal.title} href={seal.link}>
                  <Card className="h-full text-center transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                    <CardHeader>
                      <div className="mx-auto w-fit rounded-md bg-primary p-3">
                        <seal.icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <CardTitle className="font-headline mt-4">{seal.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{seal.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <div className="mx-auto rounded-lg shadow-2xl bg-muted/30 border-2 border-dashed border-muted-foreground/20 p-16 max-w-4xl">
                <div className="flex flex-col items-center justify-center h-96">
                  <div className="text-6xl mb-4">🚧</div>
                  <h3 className="text-2xl font-semibold text-muted-foreground mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground">CIAF ML Pipeline Diagram</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  Roadmap 2025-2026
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">What&apos;s Coming Next</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We&apos;re continuously expanding CIAF with cutting-edge features to meet the evolving needs of AI governance and compliance.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card className="relative border-dashed border-2 border-muted-foreground/30">
                <Badge variant="secondary" className="absolute top-4 right-4">
                  Q4 2025
                </Badge>
                <CardHeader>
                  <div className="mx-auto w-fit rounded-md bg-blue-500/20 p-3">
                    <Lock className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="font-headline mt-4">Zero-Knowledge Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Verify compliance without revealing sensitive model parameters or training data details.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative border-dashed border-2 border-muted-foreground/30">
                <Badge variant="secondary" className="absolute top-4 right-4">
                  Q1 2026
                </Badge>
                <CardHeader>
                  <div className="mx-auto w-fit rounded-md bg-green-500/20 p-3">
                    <Database className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="font-headline mt-4">Federated CIAF</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Multi-party computation enabling collaborative AI while maintaining data sovereignty.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <Button variant="outline" asChild>
                <Link href="/contact">
                  <Clock className="w-4 h-4 mr-2" />
                  Get Early Access
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Privacy Is Non-Negotiable.</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Every compliance receipt is sealed with enterprise-grade encryption and linked through a zero-knowledge architecture. Your data never leaves your control. We build verifiable, privacy-first AI systems that empower regulators and practitioners to trust the intelligence shaping our world.
                    </p>
                    <ul className="grid gap-2 py-4">
                        {trustFeatures.map((feature, index) => (
                             <li key={index} className="flex items-center">
                                {feature.comingSoon ? (
                                  <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <CheckCircle className="mr-2 h-5 w-5 text-accent" />
                                )}
                                <span className={feature.comingSoon ? 'text-muted-foreground' : ''}>
                                  {feature.text}
                                </span>
                                {feature.comingSoon && (
                                  <Badge variant="outline" className="ml-2">
                                    Coming Soon
                                  </Badge>
                                )}
                            </li>
                        ))}
                    </ul>
                    <Button asChild>
                        <Link href="/contact">Contact Us for More Information</Link>
                    </Button>
                </div>
                <div className="rounded-xl shadow-2xl bg-muted/30 border-2 border-dashed border-muted-foreground/20 p-12 max-w-lg mx-auto">
                  <div className="flex flex-col items-center justify-center h-64">
                    <div className="text-4xl mb-3">🔒</div>
                    <h3 className="text-xl font-semibold text-muted-foreground mb-1">Coming Soon</h3>
                    <p className="text-sm text-muted-foreground text-center">Trust & Security Illustration</p>
                  </div>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
