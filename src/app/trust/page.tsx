import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, ShieldCheck, FileLock2 } from 'lucide-react';

const trustPillars = [
    {
        icon: Lock,
        title: 'Client-Side Encryption',
        description: 'Your data is your own. The CIAF framework is designed so that all cryptographic operations, including the generation of dataset anchors and receipts, happen within your environment. Your raw data never needs to be shared with us or any third party.'
    },
    {
        icon: ShieldCheck,
        title: 'Tamper-Evident Audit Trails',
        description: 'Every action, from data ingestion to model correction, creates a cryptographically linked entry in an immutable log. This ensures that your audit trail is secure, complete, and verifiable, providing regulators with the highest level of assurance.'
    },
    {
        icon: FileLock2,
        title: 'Regulator-Ready Receipts',
        description: 'Our Uncertainty Receipts use zero-knowledge principles to prove compliance without revealing underlying data. You can satisfy audit requests with confidence, demonstrating governance without compromising intellectual property or user privacy.'
    }
]

export default function TrustPage() {
  return (
    <div className="bg-background">
      <section className="container py-12 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-headline">Trust & Privacy</div>
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
              Privacy Is Non-Negotiable.
            </h1>
            <p className="text-xl text-muted-foreground">
              CognitiveInsight.AI uses a zero-knowledge-style architecture to enforce tamper-evident integrity (Merkle proofs) and access-controlled metadata checkpoints, with no plaintext exposure during training or inference. Privacy and security aren't just features — they're core innovations.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x450.png"
              width={600}
              height={450}
              alt="Data Security"
              data-ai-hint="data privacy security"
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted py-12 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Our Commitment to Secure Governance</h2>
            <p className="text-lg text-muted-foreground">
                Every compliance receipt is sealed with AES-GCM encryption and linked through a zero-knowledge architecture. Your data never leaves your control.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {trustPillars.map((pillar) => (
                <Card key={pillar.title}>
                    <CardHeader className="items-center text-center">
                        <div className="rounded-full bg-primary p-4 text-primary-foreground">
                            <pillar.icon className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline pt-4">{pillar.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-center">{pillar.description}</p>
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
