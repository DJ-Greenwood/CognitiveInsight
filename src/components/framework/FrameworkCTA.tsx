import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, Users } from 'lucide-react';

export function FrameworkCTA() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="absolute inset-0 bg-dots-pattern opacity-20"></div>
      
      <div className="relative py-20 px-8 text-center">
        <h2 className="font-headline text-4xl font-bold mb-6">
          Bring Insight™ to Your Organization
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          Transform your compliance and governance challenges into competitive advantages with 
          patent-pending cryptographic audit technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90" asChild>
            <Link href="/demo">
              <Play className="w-5 h-5 mr-2" />
              Request a Demo
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
            <Link href="/contact?interest=partnership">
              <Users className="w-5 h-5 mr-2" />
              Partner With Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
