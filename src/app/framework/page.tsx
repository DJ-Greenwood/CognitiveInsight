import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Database, KeyRound, Receipt, BookCheck } from 'lucide-react';
import Image from 'next/image';

const frameworkSections = [
  {
    value: 'item-1',
    title: 'Dataset Anchors',
    icon: Database,
    description: 'Prove integrity from the start. We create cryptographic fingerprints of your datasets, ensuring that the data used for training is exactly what you claim it is. This immutable record prevents unauthorized tampering and provides a verifiable foundation for your entire AI lifecycle.',
  },
  {
    value: 'item-2',
    title: 'Model Anchor Keys (MAKs)',
    icon: KeyRound,
    description: 'Authorize models for compliant use. Each model is issued a unique Model Anchor Key that links it to its approved training data and operational parameters. This ensures that only validated, compliant models are deployed, preventing the use of rogue or outdated versions.',
  },
  {
    value: 'item-3',
    title: 'Uncertainty Receipts',
    icon: Receipt,
    description: 'Disclose risk, not raw data. For every significant decision, the AI generates a privacy-preserving "Uncertainty Receipt." This receipt is a tamper-evident summary of the model\'s confidence, potential biases, and adherence to compliance rules, providing a clear audit trail without exposing proprietary information.',
  },
  {
    value: 'item-4',
    title: 'Corrective Action Logs',
    icon: BookCheck,
    description: 'Show transparency in remediation. When issues are detected and models are updated, the framework logs these changes in a secure, auditable manner. This demonstrates a commitment to continuous improvement and provides regulators with a clear history of governance actions.',
  },
];

export default function FrameworkPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center space-y-4">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            The Cryptographically Integrated AI Framework (CIAF)
          </h1>
          <p className="text-muted-foreground md:text-xl">
            A step-by-step look at how CIAF builds verifiable trust into every layer of your AI systems.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
              {frameworkSections.map((section) => (
                <AccordionItem key={section.value} value={section.value}>
                  <AccordionTrigger className="text-lg font-headline hover:no-underline">
                    <div className="flex items-center">
                      <section.icon className="mr-3 h-6 w-6 text-primary" />
                      {section.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pl-12">
                    {section.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center">
                  <FileText className="mr-2" />
                  Download White Paper
                </CardTitle>
                <CardDescription>
                  Get the complete technical overview of the CIAF.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Dive deep into the cryptographic protocols, data structures, and implementation guidelines.
                </p>
                <Button className="w-full" asChild>
                  <a href="/ciaf-whitepaper.pdf" download>Download CIAF White Paper (PDF)</a>
                </Button>
              </CardContent>
            </Card>

            <div className="text-center">
               <Image 
                src="https://placehold.co/600x400.png" 
                alt="Compliance Dashboard Mockup"
                data-ai-hint="dashboard compliance"
                width={600}
                height={400}
                className="mx-auto rounded-lg shadow-lg"
              />
              <p className="text-sm text-muted-foreground mt-2">A mockup of a CIAF compliance dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
