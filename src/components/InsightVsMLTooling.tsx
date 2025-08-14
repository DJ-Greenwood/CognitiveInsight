import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

export function InsightVsMLTooling() {
  return (
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
  );
}
