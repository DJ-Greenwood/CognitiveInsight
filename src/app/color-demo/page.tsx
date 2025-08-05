import { ColorSchemeSelector } from '@/components/ui/ColorSchemeSelector';

export default function ColorSchemePage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Color Scheme Demo
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Test different color schemes for CognitiveInsight.AI in real-time
          </p>
        </div>
        
        <ColorSchemeSelector />
        
        {/* Demo components to show the color changes */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-headline text-xl font-semibold mb-2">Sample Card</h3>
            <p className="text-muted-foreground mb-4">
              This card demonstrates how the color scheme affects different components.
            </p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Primary Button
            </button>
          </div>
          
          <div className="bg-accent text-accent-foreground rounded-lg p-6">
            <h3 className="font-headline text-xl font-semibold mb-2">Accent Card</h3>
            <p className="opacity-90 mb-4">
              This card uses the accent color to show the secondary brand color.
            </p>
            <button className="bg-accent-foreground text-accent px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
              Accent Button
            </button>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-6">
          <h3 className="font-headline text-xl font-semibold mb-4">Navigation Preview</h3>
          <nav className="flex gap-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#" className="text-primary font-medium">Framework</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </div>
  );
}
