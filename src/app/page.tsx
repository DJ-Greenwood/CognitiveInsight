import {
  HeroSection,
// ValueAtGlance, 
  HowInsightWorks,
 // These are going to be moved to other sections of this site, maybe reworked ?
 // WhereItHelps,
 // InsightVsMLTooling,
 // StandardsAlignment,
 // InteractiveDemoPreview, may need to redo this page after patent outcome for now leave it out.
 // PilotProgramCTA,
  ComingSoon,
 // InteractiveDemoPreview
 

} from '@/components';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">


      <main className="flex-1">
        <ComingSoon />
        <HeroSection />
        
        <HowInsightWorks /> 
      </main>
    </div>
  );
}
