
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, Shield, Database, CheckCircle, Timer, Receipt } from 'lucide-react';

interface HowThisCameAboutProps {
    className?: string;
}

const operationalOutcomes = [
  {
    icon: TrendingDown,
    title: '90% Storage Reduction',
    description: 'Verifiable receipts instead of raw logs',
    metric: '90% less storage'
  },
  {
    icon: Timer,
    title: '1000x Faster Registration',
    description: 'Lazy proof generation on-demand',
    metric: '1000x speed improvement'
  },
  {
    icon: Receipt,
    title: 'Instant Audit Preparation',
    description: 'Generate compliance reports in seconds',
    metric: 'Sub-second audits'
  }
];

const complianceOutcomes = [
  {
    icon: Shield,
    title: 'AI/ML Model Lineage',
    description: 'Track datasets, training, and inference paths',
    metric: 'Complete traceability'
  },
  {
    icon: Database,
    title: 'AI/ML Pipeline Transparency',
    description: 'Verify transformations and processing steps',
    metric: 'End-to-end visibility'
  },
  {
    icon: CheckCircle,
    title: 'Regulatory Compliance',
    description: 'Meet AI governance and audit requirements',
    metric: 'Audit-ready proofs'
  }
];

export function HowThisCameAbout({ className = '' }: HowThisCameAboutProps) {

    return (
            <div className="max-w-6xl mx-auto">
                {/* Origin Story */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8">
                        <div className="space-y-6 text-lg text-blue-900 dark:text-blue-100 leading-relaxed">
                            <p>
                                We originally built the Insight™ framework to track AI/ML pipelines and ensure clear lineage for all pipeline components.
                            </p>
                            
                            <p>
                                In practice, we discovered a powerful side effect: by generating verifiable receipts instead of storing every raw log, the system dramatically reduced storage requirements and accelerated audit preparation.
                            </p>
                            
                            <p className="font-semibold">
                                What began as a transparency tool for AI builders has become a breakthrough in both operational efficiency and regulatory compliance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    );
};
