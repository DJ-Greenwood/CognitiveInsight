import {
  FrameworkHeroSection,
  CoreFrameworkComponents,
  WhyInsightMatters,
  RegulatoryAlignmentMap,
  PatentDisclaimer,
  WhitePaperAccess,
  ComingSoonDashboard,
  FrameworkCTA
} from '@/components';

export default function FrameworkPage() {
  return (
    <div className="min-h-screen">
      <FrameworkHeroSection />
      
      <div className="container">
        <CoreFrameworkComponents />
        <WhyInsightMatters />
        <RegulatoryAlignmentMap />
        <PatentDisclaimer />
        <WhitePaperAccess />
        <ComingSoonDashboard />
        <FrameworkCTA />
      </div>
    </div>
  );
}
