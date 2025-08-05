import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Heart, Shield, TrendingUp, Users, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const useCases = [
  {
    id: 'financial-services',
    title: 'Financial Services',
    icon: TrendingUp,
    industry: 'FinTech',
    description: 'Fraud detection and risk assessment with regulatory compliance',
    challenges: [
      'PCI-DSS compliance requirements',
      'Real-time fraud detection accuracy',
      'Explainable AI for loan decisions',
      'Privacy-preserving analytics'
    ],
    solutions: [
      'Cryptographic audit trails for all transactions',
      'Uncertainty receipts for fraud scores',
      'Model anchor keys for authorized deployments',
      'GDPR-compliant data processing'
    ],
    outcomes: [
      '99.9% audit trail integrity',
      '40% reduction in compliance overhead',
      '25% improvement in fraud detection',
      'Full regulatory approval in 3 months'
    ],
    frameworks: ['PCI-DSS', 'SOX', 'GDPR', 'Basel III']
  },
  {
    id: 'healthcare',
    title: 'Healthcare AI',
    icon: Heart,
    industry: 'Healthcare',
    description: 'Medical diagnosis and treatment recommendation systems',
    challenges: [
      'HIPAA compliance and patient privacy',
      'Medical device regulation (FDA)',
      'Bias detection in diagnostic models',
      'Explainable medical decisions'
    ],
    solutions: [
      'Privacy-preserving uncertainty quantification',
      'Tamper-evident training data provenance',
      'Bias monitoring and correction logs',
      'FDA-ready documentation packages'
    ],
    outcomes: [
      '100% HIPAA compliance maintained',
      'FDA pre-submission approval',
      '60% faster regulatory review',
      '30% improvement in diagnostic accuracy'
    ],
    frameworks: ['HIPAA', 'FDA 21 CFR Part 820', 'ISO 13485', 'GDPR']
  },
  {
    id: 'autonomous-vehicles',
    title: 'Autonomous Vehicles',
    icon: Shield,
    industry: 'Automotive',
    description: 'Safety-critical AI systems for self-driving cars',
    challenges: [
      'Safety validation and certification',
      'Real-time decision accountability',
      'Sensor data integrity verification',
      'Regulatory approval across jurisdictions'
    ],
    solutions: [
      'Real-time uncertainty receipts for safety decisions',
      'Cryptographic sensor data validation',
      'Complete decision audit trails',
      'Multi-jurisdiction compliance framework'
    ],
    outcomes: [
      'ISO 26262 functional safety compliance',
      '99.99% safety decision traceability',
      '50% reduction in certification time',
      'Approved in EU, US, and Japan markets'
    ],
    frameworks: ['ISO 26262', 'UN-ECE WP.29', 'NHTSA', 'EU Type Approval']
  },
  {
    id: 'government',
    title: 'Government & Defense',
    icon: Building2,
    industry: 'Public Sector',
    description: 'National security and public service AI applications',
    challenges: [
      'Classification and security clearances',
      'Algorithmic accountability requirements',
      'Cross-agency data sharing protocols',
      'Public transparency mandates'
    ],
    solutions: [
      'Multi-level security classification support',
      'Zero-knowledge proof generation',
      'Inter-agency provenance tracking',
      'Public-facing transparency reports'
    ],
    outcomes: [
      'Authority to Operate (ATO) achieved',
      '100% algorithmic accountability',
      'Secure cross-agency deployment',
      'Public trust score increased by 45%'
    ],
    frameworks: ['NIST AI RMF', 'FedRAMP', 'FISMA', 'Section 508']
  }
];

const implementationSteps = [
  {
    phase: 'Assessment',
    duration: '2-4 weeks',
    activities: [
      'Current AI system audit',
      'Regulatory requirement analysis',
      'Risk assessment and gap analysis',
      'Implementation roadmap creation'
    ]
  },
  {
    phase: 'Integration',
    duration: '4-8 weeks',
    activities: [
      'CIAF framework installation',
      'Dataset anchor configuration',
      'Model integration and testing',
      'Compliance workflow setup'
    ]
  },
  {
    phase: 'Validation',
    duration: '2-6 weeks',
    activities: [
      'End-to-end testing',
      'Regulatory documentation preparation',
      'Audit trail verification',
      'Performance optimization'
    ]
  },
  {
    phase: 'Deployment',
    duration: '1-2 weeks',
    activities: [
      'Production environment setup',
      'Monitoring and alerting configuration',
      'Team training and handover',
      'Go-live support'
    ]
  }
];

export default function UseCasesPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Real-World Use Cases
          </h1>
          <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
            See how organizations across industries use CIAF to achieve AI governance and regulatory compliance
          </p>
        </div>

        {/* Use Cases */}
        <Tabs defaultValue="financial-services" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {useCases.map((useCase) => (
              <TabsTrigger key={useCase.id} value={useCase.id} className="flex items-center gap-2">
                <useCase.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{useCase.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {useCases.map((useCase) => (
            <TabsContent key={useCase.id} value={useCase.id}>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                          <useCase.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="font-headline">{useCase.title}</CardTitle>
                          <CardDescription>{useCase.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-headline text-lg flex items-center">
                          <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                          Key Challenges
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {useCase.challenges.map((challenge, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="font-headline text-lg flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                          CIAF Solutions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {useCase.solutions.map((solution, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500 flex-shrink-0" />
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-green-50 dark:bg-green-950">
                    <CardHeader>
                      <CardTitle className="font-headline text-lg text-green-800 dark:text-green-200">
                        Measured Outcomes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {useCase.outcomes.map((outcome, index) => (
                          <div key={index} className="flex items-center text-sm text-green-700 dark:text-green-300">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            {outcome}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline text-lg">Compliance Frameworks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {useCase.frameworks.map((framework) => (
                          <Badge key={framework} variant="outline">
                            {framework}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline text-lg">Industry</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="text-base">
                        {useCase.industry}
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline text-lg">Implementation Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {implementationSteps.map((step, index) => (
                        <div key={step.phase} className="border-l-2 border-primary pl-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm">{step.phase}</h4>
                            <Badge variant="outline" className="text-xs">
                              {step.duration}
                            </Badge>
                          </div>
                          <ul className="mt-1 space-y-1">
                            {step.activities.slice(0, 2).map((activity, actIndex) => (
                              <li key={actIndex} className="text-xs text-muted-foreground">
                                • {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action */}
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl">Ready to Implement CIAF?</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Get started with a compliance assessment and implementation roadmap
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="flex justify-center gap-4">
              <Button variant="secondary" size="lg">
                Schedule Assessment
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Download Implementation Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
