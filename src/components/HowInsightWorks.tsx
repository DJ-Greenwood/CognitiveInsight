import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, Layers, Activity, Timer } from 'lucide-react';

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

export function HowInsightWorks() {
  return (
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
  );
}
