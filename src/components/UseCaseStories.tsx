'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, DollarSign, Shield, ArrowRight, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const useCases = [
  {
    icon: Heart,
    industry: 'Healthcare',
    title: 'Regional Hospital System',
    challenge: 'HIPAA compliance audit required 6 months of preparation, 200+ staff hours, and exposed patient data to third-party auditors.',
    solution: 'Insight™ generates tamper-evident proofs on-demand without exposing sensitive patient information.',
    outcome: 'Audit preparation reduced from 6 months to 2 weeks. Zero patient data exposure to external auditors.',
    metrics: [
      { label: 'Preparation Time', before: '6 months', after: '2 weeks' },
      { label: 'Staff Hours', before: '200+', after: '< 20' },
      { label: 'Data Exposure', before: 'High Risk', after: 'Zero Risk' }
    ],
    status: 'Simulation Ready',
    color: 'from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20',
    iconColor: 'text-red-600'
  },
  {
    icon: DollarSign,
    industry: 'Financial Services',
    title: 'Investment Management Firm',
    challenge: 'SEC audit of AI trading algorithms required comprehensive transaction logs, creating massive storage costs and performance bottlenecks.',
    solution: 'Cryptographic anchoring of decision points with on-demand reconstruction of audit trails for specific time periods or transactions.',
    outcome: 'Storage costs reduced by 85%. Real-time trading performance maintained during audit periods.',
    metrics: [
      { label: 'Storage Costs', before: '$50K/month', after: '$7.5K/month' },
      { label: 'Query Performance', before: '45 seconds', after: '< 2 seconds' },
      { label: 'Audit Scope', before: 'Full dataset', after: 'Targeted proofs' }
    ],
    status: 'Pilot Ready',
    color: 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
    iconColor: 'text-green-600'
  },
  {
    icon: Shield,
    industry: 'Defense & Government',
    title: 'DoD AI/ML Pipelines',
    challenge: 'Classified AI models needed audit trails for security clearance reviews without compromising operational security or model architectures.',
    solution: 'Zero-knowledge proofs demonstrate model integrity and decision lineage while maintaining classification boundaries.',
    outcome: 'Full audit compliance achieved with zero classified information disclosure.',
    metrics: [
      { label: 'Security Clearance', before: 'At Risk', after: 'Maintained' },
      { label: 'Audit Coverage', before: '60%', after: '100%' },
      { label: 'Information Leakage', before: 'Potential', after: 'Impossible' }
    ],
    status: 'In Development',
    color: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
    iconColor: 'text-blue-600'
  }
];

export function UseCaseStories() {
  return (
    <section className="w-full py-16 md:py-20 bg-background">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <CheckCircle className="w-4 h-4 mr-2" />
            Real-World Scenarios
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            How Industries Use Insight™
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-4">
            See how different industries solve compliance challenges with cryptographic audit trails
          </p>
        </div>

        {/* Use Cases */}
        <div className="space-y-12 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <Card key={useCase.industry} className={`overflow-hidden bg-gradient-to-br ${useCase.color} border-0 shadow-lg`}>
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content Side */}
                <CardContent className="p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-full bg-white dark:bg-gray-900 shadow-md`}>
                      <useCase.icon className={`h-6 w-6 ${useCase.iconColor}`} />
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">{useCase.status}</Badge>
                      <h3 className="text-2xl font-bold font-headline">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground">{useCase.industry}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-red-700 dark:text-red-400 flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        The Challenge
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {useCase.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4" />
                        Insight™ Solution
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {useCase.solution}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-2 mb-2">
                        <ArrowRight className="w-4 h-4" />
                        The Outcome
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                        {useCase.outcome}
                      </p>
                    </div>

                    <Button asChild variant="outline" size="sm" className="w-fit">
                      <Link href="/demo" className="flex items-center gap-2">
                        See Demo <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>

                {/* Metrics Side */}
                <div className="bg-white/60 dark:bg-gray-900/60 p-8 lg:p-12 border-l border-white/40 dark:border-gray-700/40">
                  <h4 className="font-bold text-lg mb-6 font-headline">Impact Metrics</h4>
                  <div className="space-y-4">
                    {useCase.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 border border-white/60 dark:border-gray-700/60">
                        <div className="text-sm font-medium text-muted-foreground mb-2">
                          {metric.label}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-red-600 dark:text-red-400">
                            <span className="text-xs text-muted-foreground">Before: </span>
                            <span className="font-semibold">{metric.before}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground mx-2" />
                          <div className="text-green-600 dark:text-green-400">
                            <span className="text-xs text-muted-foreground">After: </span>
                            <span className="font-semibold">{metric.after}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-yellow-800 dark:text-yellow-200">
                        <strong>Simulation Status:</strong> Metrics based on controlled testing environments. 
                        Seeking pilot partners for real-world validation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Ready to see how Insight™ can transform your compliance process?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/demo">
                Try Interactive Demo
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Schedule Pilot Discussion
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
