import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Database, KeyRound, Receipt, BookCheck } from 'lucide-react';

const frameworkSections = [
  {
    value: 'item-1',
    title: 'Dataset Anchors',
    icon: Database,
    description: 'Establish cryptographic provenance for your training data. Create immutable fingerprints that verify data integrity and origin throughout the AI lifecycle, providing a trusted foundation for all downstream AI operations.',
  },
  {
    value: 'item-2',
    title: 'Model Anchor Keys (MAKs)',
    icon: KeyRound,
    description: 'Secure model authorization and versioning. Each AI model receives a unique cryptographic identity that links it to validated training data and operational parameters, ensuring only authorized models are deployed in production.',
  },
  {
    value: 'item-3',
    title: 'Compliance Receipts',
    icon: Receipt,
    description: 'Generate privacy-preserving audit evidence. Produce tamper-evident summaries of model decisions, confidence levels, and compliance status without exposing sensitive data or proprietary model details.',
  },
  {
    value: 'item-4',
    title: 'Audit Trail Integration',
    icon: BookCheck,
    description: 'Maintain comprehensive governance records. Automatically log all system changes, model updates, and compliance actions in an immutable audit trail designed for regulatory review and transparency.',
  },
];

export default function FrameworkPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center space-y-4">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Cryptographically Integrated AI Framework (CIAF)
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Enterprise-grade AI governance through cryptographic integrity and automated audit trails.
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
                  White Paper - Patent Pending
                </CardTitle>
                <CardDescription>
                  Technical documentation temporarily unavailable due to patent filing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Our comprehensive CIAF white paper is currently restricted while patent applications are under review. Contact us for executive summaries and high-level technical overviews.
                </p>
                <Button className="w-full" variant="outline" asChild>
                  <a href="/contact">Request Technical Information</a>
                </Button>
              </CardContent>
            </Card>

            <div className="text-center">
               <div className="bg-muted/30 rounded-lg shadow-lg border-2 border-dashed border-muted-foreground/20 p-12 max-w-lg mx-auto">
                 <div className="flex flex-col items-center justify-center h-64">
                   <div className="text-4xl mb-3">📊</div>
                   <h3 className="text-xl font-semibold text-muted-foreground mb-1">Coming Soon</h3>
                   <p className="text-sm text-muted-foreground text-center">Compliance Dashboard Mockup</p>
                 </div>
               </div>
              <p className="text-sm text-muted-foreground mt-2">A preview of CIAF&apos;s integrated audit trail visualization.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
