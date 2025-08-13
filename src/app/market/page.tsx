import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  TrendingUp, 
  DollarSign, 
  Heart, 
  Building, 
  Shield, 
  Activity, 
  Factory, 
  Calculator,
  Users,
  Handshake,
  Target,
  Lightbulb,
  Mail,
  Phone,
  FileText,
  Briefcase,
  Rocket
} from 'lucide-react';

const industryTAM = [
  {
    icon: Heart,
    title: 'Healthcare Compliance Technology',
    tam: '$6.5B',
    growth: '~11% CAGR',
    description: 'Healthcare compliance technology market by 2030 (from ~$3.5B in 2024)',
    keyDrivers: ['HIPAA enforcement intensification', 'EHR data integrity requirements', 'Automated audit tool adoption']
  },
  {
    icon: DollarSign,
    title: 'Financial Services RegTech',
    tam: '$45B',
    growth: '~18% CAGR',
    description: 'Financial services regulatory technology market by 2030',
    keyDrivers: ['Escalating AML/KYC requirements', 'SOX compliance automation', 'Real-time reporting mandates']
  },
  {
    icon: Shield,
    title: 'Government & Defense Cybersecurity',
    tam: '$138B',
    growth: '~13% CAGR',
    description: 'Government and defense cybersecurity market by 2030',
    keyDrivers: ['Zero-trust architecture mandates', 'State-sponsored threat response', 'Critical system protection']
  },
  {
    icon: Building,
    title: 'AI Governance & Model Risk Management',
    tam: '$1.4B',
    growth: '>30% CAGR',
    description: 'Rapidly emerging AI governance market by 2030',
    keyDrivers: ['EU AI Act compliance requirements', 'NIST AI Risk Management Framework', 'Model transparency mandates']
  },
  {
    icon: Factory,
    title: 'Critical Infrastructure OT Security',
    tam: '$60B',
    growth: '~18% CAGR',
    description: 'Operational technology security market by 2030',
    keyDrivers: ['NERC-CIP compliance standards', 'ICS/SCADA system protection', 'Industrial control security']
  },
  {
    icon: Activity,
    title: 'IoT & Edge Device Security',
    tam: '$142B',
    growth: '~27% CAGR',
    description: 'IoT and edge device security market by 2030',
    keyDrivers: ['Connected device proliferation', 'New security regulations', 'Edge computing compliance']
  }
];

const roiExamples = [
  {
    title: 'Large Healthcare System',
    scenario: 'Hospital network with 500TB/year audit logs',
    traditional: {
      storage: '$250,000/year',
      retrieval: '$180,000/year',
      compliance: '$320,000/year',
      total: '$750,000/year'
    },
    withInsight: {
      storage: '$25,000/year (90% reduction)',
      retrieval: '$18,000/year (90% reduction)',
      compliance: '$64,000/year (80% reduction)',
      total: '$107,000/year'
    },
    savings: '$643,000/year',
    payback: '4.2 months'
  },
  {
    title: 'Mid-Size Financial Institution',
    scenario: 'Regional bank with 200TB/year transaction logs',
    traditional: {
      storage: '$120,000/year',
      retrieval: '$95,000/year',
      compliance: '$450,000/year',
      total: '$665,000/year'
    },
    withInsight: {
      storage: '$12,000/year (90% reduction)',
      retrieval: '$9,500/year (90% reduction)',
      compliance: '$90,000/year (80% reduction)',
      total: '$111,500/year'
    },
    savings: '$553,500/year',
    payback: '3.8 months'
  },
  {
    title: 'Manufacturing Enterprise',
    scenario: 'Industrial facility with 1.2PB/year sensor data',
    traditional: {
      storage: '$720,000/year',
      retrieval: '$280,000/year',
      compliance: '$190,000/year',
      total: '$1,190,000/year'
    },
    withInsight: {
      storage: '$72,000/year (90% reduction)',
      retrieval: '$28,000/year (90% reduction)',
      compliance: '$38,000/year (80% reduction)',
      total: '$138,000/year'
    },
    savings: '$1,052,000/year',
    payback: '2.1 months'
  }
];

