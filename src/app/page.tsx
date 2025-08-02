import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Database, Lock, Receipt, KeyRound } from 'lucide-react';

const trustSeals = [
  {
    icon: Database,
    title: 'Provenance Capsules',
    description: 'Cryptographically sealed records verifying data origin and integrity.',
  },
  {
    icon: KeyRound,
    title: 'Model Anchor Keys',
    description: 'Unique identifiers that link AI models to their authorized datasets and use cases.',
  },
  {
    icon: Receipt,
    title: 'Uncertainty Receipts',
    description: 'Tamper-evident proof of a model\'s performance, limitations, and compliance checks.',
  },
];

const trustFeatures = [
    { text: 'Client-side encryption ensures your data never leaves your control.' },
    { text: 'Tamper-evident audit trails provide immutable proof of compliance.' },
    { text: 'Regulator-ready receipts simplify and accelerate governance reviews.' },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full py-24 md:py-32 lg:py-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-[#0B1D3A] to-black">
          <div className="container px-4 md:px-6 text-center text-primary-foreground">
            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Verifiable AI Governance for a Transparent Future
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl text-gray-300">
                CognitiveInsight.AI integrates cryptographic trust and regulatory alignment into AI systems, ensuring
                compliance and accountability from dataset to decision.
              </p>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild variant="secondary">
                <Link href="/framework">See How It Works</Link>
              </Button>
              <Button size="lg" asChild variant="outline" className="bg-transparent border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                <Link href="/contact">Request a Demo</Link>
              </Button>
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
                <Card key={seal.title} className="text-center transition-all hover:shadow-lg hover:-translate-y-1">
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
              ))}
            </div>
            <div className="mt-12 text-center">
              <Image 
                src="https://placehold.co/1200x600.png" 
                alt="CIAF ML Pipeline Graphic"
                data-ai-hint="AI pipeline diagram"
                width={1200}
                height={600}
                className="mx-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Privacy Is Non-Negotiable.</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Every compliance receipt is sealed with AES-GCM encryption and linked through a zero-knowledge architecture. Your data never leaves your control. We build verifiable, privacy-first AI systems that empower regulators and practitioners to trust the intelligence shaping our world.
                    </p>
                    <ul className="grid gap-2 py-4">
                        {trustFeatures.map((feature, index) => (
                             <li key={index} className="flex items-center">
                                <CheckCircle className="mr-2 h-5 w-5 text-accent" />
                                {feature.text}
                            </li>
                        ))}
                    </ul>
                    <Button asChild>
                        <Link href="/trust">Learn More About Trust & Privacy</Link>
                    </Button>
                </div>
                <Image
                    src="https://placehold.co/600x400.png"
                    width={600}
                    height={400}
                    alt="Trust Graphic"
                    data-ai-hint="data security illustration"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                />
            </div>
        </section>
      </main>
    </div>
  );
}
