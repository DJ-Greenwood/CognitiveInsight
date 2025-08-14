'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  TrendingUp, Shield, Users, DollarSign, Zap, ClipboardCheck, FileText, Lock, Scale
} from 'lucide-react';
import { HowThisCameAbout } from './HowThisCameAbout';

type Metric = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  metric: string;
  description: string;
  color: string;
};

const valuePropsOps: Metric[] = [
  {
    icon: DollarSign,
    title: 'Cost Reduction',
    metric: '90%',
    description: 'Lower storage & ops via selective, on-demand auditing',
    color: 'text-green-600',
  },
  {
    icon: Zap,
    title: 'Performance Boost',
    metric: '1000×',
    description: 'Faster registration vs. eager logging; less ingestion overhead',
    color: 'text-blue-600',
  },
  {
    icon: Shield,
    title: 'Tamper Evidence',
    metric: '99.9%',
    description: 'Cryptographic integrity on every receipt/proof',
    color: 'text-purple-600',
  },
];

const valuePropsCompliance: Metric[] = [
  {
    icon: ClipboardCheck,
    title: 'Evidence Completeness',
    metric: '95–100%',
    description: 'Traceability across data → model → inference with capsule proofs',
    color: 'text-emerald-600',
  },
  {
    icon: FileText,
    title: 'Audit Prep Time',
    metric: '↓ 80–95%',
    description: 'Auto-generated, regulator-ready reports with selective disclosure',
    color: 'text-sky-600',
  },
  {
    icon: Lock,
    title: 'PII Exposure',
    metric: '↓ 90%+',
    description: 'Zero-knowledge style workflows minimize raw-data, and proprietary data exposure',
    color: 'text-rose-600',
  },
];

const targetAudiences = [
  { role: 'Compliance Officers', benefit: 'Automated, verifiable audit trails that reduce raw-data exposure and simplify regulator reviews.”' },
  { role: 'CTOs & Eng Leaders', benefit: 'Scale to 100M+ events with sub-second verification' },
  { role: 'Procurement Teams', benefit: 'Clear ROI from storage, ops, and audit time reductions' },
];

export function ValueAtGlance() {
  const [mode, setMode] = useState<'ops' | 'AI/ML Compliance'>('ops');

  const metrics = mode === 'ops' ? valuePropsOps : valuePropsCompliance;

  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 dark:from-sky-950/20 dark:via-blue-950/20 dark:to-sky-900/20">
      <div className="container px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <Badge variant="outline" className="mb-4 border-sky-200 text-sky-700 dark:border-sky-800 dark:text-sky-300">
            <TrendingUp className="w-4 h-4 mr-2" />
            Value at a Glance
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-sky-900 dark:text-sky-100">
            Business & Compliance Impact
          </h2>
          <HowThisCameAbout />
          <p className="max-w-3xl mx-auto text-lg text-sky-800 dark:text-sky-200 mt-4">
            Switch between operational savings and AI/ML compliance outcomes.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl border border-sky-200 dark:border-sky-800 bg-white/70 dark:bg-sky-950/40 backdrop-blur-sm p-1">
            <Button
              variant={mode === 'ops' ? 'default' : 'ghost'}
              className={`rounded-lg px-4 ${mode === 'ops' ? '' : 'hover:bg-transparent'}`}
              aria-pressed={mode === 'ops'}
              onClick={() => setMode('ops')}
            >
              Operations
            </Button>
            <Button
              variant={mode === 'AI/ML Compliance' ? 'default' : 'ghost'}
              className={`rounded-lg px-4 ${mode === 'AI/ML Compliance' ? '' : 'hover:bg-transparent'}`}
              aria-pressed={mode === 'AI/ML Compliance'}
              onClick={() => setMode('AI/ML Compliance')}
            >
              AI/ML Compliance
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 max-w-5xl mx-auto mb-12">
          {metrics.map((prop) => (
            <Card
              key={prop.title}
              className="text-center border-sky-200 dark:border-sky-800 bg-white/80 dark:bg-sky-950/40 backdrop-blur-sm"
            >
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

        {/* Compliance Outcomes micro-grid (shown for both, highlights why compliance matters) */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-white/70 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Scale className="w-5 h-5 text-sky-600 dark:text-sky-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sky-900 dark:text-sky-100 mb-1">
                      Regulator-Ready
                    </h4>
                    <p className="text-sm text-sky-700 dark:text-sky-300">
                      One-click, signed audit packets mapped to internal controls and policies.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-sky-600 dark:text-sky-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sky-900 dark:text-sky-100 mb-1">
                      Scope Control
                    </h4>
                    <p className="text-sm text-sky-700 dark:text-sky-300">
                      Selective disclosure keeps sensitive features/PII off the table by default.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-sky-600 dark:text-sky-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sky-900 dark:text-sky-100 mb-1">
                      Traceable Decisions
                    </h4>
                    <p className="text-sm text-sky-700 dark:text-sky-300">
                      Link data → training → model → inference receipts for explainability & disputes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
              <div
                key={index}
                className="bg-white/60 dark:bg-sky-950/30 rounded-lg p-6 border border-sky-200 dark:border-sky-800"
              >
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
            * Metrics based on internal benchmarks & simulations. Actual results vary by workload, controls, and regulatory scope. Seeking pilot partners for real-world validation.
          </p>
        </div>
      </div>
    </section>
  );
}
