export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-1 flex justify-center items-start">
            <div className="bg-muted/30 rounded-full aspect-square shadow-lg border-2 border-dashed border-muted-foreground/20 p-8 w-80 h-80 flex flex-col items-center justify-center">
              <div className="text-6xl mb-4">👨‍💼</div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-1">Coming Soon</h3>
              <p className="text-sm text-muted-foreground text-center">Professional Photo</p>
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                About the Founder
              </h1>
              <p className="mt-4 text-xl font-semibold text-primary">
                Denzil J. Greenwood, MS Data Science (in progress)
              </p>
              <p className="mt-1 text-lg text-muted-foreground">
                AI Governance Innovator, Creator of the CIAF Framework
              </p>
            </div>
            <div className="space-y-4 text-lg text-foreground/80">
              <p>
                Denzil is a passionate data scientist and AI governance specialist dedicated to bridging the gap between technological innovation and regulatory necessity. With a foundation in rigorous data science and a focus on applied cryptography, he developed the Cryptographically Integrated AI Framework (CIAF) to address the critical need for verifiable trust in automated systems.
              </p>
              <p>
                His work is driven by the conviction that for AI to reach its full potential, its operations must be transparent, its decisions accountable, and its governance provable.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-muted p-8 rounded-lg">
          <h2 className="font-headline text-3xl font-bold text-center">Our Mission</h2>
          <blockquote className="mt-6 text-center text-2xl font-light italic text-foreground">
            “To build verifiable, privacy-first AI systems that empower regulators and practitioners to trust the intelligence shaping our world.”
          </blockquote>
        </div>
      </div>
    </div>
  );
}
