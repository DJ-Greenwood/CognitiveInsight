import Link from 'next/link';
import { Scale, FileText } from 'lucide-react';
import { PatentNotice } from '@/components/PatentNotice';

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
                        <PatentNotice />
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                    <Link href="/contact">
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                            Request Early Access
                        </button>
                    </Link>
                    <Link href="/demo">
                        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors text-sm font-medium">
                            Launch Live Demo
                        </button>
                    </Link>
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
