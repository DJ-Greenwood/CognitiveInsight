import { Scale } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Scale className="hidden h-6 w-6 md:block text-primary" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{' '}
            <a
              href="https://github.com/Denzil-Greenwood"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Denzil J. Greenwood
            </a>
            . Verifiable AI Governance for a Transparent Future.
          </p>
        </div>
        <p className="text-center text-sm md:text-left">
          © {new Date().getFullYear()} CognitiveInsight.AI. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
