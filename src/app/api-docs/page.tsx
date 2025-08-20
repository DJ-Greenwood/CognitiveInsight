import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Code2, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ApiDocsPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Code2 className="w-4 h-4 mr-2" />
            API Documentation
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            API Documentation
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Comprehensive documentation for the Insight API endpoints and integration guides.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-2 border-dashed border-muted-foreground/20 bg-muted/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>API Reference</CardTitle>
                  <CardDescription>Detailed endpoint documentation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-32">
                <div className="text-3xl mb-2">📚</div>
                <p className="text-sm text-muted-foreground text-center">Coming Soon</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-dashed border-muted-foreground/20 bg-muted/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>Integration Guide</CardTitle>
                  <CardDescription>Step-by-step integration tutorials</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-32">
                <div className="text-3xl mb-2">🔧</div>
                <p className="text-sm text-muted-foreground text-center">Coming Soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Need immediate access to our API documentation?
          </p>
          <Button asChild>
            <Link href="/contact">Contact Our Technical Team</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
