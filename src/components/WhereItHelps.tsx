import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, DollarSign, Shield } from 'lucide-react';

const helpExamples = [
  {
    icon: Heart,
    industry: 'Healthcare',
    label: 'simulation',
    result: 'HIPAA prep cut from 6 months → 2 weeks; zero patient-data exposure to auditors.',
    color: 'from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20'
  },
  {
    icon: DollarSign,
    industry: 'Finance',
    label: 'simulation',
    result: 'Storage $50K→$7.5K/mo; queries 45s→<2s during SEC audits.',
    color: 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20'
  },
  {
    icon: Shield,
    industry: 'Defense',
    label: 'simulation',
    result: 'Zero-knowledge proofs preserve classification while achieving full audit coverage.',
    color: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20'
  }
];

export function WhereItHelps() {
  return (
    <section className="w-full py-16 md:py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            Where It Helps (examples)
          </h2>
        </div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {helpExamples.map((example) => (
            <Card key={example.industry} className={`overflow-hidden bg-gradient-to-br ${example.color} border-0`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-white dark:bg-gray-900 shadow-md">
                    <example.icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{example.industry}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {example.label}
                      </Badge>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {example.result}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            Simulations based on controlled tests; seeking pilot partners for real-world validation.
          </p>
        </div>
      </div>
    </section>
  );
}
