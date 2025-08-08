'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Scale, Shield } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { label: 'Framework', href: '/framework' },
  { label: 'Demo', href: '/demo' },
  { label: 'Compliance', href: '/compliance' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Services', href: '/services' },
  { label: 'Trust & Privacy', href: '/trust' },
  { label: 'Thought Library', href: '/library' },
  { label: 'Regulatory Insights', href: '/regulatory-insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Patent', href: '/patent', icon: Shield, highlighted: true },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              CognitiveInsight.AI
            </span>
          </Link>
          <nav className="flex items-center space-x-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-primary flex items-center',
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground',
                  item.highlighted && 'text-primary font-bold'
                )}
              >
                {item.icon && <item.icon className="mr-1 h-4 w-4" />}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <Link
                  href="/"
                  className="mb-6 flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Scale className="mr-2 h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">CognitiveInsight.AI</span>
                </Link>
                <div className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'p-2 rounded-md transition-colors hover:text-primary flex items-center',
                        pathname === item.href ? 'bg-muted font-medium text-primary' : 'text-muted-foreground',
                        item.highlighted && 'text-primary font-bold bg-primary/10'
                      )}
                    >
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <Scale className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">CognitiveInsight.AI</span>
          </Link>

          <nav className="flex items-center">
            <Button asChild>
              <Link href="/contact">Request a Demo</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
