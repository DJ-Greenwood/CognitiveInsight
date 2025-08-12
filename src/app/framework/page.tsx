import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  KeyRound, 
  Receipt, 
  BookCheck, 
  Shield, 
  Zap, 
  CheckCircle, 
  FileText, 
  Download,
  Monitor,
  Users,
  Play,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

export default function FrameworkPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Abstract Background Visualization */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative container py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center text-white">
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20">
              <Shield className="w-4 h-4 mr-2" />
              Patent-Pending Technology
            </Badge>
            
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Insight™ Framework
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto">
              Governance and verification through cryptographic integrity and on-demand audit trails.
            </p>
            
            <p className="text-lg text-blue-200/80 mb-12 max-w-2xl mx-auto">
              Patent-pending technology for verifiable trust and streamlined compliance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90" asChild>
                <Link href="/contact?interest=technical-overview">
                  <FileText className="w-5 h-5 mr-2" />
                  Request Technical Overview
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/contact?interest=executive-summary">
                  <Download className="w-5 h-5 mr-2" />
                  Download Executive Summary
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-20">
        {/* Feature Highlights Section */}
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
            Core Framework Components
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four foundational elements that enable verifiable governance without compromising performance or privacy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
                <Database className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-xl">Data Anchors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Immutable cryptographic fingerprints that verify the integrity and origin of records across their lifecycle. 
                Establish trusted foundations for all downstream operations.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center">
                <KeyRound className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-xl">Anchor Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Secure, on-demand cryptographic keys that can be regenerated when needed — no key storage, no overhead. Proof you can verify anytime, without managing complex key systems.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center">
                <Receipt className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl">Compliance Receipts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Digitally signed records that provide independent proof of actions, decisions, or transactions. 
                Generate audit evidence without exposing sensitive data.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center">
                <BookCheck className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <CardTitle className="text-xl">Audit Trail Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Seamless incorporation into existing workflows, providing verifiable history without performance bottlenecks. 
                Maintain governance without disrupting operations.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Value Proposition Strip */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 mb-20">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative py-16 px-8">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">
                Why Insight™ Matters
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center text-white">
              <div>
                <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Trust</h3>
                <p className="text-blue-100 leading-relaxed">
                  Independently verifiable integrity for any record or process. Build confidence through cryptographic proof.
                </p>
              </div>
              
              <div>
                <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Efficiency</h3>
                <p className="text-blue-100 leading-relaxed">
                  On-demand proofs reduce storage and processing by 90%+. Scale verification without infrastructure costs.
                </p>
              </div>
              
              <div>
                <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Compliance</h3>
                <p className="text-blue-100 leading-relaxed">
                  Easily meet verification and reporting requirements across multiple regulatory frameworks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Alignment Map */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold mb-6">
              Insight™ Regulatory Alignment Map
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              No proprietary methods disclosed — capability-based mapping showing how Insight™ addresses key regulatory requirements across industries.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
                      Regulation / Standard
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
                      Relevant Requirement
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
                      Insight™ Capability That Addresses It
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-medium text-blue-600 dark:text-blue-400">HIPAA (Healthcare)</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      Ensure integrity and confidentiality of patient data (45 CFR §164.312)
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-200">
                      Cryptographic proof capsules & selective proof generation ensure data integrity while avoiding exposure of PHI.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-medium text-green-600 dark:text-green-400">GDPR (EU)</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      Article 5(1)(f) – Integrity & confidentiality
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-200">
                      Immutable, verifiable audit proofs without storing sensitive raw data.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-medium text-purple-600 dark:text-purple-400">SEC / FINRA (Finance)</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      SEC Rule 17a-4 – Retention of records in non-rewriteable, non-erasable format
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-200">
                      Blockchain anchoring & tamper-evident proof storage meet WORM-equivalent requirements.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">SOX (Sarbanes–Oxley)</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      Section 404 – Internal controls for financial reporting
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-200">
                      Independent, cryptographically verifiable evidence for financial event logs.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-medium text-red-600 dark:text-red-400">CISA Cybersecurity Regulations</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      Incident logging & response integrity
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-200">
                      Selective high-fidelity logging with independent verification for incident reports.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-medium text-orange-600 dark:text-orange-400">NIST AI RMF</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      Govern – Transparency & accountability
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-200">
                      Explainable proof trails for AI model inferences without revealing sensitive internals.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-medium text-teal-600 dark:text-teal-400">EU AI Act</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      High-risk AI – Record keeping & traceability
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-200">
                      Immutable, verifiable model decision records on demand.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-medium text-cyan-600 dark:text-cyan-400">ISO 27001</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      A.12.4 – Event logging
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-200">
                      Configurable selective logging with verifiable proof records.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-medium text-pink-600 dark:text-pink-400">PCI-DSS</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      10.2 – Audit trails for all access to cardholder data
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-200">
                      Cryptographic audit capsules ensure verifiable logs without exposing PII.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              This mapping demonstrates conceptual alignment with regulatory requirements. Specific implementation details 
              and compliance validation processes are available through our professional services team.
            </p>
          </div>
        </div>

        {/* Patent Disclaimer */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-8 mb-20">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-900 dark:text-amber-200 mb-3">
                Patent-Pending Notice
              </h3>
              <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                Insight™ Framework is protected under active U.S. patent applications. Certain technical details are 
                intentionally omitted from this site to preserve intellectual property. Contact us for high-level 
                summaries or executive briefings.
              </p>
            </div>
          </div>
        </div>

        {/* White Paper Access */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="font-headline text-3xl font-bold mb-4">
              White Paper (Patent Pending)
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Full technical documentation is temporarily unavailable while patents are under review. 
              Our comprehensive technical documentation provides detailed insights into the Insight™ Framework's 
              architecture, implementation patterns, and integration strategies.
            </p>
            <p className="text-muted-foreground mb-8">
              Contact us for an executive summary that covers the framework's core concepts, 
              business benefits, and deployment considerations without revealing proprietary implementation details.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact?interest=white-paper">
                <FileText className="w-5 h-5 mr-2" />
                Request Technical Information
              </Link>
            </Button>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border-2 border-dashed border-slate-300 dark:border-slate-600">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-slate-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center">
                  <FileText className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
                  Technical Documentation
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Available upon request during patent review
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon - Dashboard Mockup */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <Monitor className="w-8 h-8 text-primary" />
            <h2 className="font-headline text-3xl font-bold">Coming Soon – Dashboard Mockup</h2>
          </div>
          <p className="text-muted-foreground text-lg mb-12 max-w-3xl mx-auto">
            Preview of the Insight™ Dashboard — a visual interface for monitoring verification results, 
            proof capsule statuses, and compliance metrics. Real-time visibility into your organization's 
            cryptographic audit trails and governance status.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-16 border-2 border-dashed border-slate-300 dark:border-slate-600 min-h-96 flex flex-col items-center justify-center">
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-2xl font-semibold text-slate-600 dark:text-slate-300 mb-3">
                Interactive Dashboard Preview
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md text-center">
                Comprehensive monitoring and management interface for Insight™ Framework deployments
              </p>
              <div className="grid grid-cols-3 gap-6 text-sm text-slate-400">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                  <span>Verification Status</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <span>Proof Capsules</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                    <BookCheck className="w-6 h-6" />
                  </div>
                  <span>Compliance Metrics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call-to-Action Footer */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
          <div className="absolute inset-0 bg-dots-pattern opacity-20"></div>
          
          <div className="relative py-20 px-8 text-center">
            <h2 className="font-headline text-4xl font-bold mb-6">
              Bring Insight™ to Your Organization
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Transform your compliance and governance challenges into competitive advantages with 
              patent-pending cryptographic audit technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90" asChild>
                <Link href="/demo">
                  <Play className="w-5 h-5 mr-2" />
                  Request a Demo
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/contact?interest=partnership">
                  <Users className="w-5 h-5 mr-2" />
                  Partner With Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
