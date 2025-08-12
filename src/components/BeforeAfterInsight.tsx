'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Database, FileCheck, Shield, Workflow } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BeforeAfterInsight() {
  const [view, setView] = useState<'summary' | 'details'>('summary');

  return (
    <section className="space-y-10">
      {/* Title */}
      <div className="text-center space-y-3">
        <Badge variant="secondary">Before vs After</Badge>
        <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
          From “Store Everything” to “Prove What Matters”
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Insight™ replaces blanket log retention with selective, verifiable proof capsules—preserving compliance while cutting risk and cost.
        </p>
      </div>

      {/* KPI Strip */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-red-200 bg-red-50/60">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">Traditional SIEM</span>
            </div>
            <div className="mt-4 grid gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Storage Footprint</span>
                <span className="font-mono">100%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Audit Prep Time</span>
                <span className="font-mono">Hours → Days</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Exposure Surface</span>
                <span className="font-mono">High</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <Workflow className="h-5 w-5" />
              <span className="font-semibold">Shift in Approach</span>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Move from eager, full-data storage to on-demand, selective proofs that are independently verifiable.
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/60">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">With Insight™</span>
            </div>
            <div className="mt-4 grid gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Storage Footprint</span>
                <span className="font-mono">~10–20%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Audit Prep Time</span>
                <span className="font-mono">Seconds → Minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Exposure Surface</span>
                <span className="font-mono">Low</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Core Comparison */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-red-200 bg-red-50/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <Database className="h-5 w-5" />
              Traditional SIEM Model
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label="Capture" value="Ingest & store all raw logs indefinitely" bad />
            <Row label="Filtering" value="Applied later during search; storage unchanged" />
            <Row label="Audit Evidence" value="Reconstruct from raw data exports & manual queries" bad />
            <Row label="Verification" value="Trust based on access to original data sets" />
            <Row label="Risk" value="Large sensitive data lake; access sprawl" bad />
            <Row label="Cost" value="High storage + egress + indexing" bad />
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Shield className="h-5 w-5" />
              Insight™ Proof Capsule Model
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label="Capture" value="Stream logs; retain only selected, policy-relevant events" good />
            <Row label="Filtering" value="Applied up front; reduces what must be retained" good />
            <Row label="Audit Evidence" value="On-demand, cryptographically verifiable capsules" good />
            <Row label="Verification" value="Independent integrity checks—no raw data exposure" good />
            <Row label="Risk" value="Minimal retained data; smaller blast radius" good />
            <Row label="Cost" value="~80–90% storage reduction; faster audits" good />
          </CardContent>
        </Card>
      </div>

      {/* Role-based quick hits */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">For SecOps</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <Bullet>Keep using your SIEM; Insight™ layers on top.</Bullet>
            <Bullet>Capture only incidents matching policy filters.</Bullet>
            <Bullet>Generate verifiable incident capsules on demand.</Bullet>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">For Compliance</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <Bullet>Proofs without raw log access or exports.</Bullet>
            <Bullet>Consistent, tamper-evident evidence packages.</Bullet>
            <Bullet>Traceable receipts and verification reports.</Bullet>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">For Security Leaders</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <Bullet>Reduce data retention surface area & liability.</Bullet>
            <Bullet>Cut storage & audit prep costs materially.</Bullet>
            <Bullet>Demonstrate provable governance to regulators.</Bullet>
          </CardContent>
        </Card>
      </div>

      {/* Toggle-able details */}
      <div className="text-center">
        <Button variant="outline" onClick={() => setView(v => (v === 'summary' ? 'details' : 'summary'))}>
          {view === 'summary' ? 'Show Technical Flow' : 'Hide Technical Flow'}
        </Button>
      </div>

      {view === 'details' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Minimal Disclosure, Maximum Verifiability
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              Insight™ creates a compact, verifiable capsule that references selected events and includes integrity
              data required for independent verification—without revealing raw log content. Public details are abstracted to
              protect patent claims.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Selective scope:</strong> Events included only if they match active policy filters.</li>
              <li><strong>Independent checks:</strong> Verifiers confirm integrity and scope without raw data.</li>
              <li><strong>Anchor options:</strong> Private trust store by default; external anchoring optional.</li>
            </ul>
            <p className="text-xs mt-2">
              <em>Patent-pending. Implementation details intentionally abstracted in UI and docs.</em>
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

function Row({
  label,
  value,
  good,
  bad,
}: {
  label: string;
  value: string;
  good?: boolean;
  bad?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="text-muted-foreground">{label}</div>
      <div
        className={cn(
          'text-right',
          good && 'text-green-700',
          bad && 'text-red-700'
        )}
      >
        {value}
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
      <span>{children}</span>
    </div>
  );
}