const partnershipTiers = [
  {
    title: 'Pilot Partner',
    icon: Target,
    description: 'Run Insight™ in a live, regulated environment',
    benefits: [
      'Early access to patent-pending technology',
      'Co-development opportunities',
      'Preferential pricing and terms',
      'Joint case study development',
      'Direct influence on product roadmap'
    ],
    commitment: 'Deploy pilot in production environment within 6 months',
    contact: 'pilot-partners@cognitiveinsight.ai',
    cta: 'Apply for Pilot Program'
  },
  {
    title: 'Strategic Investor',
    icon: TrendingUp,
    description: 'Fund development and scale market entry',
    benefits: [
      'Access to growing compliance technology market',
      'Patent portfolio investment opportunity',
      'Board representation opportunities',
      'Revenue sharing agreements',
      'Exit strategy participation'
    ],
    commitment: 'Minimum $500K investment with 24-month commitment',
    contact: 'investors@cognitiveinsight.ai',
    cta: 'Request Investment Package'
  },
  {
    title: 'Expert Advisor',
    icon: Lightbulb,
    description: 'Provide industry expertise and strategic guidance',
    benefits: [
      'Equity compensation packages',
      'Industry recognition and thought leadership',
      'Access to cutting-edge compliance research',
      'Networking with other industry experts',
      'Speaking opportunities at conferences'
    ],
    commitment: '4-8 hours monthly advisory commitment',
    contact: 'advisors@cognitiveinsight.ai',
    cta: 'Join Advisory Board'
  },
  {
    title: 'Integration Partner',
    icon: Handshake,
    description: 'Integrate Insight™ with existing platforms',
    benefits: [
      'Technical partnership agreements',
      'Revenue sharing opportunities',
      'Joint go-to-market strategies',
      'Co-branded solution development',
      'Priority technical support'
    ],
    commitment: 'Technical integration within 12 months',
    contact: 'partnerships@cognitiveinsight.ai',
    cta: 'Explore Integration'
  }
];

