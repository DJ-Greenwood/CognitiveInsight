'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Shield, Users, DollarSign, Zap } from 'lucide-react';

const valueProps = [
  {
    icon: DollarSign,
    title: 'Cost Reduction',
    metric: '90%',
    description: 'Lower storage and compliance costs through selective, on-demand auditing',
    color: 'text-green-600'
  },
  {
    icon: Zap,
    title: 'Performance Boost',
    metric: '1000x',
    description: 'Faster data registration compared to traditional eager logging approaches',
    color: 'text-blue-600'
  },
  {
    icon: Shield,
    title: 'Regulatory Ready',
    metric: '99.9%',
    description: 'Tamper-evident proofs designed to exceed audit expectations',
    color: 'text-purple-600'
  }
];

const targetAudiences = [
  { role: 'Compliance Officers', benefit: 'Automated audit trails with cryptographic integrity' },
  { role: 'CTOs & Engineering Leaders', benefit: 'Scalable architecture handling 100M+ events' },
  { role: 'Procurement Teams', benefit: 'Significant cost savings on storage and compute resources' }
];

export function ValueAtGlance() {
  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 dark:from-sky-950/20 dark:via-blue-950/20 dark:to-sky-900/20">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-sky-200 text-sky-700 dark:border-sky-800 dark:text-sky-300">
            <TrendingUp className="w-4 h-4 mr-2" />
            Value at a Glance
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-sky-900 dark:text-sky-100">
            Business Impact in Numbers
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-sky-800 dark:text-sky-200 mt-4">
            Proven results from internal testing — ready for real-world validation with pilot partners
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 max-w-5xl mx-auto mb-16">
          {valueProps.map((prop) => (
            <Card key={prop.title} className="text-center border-sky-200 dark:border-sky-800 bg-white/80 dark:bg-sky-950/40 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="mx-auto w-fit rounded-full bg-sky-100 dark:bg-sky-900 p-4">
                  <prop.icon className={`h-8 w-8 ${prop.color}`} />
                </div>
                <div className={`text-4xl font-bold ${prop.color} mt-2`}>
                  {prop.metric}
                </div>
                <CardTitle className="font-headline text-xl text-sky-900 dark:text-sky-100">
                  {prop.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sky-700 dark:text-sky-300 text-sm leading-relaxed">
                  {prop.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Target Audience */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-headline text-sky-900 dark:text-sky-100 mb-3">
              Built for Decision Makers
            </h3>
            <p className="text-sky-700 dark:text-sky-300">
              Insight™ delivers measurable value across key stakeholder groups
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {targetAudiences.map((audience, index) => (
              <div key={index} className="bg-white/60 dark:bg-sky-950/30 rounded-lg p-6 border border-sky-200 dark:border-sky-800">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-sky-600 dark:text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sky-900 dark:text-sky-100 mb-1">
                      {audience.role}
                    </h4>
                    <p className="text-sm text-sky-700 dark:text-sky-300 leading-relaxed">
                      {audience.benefit}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-8">
          <p className="text-xs text-sky-600 dark:text-sky-400 max-w-2xl mx-auto">
            * Metrics based on internal benchmarks and simulations. Actual results may vary depending on implementation, data volume, and regulatory requirements. Currently seeking pilot partners for real-world validation.
          </p>
        </div>
      </div>
    </section>
  );
}
