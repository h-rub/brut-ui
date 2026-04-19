export function Footer() {
  return (
    <footer className="bg-ink text-cream py-10">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="display text-3xl font-bold">
            Brut UI<span className="text-cobalt">.</span>
          </div>
          <div className="mono text-[10px] uppercase tracking-widest text-cream/60 mt-1">
            // design system · v0.1 · 2026 · por hever rubio
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://heverrubiomarin.com"
            className="border-2 border-cream bg-transparent text-cream px-4 py-2 mono text-[10px] uppercase tracking-widest font-bold hover:bg-cobalt hover:border-cobalt transition-colors"
          >
            ← portfolio
          </a>
          <a
            href="mailto:hever.rubio@ksms.mx"
            className="border-2 border-cream bg-cream text-ink px-4 py-2 mono text-[10px] uppercase tracking-widest font-bold hover:bg-lime hover:border-lime transition-colors"
          >
            say hi
          </a>
        </div>
      </div>
    </footer>
  );
}
