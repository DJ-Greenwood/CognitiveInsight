import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export function WhitePaperAccess() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
      <div>
        <h2 className="font-headline text-3xl font-bold mb-4">
          White Paper (Patent Pending)
        </h2>
        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
          Full technical documentation is temporarily unavailable while patents are under review. 
          Our comprehensive technical documentation provides detailed insights into the Insight™ Framework's 
          architecture, implementation patterns, and integration strategies.
        </p>
        <p className="text-muted-foreground mb-8">
          Contact us for an executive summary that covers the framework's core concepts, 
          business benefits, and deployment considerations without revealing proprietary implementation details.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact?interest=white-paper">
            <FileText className="w-5 h-5 mr-2" />
            Request Technical Information
          </Link>
        </Button>
      </div>
      <div className="relative">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border-2 border-dashed border-slate-300 dark:border-slate-600">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-slate-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center">
              <FileText className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
              Technical Documentation
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Available upon request during patent review
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
