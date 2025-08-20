import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Terminal, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ApiTesterPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Terminal className="w-4 h-4 mr-2" />
            API Testing Interface
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            API Tester
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Interactive testing interface for exploring Insight API endpoints and functionality.
          </p>
        </div>

        <div className="grid gap-8">
          <Card className="border-2 border-dashed border-muted-foreground/20 bg-muted/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Play className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>Interactive API Explorer</CardTitle>
                  <CardDescription>Test API endpoints with real-time responses</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-48">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">Coming Soon</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Interactive API testing interface with live endpoint exploration
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-fit rounded-md bg-blue-500/10 p-3">
                  <Terminal className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Dataset Anchoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Test dataset registration and anchoring endpoints
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-fit rounded-md bg-green-500/10 p-3">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">Model Inference</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Execute inference requests with compliance tracking
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-fit rounded-md bg-purple-500/10 p-3">
                  <Terminal className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Verify compliance receipts and audit trails
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Ready to start testing our APIs?
          </p>
          <Button asChild>
            <Link href="/contact">Request API Access</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
