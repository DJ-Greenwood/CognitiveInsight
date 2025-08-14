export function StandardsAlignment() {
  return (
    <section className="w-full py-8 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Aligned with</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <span>NIST AI RMF</span>
            <span>•</span>
            <span>HIPAA</span>
            <span>•</span>
            <span>SEC 17a-4</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Alignment, not certification
          </p>
        </div>
      </div>
    </section>
  );
}
