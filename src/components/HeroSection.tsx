import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';


export function HeroSection() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 bg-gradient-to-br from-sky-900 via-blue-800 to-sky-700">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-sky-900/20 to-transparent"></div>
      
      <div className="container px-4 md:px-6 text-center text-white relative z-10">
        <div className="space-y-6">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Turn Confusion into Clarity
          </h1>
          <p className="mx-auto max-w-[800px] text-lg md:text-xl text-sky-100">
            A patent-pending audit layer for AI/ML Pipelines that issues verifiable, tamper-evident receipts on demand—without logging everything.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild variant="secondary" className="bg-sky-100 text-sky-900 hover:bg-sky-200">
            <Link href="/contact">Request Early Access</Link>
          </Button>
          <Button
            size="lg"
            asChild
            variant="outline"
            className="bg-transparent border-sky-200 text-sky-100 hover:bg-sky-100 hover:text-sky-900"
          >
            <Link href="/demo">Launch Live Demo</Link>
          </Button>
        </div>

        {/* Human-led, AI-assisted disclosure */}
        <div className="mt-8 mx-auto max-w-[800px]">
          <div className="inline-flex items-start gap-2 text-left rounded-md border border-sky-300/20 bg-sky-100/10 px-3 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 mt-0.5 text-sky-300" />
            <p className="text-xs md:text-sm text-sky-100">
              <strong>Human-led, AI-assisted:</strong> I use AI to accelerate research and drafts; all final decisions and outputs are mine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