export default function MarketPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-lg py-2 px-4 rounded-full">
            <TrendingUp className="w-4 h-4 mr-2" />
            Market Opportunity (Conservative Outlook)
          </Badge>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
            A $250B+ Global Market
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            The global compliance technology and security market for regulated industries is projected to exceed $250 billion by 2030, 
            based on independent market research from multiple reputable sources.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 max-w-3xl mx-auto">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Market Data Sources:</strong> Market analysis conducted using ChatGPT 5 Deep Research, 
                synthesizing data from Grand View Research, Mordor Intelligence, and MarketsandMarkets (2023–2025), 
                normalized to reflect only relevant compliance, audit, and security spend — excluding unrelated IT, 
                analytics, or general-purpose software markets.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/Data_Source_Transparency_for_Insight™_Market_Sizing.pdf" target="_blank" className="inline-flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Download Full Research Report
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Total Addressable Market */}
        <div className="mb-20">
          <h2 className="font-headline text-3xl font-bold mb-8 text-center">
            Total Addressable Market by Industry
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industryTAM.map((industry) => (
              <Card key={industry.title} className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <industry.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {industry.growth}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{industry.title}</CardTitle>
                  <div className="text-3xl font-bold text-primary mb-2">{industry.tam}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{industry.description}</p>
                  <div>
                    <p className="text-sm font-medium mb-2">Key Market Drivers:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {industry.keyDrivers.map((driver, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{driver}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2 text-green-900 dark:text-green-100">
                Insight™ Mission-Critical Market Niches: $250B
              </h3>
              <p className="text-green-800 dark:text-green-200 mb-3">
                Within the broader $250B+ global compliance technology market, Insight™ focuses on high-growth, 
                mission-critical niches where compliance, auditability, and data integrity are essential.
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                Average growth rate exceeds 17% CAGR across target sectors, driven by intensifying regulatory requirements 
                and the critical need for verifiable audit trails.
              </p>
            </div>
          </div>
        </div>

        {/* Strategic Market Positioning */}
        <div className="mb-20">
          <h2 className="font-headline text-3xl font-bold mb-8 text-center">
            Strategic Market Positioning
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Mission-Critical Niches Within the $250B+ Global Market
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Rather than competing in the broader compliance technology market, Insight™ focuses on specific, 
                high-value niches where traditional solutions fail to meet the unique requirements of regulated industries. 
                These sectors demand:
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Critical Requirements
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Cryptographically verifiable audit trails</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Privacy-preserving compliance validation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>On-demand proof generation capabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Regulatory-grade immutable evidence</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Growth Drivers
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Escalating regulatory complexity (EU AI Act, CISA mandates)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>AI transparency and explainability requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Zero-trust architecture implementations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Critical infrastructure protection mandates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Calculations */}
        <div className="mb-20">
          <h2 className="font-headline text-3xl font-bold mb-8 text-center">
            ROI Examples: Real-World Cost Savings
          </h2>
          <div className="space-y-8">
            {roiExamples.map((example, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Calculator className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle className="text-xl">{example.title}</CardTitle>
                      <p className="text-muted-foreground">{example.scenario}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Traditional Approach */}
                    <div>
                      <h4 className="font-semibold mb-4 text-red-600 flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        Traditional Approach
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Storage Costs:</span>
                          <span className="font-medium">{example.traditional.storage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Data Retrieval:</span>
                          <span className="font-medium">{example.traditional.retrieval}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Compliance Management:</span>
                          <span className="font-medium">{example.traditional.compliance}</span>
                        </div>
                        <div className="border-t pt-2 mt-3">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total Annual Cost:</span>
                            <span className="text-red-600">{example.traditional.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* With Insight™ */}
                    <div>
                      <h4 className="font-semibold mb-4 text-green-600 flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        With Insight™
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Storage Costs:</span>
                          <span className="font-medium">{example.withInsight.storage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Data Retrieval:</span>
                          <span className="font-medium">{example.withInsight.retrieval}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Compliance Management:</span>
                          <span className="font-medium">{example.withInsight.compliance}</span>
                        </div>
                        <div className="border-t pt-2 mt-3">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total Annual Cost:</span>
                            <span className="text-green-600">{example.withInsight.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Savings Summary */}
                  <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-4">
                    <div className="grid md:grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{example.savings}</div>
                        <div className="text-sm text-muted-foreground">Annual Savings</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{example.payback}</div>
                        <div className="text-sm text-muted-foreground">Payback Period</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnership Opportunities */}
        <div className="mb-20">
          <h2 className="font-headline text-3xl font-bold mb-8 text-center">
            Partnership Opportunities
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            Join us in revolutionizing compliance technology. We offer differentiated partnership tiers 
            designed to match your organization's goals and capabilities.
          </p>
          
          <div className="grid gap-8 md:grid-cols-2">
            {partnershipTiers.map((tier, index) => (
              <Card key={index} className="h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <tier.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{tier.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{tier.description}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Partnership Benefits:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6 bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-sm">Commitment Level:</h4>
                    <p className="text-sm text-muted-foreground">{tier.commitment}</p>
                  </div>
                  
                  <div className="mt-auto space-y-3">
                    <Button className="w-full" asChild>
                      <Link href={`/contact?interest=${tier.title.toLowerCase().replace(' ', '-')}`}>
                        {tier.cta}
                      </Link>
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Direct contact: {tier.contact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white rounded-2xl p-12">
            <Rocket className="w-16 h-16 mx-auto mb-6 text-blue-300" />
            <h2 className="font-headline text-3xl font-bold mb-4">
              Ready to Join the Compliance Revolution?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              The market opportunity is massive, the technology is patent-pending, and the time is now. 
              Let's build the future of audit and compliance together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact?interest=partnership" className="inline-flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Explore Partnership
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/contact?interest=investor-package" className="inline-flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Request Investor Package
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
