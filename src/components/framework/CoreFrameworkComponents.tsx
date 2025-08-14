import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, KeyRound, Receipt, BookCheck } from 'lucide-react';

const coreComponents = [
  {
    icon: Database,
    title: 'Data Anchors',
    description: 'Immutable cryptographic fingerprints that verify the integrity and origin of records across their lifecycle. Establish trusted foundations for all downstream operations.',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    icon: KeyRound,
    title: 'Anchor Keys',
    description: 'Secure, on-demand cryptographic keys for verification without persistent storage. Enable proof validation anytime, without managing complex key infrastructure.',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400'
  },
  {
    icon: Receipt,
    title: 'Compliance Receipts',
    description: 'Digitally signed records that provide independent proof of actions, decisions, or transactions. Generate audit evidence without exposing sensitive data.',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400'
  },
  {
    icon: BookCheck,
    title: 'Audit Trail Integration',
    description: 'Seamless incorporation into existing workflows, providing verifiable history without performance bottlenecks. Maintain governance without disrupting operations.',
    bgColor: 'bg-amber-100 dark:bg-amber-900/20',
    iconColor: 'text-amber-600 dark:text-amber-400'
  }
];

export function CoreFrameworkComponents() {
  return (
    <div className="py-20">
      <div className="text-center mb-16">
        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
          Core Framework Components
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Four foundational elements that enable verifiable governance without compromising performance or privacy.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {coreComponents.map((component) => (
          <Card key={component.title} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className={`w-16 h-16 mx-auto mb-4 ${component.bgColor} rounded-2xl flex items-center justify-center`}>
                <component.icon className={`w-8 h-8 ${component.iconColor}`} />
              </div>
              <CardTitle className="text-xl">{component.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {component.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
