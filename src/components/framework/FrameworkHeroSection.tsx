import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Download } from 'lucide-react';

export function FrameworkHeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-sky-900 via-blue-800 to-sky-700">
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Abstract Background Visualization */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative container py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center text-white">
          <Badge variant="secondary" className="mb-6 bg-sky-100 text-sky-900 border-sky-200">
            <Shield className="w-4 h-4 mr-2" />
            Patent-Pending Technology
          </Badge>
          
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Cognitive Insight™ Framework
          </h1>
          
          <p className="text-xl md:text-2xl text-sky-100 mb-4 max-w-3xl mx-auto">
            Governance and verification through cryptographic integrity and on-demand audit trails.
          </p>
          
          <p className="text-lg text-sky-200/80 mb-12 max-w-2xl mx-auto">
            Patent-pending technology for verifiable trust and streamlined compliance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90" asChild>
              <Link href="/contact?interest=technical-overview">
                <FileText className="w-5 h-5 mr-2" />
                Request Technical Overview
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/contact?interest=executive-summary">
                <Download className="w-5 h-5 mr-2" />
                Download Executive Summary
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
