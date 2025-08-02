import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, CalendarClock, Beaker, ShieldCheck } from 'lucide-react';

const services = [
  {
    icon: Lightbulb,
    title: 'Clarity Sessions',
    description: 'One-on-one deep dives into your AI compliance challenges. We\'ll analyze your current systems, identify governance gaps, and map out a clear path to implementing verifiable trust.',
  },
  {
    icon: CalendarClock,
    title: 'Monthly Retainers',
    description: 'Ongoing support for regulatory alignment and governance. Get continuous access to our expertise, proactive monitoring, and guidance as new regulations emerge.',
  },
  {
    icon: Beaker,
    title: 'Research Projects',
    description: 'Custom studies on AI risk, compliance, and trust frameworks. We help you explore novel challenges, develop bespoke solutions, and stay ahead of the curve in AI governance.',
  },
  {
    icon: ShieldCheck,
    title: 'Audit Demonstrations',
    description: 'Live CIAF simulations proving audit readiness. We walk you through a mock audit, demonstrating how to use CIAF-generated receipts to satisfy regulator inquiries with confidence.',
  },
];

export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Our Services</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Expert guidance to implement and maintain verifiable AI governance.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-1 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary text-primary-foreground rounded-full p-3">
                    <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="font-headline text-2xl font-bold">Ready to build trust into your AI?</h2>
        <p className="mt-2 text-muted-foreground">
          Let's discuss how CognitiveInsight.AI can help you achieve your governance goals.
        </p>
        <Button size="lg" className="mt-6" asChild>
          <Link href="/contact">Book a Consultation</Link>
        </Button>
      </div>
    </div>
  );
}
