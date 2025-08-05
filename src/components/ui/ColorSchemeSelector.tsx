'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';

type ColorScheme = {
  name: string;
  description: string;
  primary: string;
  accent: string;
  heroGradient: string;
};

const colorSchemes: ColorScheme[] = [
  {
    name: 'Sky Blue (Current)',
    description: 'Light professional sky blue with teal',
    primary: '200 100% 60%',
    accent: '168 76% 40%',
    heroGradient: '200 60% 25%',
  },
  {
    name: 'Soft Corporate Blue',
    description: 'Gentle corporate blue with golden yellow',
    primary: '210 80% 55%',
    accent: '45 100% 60%',
    heroGradient: '210 45% 20%',
  },
  {
    name: 'Light Ocean Blue',
    description: 'Fresh ocean blue with orange accent',
    primary: '195 85% 65%',
    accent: '25 95% 53%',
    heroGradient: '195 50% 22%',
  },
  {
    name: 'Powder Blue',
    description: 'Very light powder blue with pink accent',
    primary: '185 60% 70%',
    accent: '340 75% 55%',
    heroGradient: '185 40% 25%',
  },
  {
    name: 'Original Corporate',
    description: 'Professional dark blue with emerald green',
    primary: '214 53% 21%',
    accent: '168 76% 27%',
    heroGradient: '220 44% 18%',
  },
  {
    name: 'Modern Purple',
    description: 'Vibrant purple with modern teal',
    primary: '262 83% 58%',
    accent: '142 76% 36%',
    heroGradient: '260 40% 20%',
  },
];

export function ColorSchemeSelector() {
  const [currentScheme, setCurrentScheme] = useState(0);

  const applyColorScheme = (scheme: ColorScheme) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', scheme.primary);
    root.style.setProperty('--accent', scheme.accent);
    root.style.setProperty('--hero-gradient-middle', scheme.heroGradient);
    
    // Update ring colors to match primary
    root.style.setProperty('--ring', scheme.primary);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-primary p-3">
            <Palette className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="font-headline">Color Scheme Selector</CardTitle>
        <CardDescription>
          Choose a color scheme to instantly update the website theme
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {colorSchemes.map((scheme, index) => (
            <Button
              key={scheme.name}
              variant={currentScheme === index ? "default" : "outline"}
              className="flex items-center justify-between p-4 h-auto"
              onClick={() => {
                setCurrentScheme(index);
                applyColorScheme(scheme);
              }}
            >
              <div className="text-left">
                <div className="font-semibold">{scheme.name}</div>
                <div className="text-sm opacity-70">{scheme.description}</div>
              </div>
              <div className="flex gap-2 ml-4">
                <div
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: `hsl(${scheme.primary})` }}
                />
                <div
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: `hsl(${scheme.accent})` }}
                />
              </div>
            </Button>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Current Colors:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Primary: <code className="bg-background px-2 py-1 rounded">{colorSchemes[currentScheme].primary}</code></div>
            <div>Accent: <code className="bg-background px-2 py-1 rounded">{colorSchemes[currentScheme].accent}</code></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
