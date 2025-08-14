'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  FileText, 
  Download,
  Shield,
  Clock,
  Target
} from 'lucide-react';
import Link from 'next/link';

const pilotBenefits = [
  {
    icon: Shield,
    title: 'Risk-Free Validation',
    description: 'Test Cognitive Insight™ in a controlled environment with full support and documentation'
  },
  {
    icon: Target,
    title: 'Custom Integration',
    description: 'Tailored implementation for your specific compliance requirements and existing systems'
  },
  {
    icon: Users,
    title: 'Direct Partnership',
    description: 'Work directly with me to shape the product roadmap and influence future development'
  }
];

const pilotRequirements = [
  'Regulated industry (healthcare, finance, defense, or critical infrastructure)',
  'Existing AI/ML pipelines requiring audit compliance',
  'Technical team available for integration and testing',
  'Commitment to 3-6 month pilot program duration'
];

export function PilotProgramCTA() {
  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-br from-sky-600 via-blue-600 to-sky-700 text-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-sky-100 text-sky-900 border-sky-200">
              <Rocket className="w-4 h-4 mr-2" />
              Limited Pilot Program
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mb-4">
              Apply for Early Access Pilot
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-sky-100 leading-relaxed">
              Join an exclusive group of forward-thinking organizations validating 
              Cognitive Insight™ in real-world regulated environments
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Benefits & Value */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 font-headline flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-sky-200" />
                  Pilot Program Benefits
                </h3>
                
                <div className="space-y-6">
                  {pilotBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 bg-sky-700/30 rounded-lg p-4 backdrop-blur-sm border border-sky-400/20">
                      <div className="p-2 rounded-full bg-sky-200/20">
                        <benefit.icon className="w-5 h-5 text-sky-200" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{benefit.title}</h4>
                        <p className="text-sky-100 text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Section */}
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-sky-400/20">
                <div className="flex items-start gap-4">
                  <FileText className="w-8 h-8 text-sky-200 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Investor & Partner Brief</h4>
                    <p className="text-sky-100 text-sm mb-4 leading-relaxed">
                      Download our comprehensive one-page overview covering market opportunity, 
                      technology differentiation, and partnership opportunities.
                    </p>
                    <Button variant="secondary" size="sm" asChild>
                      <Link href="/cognitive-insight-partner-brief.pdf" target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download Brief (PDF)
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Application Card */}
            <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-gray-900 dark:text-white border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-center">
                  Ready to Get Started?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Requirements */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-sky-600" />
                    Ideal Pilot Partners
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {pilotRequirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline */}
                <div className="bg-sky-50 dark:bg-sky-950/20 rounded-lg p-4 border border-sky-200 dark:border-sky-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-sky-600" />
                    <h4 className="font-semibold text-sky-900 dark:text-sky-100">Timeline</h4>
                  </div>
                  <div className="text-sm text-sky-800 dark:text-sky-200 space-y-1">
                    <p><strong>Application Review:</strong> 1-2 weeks</p>
                    <p><strong>Pilot Setup:</strong> 2-4 weeks</p>
                    <p><strong>Active Testing:</strong> 3-6 months</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button size="lg" className="w-full bg-sky-600 hover:bg-sky-700" asChild>
                    <Link href="/contact">
                      Apply for Pilot Program
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <Link href="/contact">
                      Schedule Discussion First
                    </Link>
                  </Button>
                </div>

                {/* Note */}
                <p className="text-xs text-muted-foreground text-center">
                  Limited to 5-8 pilot partners initially. Applications reviewed on a rolling basis.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-sky-100 mb-4 max-w-2xl mx-auto">
              Questions about the pilot program? Want to discuss your specific use case first?
            </p>
            <Button variant="outline" size="lg" className="border-sky-200 text-sky-100 hover:bg-sky-100 hover:text-sky-900" asChild>
              <Link href="/contact">
                Contact Me Directly
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
