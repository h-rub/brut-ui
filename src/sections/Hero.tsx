export function Hero() {
  return (
    <section id="top" className="py-16 md:py-24 border-b-2 border-ink">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="mono text-[10px] uppercase tracking-[0.3em] text-smoke flex items-center gap-3 mb-6">
          <span className="w-6 h-[2px] bg-cobalt" />
          <span>// design system · v0.1 · 2026</span>
        </div>
        <h1 className="display text-[14vw] md:text-[9vw] font-bold leading-[0.88]">
          Brut <span className="italic-serif font-normal text-cobalt">UI</span>
          <span className="text-cobalt">.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl leading-[1.5]">
          Sistema de diseño brutalista-editorial con guiños de terminal.
          Estructura expuesta, tipografía disciplinada y paleta mínima.
          Construido para el portfolio de{" "}
          <a
            href="https://heverrubiomarin.com"
            className="underline decoration-cobalt decoration-2 underline-offset-4 hover:text-cobalt"
          >
            Hever Rubio
          </a>
          .
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#pillars"
            className="inline-flex items-center gap-2 border-2 border-ink bg-ink text-cream px-5 py-3 mono text-[11px] uppercase tracking-widest font-bold shadow-brut hover:bg-accent hover:border-ink hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
          >
            explorar sistema
          </a>
          <a
            href="#tokens"
            className="inline-flex items-center gap-2 border-2 border-ink bg-transparent text-ink px-5 py-3 mono text-[11px] uppercase tracking-widest font-bold shadow-brut hover:bg-lime hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
          >
            ver tokens
          </a>
        </div>
      </div>
    </section>
  );
}
