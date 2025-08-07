'use client';

import { useState } from 'react';
import { summarizeRegulatoryDocument, type SummarizeRegulatoryDocumentOutput } from '@/ai/flows/regulatory-insight-tool';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Wand2, AlertTriangle, Lightbulb, BadgeCheck, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RegulatoryInsightToolPage() {
  const [documentText, setDocumentText] = useState('');
  const [result, setResult] = useState<SummarizeRegulatoryDocumentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentText.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please paste some document text to summarize.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const summaryResult = await summarizeRegulatoryDocument({ documentText });
      setResult(summaryResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        title: 'Summarization Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center space-y-4">
          <Wand2 className="mx-auto h-12 w-12 text-primary" />
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Regulatory Insight Tool
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Paste in text from a regulatory document to get a concise summary of its key implications for AI governance and compliance.
          </p>
        </div>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="font-headline">Input Document</CardTitle>
            <CardDescription>
              Copy and paste the regulatory text into the field below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="e.g., 'Article 10 of the AI Act states that...'"
                className="min-h-[200px] text-base"
                value={documentText}
                onChange={(e) => setDocumentText(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Wand2 className="mr-2 h-4 w-4 animate-pulse" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Insight
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-8">
            {isLoading && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <Lightbulb className="animate-pulse" />
                            Generating Summary...
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                </Card>
            )}

            {error && (
                <Card className="bg-destructive/10 border-destructive">
                    <CardHeader>
                        <CardTitle className="font-headline text-destructive flex items-center gap-2">
                           <AlertTriangle />
                            An Error Occurred
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{error}</p>
                    </CardContent>
                </Card>
            )}

            {result && (
                <Card className="bg-accent/10 border-accent">
                    <CardHeader>
                        <CardTitle className="font-headline text-accent-foreground flex items-center gap-2">
                           <Lightbulb className="text-accent" />
                           Key Implications Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap text-foreground/90">{result.summary}</p>
                    </CardContent>
                </Card>
            )}
        </div>
        
        <Card className="mt-8 bg-muted">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <BadgeCheck />
                    Compliant by Design
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Every analysis provided by our regulatory insights tool is backed by a system that aligns with:</p>
                <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-primary" />EU AI Act (Title IV)</li>
                    <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-primary" />NIST AI RMF</li>
                    <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-primary" />HIPAA / SOC 2</li>
                    <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-primary" />GDPR / CCPA</li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">See how our cryptographic methods ensure verifiability without exposing underlying data.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
