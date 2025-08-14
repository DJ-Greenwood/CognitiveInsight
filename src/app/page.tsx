import {
  HeroSection,
  ValueAtGlanceSimple,
  HowInsightWorks,
  WhereItHelps,
  InsightVsMLTooling,
  StandardsAlignment,
  InteractiveDemoPreview,
  PilotProgramCTA
} from '@/components';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">


      <main className="flex-1">
        <HeroSection />
        <ValueAtGlanceSimple />
        <HowInsightWorks />
        <InteractiveDemoPreview />
        <WhereItHelps />
        <InsightVsMLTooling />
        <StandardsAlignment />
        <PilotProgramCTA />
      </main>
    </div>
  );
}
