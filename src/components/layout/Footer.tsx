import { Scale, FileText } from 'lucide-react';
import { PatentNotice  } from '../PatentNotice';

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-32 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Scale className="hidden h-6 w-6 md:block text-primary" />
          <div className="text-center md:text-left">
            <p className="text-sm leading-loose">
              <strong>Insight™</strong> - Turn Confusion to Clarity
            </p>
            <PatentNotice  />
          </div>
        </div>
        <div className="text-center text-sm md:text-right">
          <p>© {new Date().getFullYear()} CognitiveInsight AI. All Rights Reserved.</p>
          <p className="text-xs text-muted-foreground/80 mt-1">
            Patent applications filed under U.S. Patent Law
          </p>
        </div>
      </div>
    </footer>
  );
}
