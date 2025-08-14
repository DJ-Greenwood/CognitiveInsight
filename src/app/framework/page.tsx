import {
  FrameworkHeroSection,
  CoreFrameworkComponents,
  WhyInsightMatters,
  RegulatoryAlignmentMap,

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

        <WhitePaperAccess />
        <ComingSoonDashboard />
        <FrameworkCTA />
      </div>
    </div>
  );
}
