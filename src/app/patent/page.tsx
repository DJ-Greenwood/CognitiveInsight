import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const patentCapabilities = [
  {
    capability: 'Lazy Capsule Materialization',
    claim: '✅ Claim 1, 3, 7',
    description: 'Capsules are created only when an audit is triggered, saving runtime and storage.'
  },
  {
    capability: 'Hierarchical Key Derivation',
    claim: '✅ Claim 1, 3',
    description: 'Secure per-dataset and per-session encryption using PBKDF2-HMAC-SHA256 and HMAC-SHA256.'
  },
  {
    capability: 'Merkle Tree Anchoring',
    claim: '✅ Claim 1, 8',
    description: 'Tamper-evident integrity proofs across datasets using lightweight hash roots.'
  },
  {
    capability: 'Client-Side Audit Verification',
    claim: '✅ Claim 5, 6',
    description: 'Exportable capsules allow external third parties to verify without needing internal access.'
  },
  {
    capability: 'Cryptographically Indexed Metadata',
    claim: '✅ Claim 2, 9, 10',
    description: 'Track lifecycle checkpoints (training, retraining, inference) using hash-chained metadata.'
  },
  {
    capability: 'Compliance-Ready Architecture',
    claim: '✅ Claim 2, A.6',
    description: 'Aligns with EU AI Act, NIST AI RMF, HIPAA, SOC 2, GDPR, and more.'
  },
];

export default function PatentPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-4">
           <div className="flex justify-center">
             <div className="rounded-full bg-primary p-3 text-primary-foreground">
                <Shield className="h-8 w-8" />
             </div>
           </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Patent-Pending Technology
          </h1>
          <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
            CognitiveInsight.AI is now powered by a patent-backed system that sets a new industry standard for AI auditability, security, and compliance — without compromising performance.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Key Capabilities Enabled by the Patent</CardTitle>
            <CardDescription>
              Our non-provisional patent application protects the core innovations that make CIAF a uniquely verifiable and secure AI governance framework.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Capability</TableHead>
                  <TableHead>Enabled by Patent</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patentCapabilities.map((item) => (
                  <TableRow key={item.capability}>
                    <TableCell className="font-medium">{item.capability}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.claim}</Badge>
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-muted">
            <CardHeader>
                <CardTitle className="font-headline">What This Means For You</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold">Unprecedented Auditability</h4>
                        <p className="text-sm text-muted-foreground">Satisfy regulators with cryptographically verifiable proof of every action in your AI lifecycle.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold">Performance Without Compromise</h4>
                        <p className="text-sm text-muted-foreground">Our "Lazy Capsule Materialization" provides robust security with up to 2.67x faster audit speeds.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold">Reduced Compliance Overhead</h4>
                        <p className="text-sm text-muted-foreground">Automate evidence collection and reporting for frameworks like the EU AI Act, NIST AI RMF, and HIPAA.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold">Enhanced Security & Privacy</h4>
                        <p className="text-sm text-muted-foreground">Our zero-knowledge-style architecture ensures that your proprietary models and sensitive data are never exposed.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
