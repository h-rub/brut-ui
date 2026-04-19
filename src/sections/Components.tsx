import { SectionHeader } from "../components/SectionHeader";
import { ArrowRight, Terminal } from "lucide-react";

function Demo({
  title,
  code,
  children,
}: {
  title: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <article className="border-2 border-ink bg-paper shadow-brut">
      <div className="border-b-2 border-ink bg-ink text-cream px-4 py-2 flex items-center justify-between">
        <span className="mono text-[10px] uppercase tracking-widest font-bold">
          {title}
        </span>
        <span className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="w-2 h-2 rounded-full bg-lime" />
          <span className="w-2 h-2 rounded-full bg-cobalt" />
        </span>
      </div>
      <div className="p-6 md:p-10 grid place-items-center min-h-[180px]">
        {children}
      </div>
      <div className="border-t-2 border-ink bg-cream/60 px-4 py-2 mono text-[10px] uppercase tracking-widest text-smoke truncate">
        {code}
      </div>
    </article>
  );
}

export function Components() {
  return (
    <section id="components" className="py-16 md:py-24 border-b-2 border-ink">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <SectionHeader
          number="03"
          title="Components"
          path="~/brut-ui/components.tsx"
        />

        <h2 className="display text-4xl md:text-6xl font-bold mt-10 leading-[0.95] max-w-3xl">
          Patrones canónicos,
          <br />
          <span className="italic-serif font-normal">todos composables.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buttons */}
          <Demo
            title="./btn-brut"
            code={`border-2 border-ink bg-ink text-cream shadow-brut · hover → accent`}
          >
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <button className="inline-flex items-center gap-2 border-2 border-ink bg-ink text-cream px-5 py-3 mono text-[11px] uppercase tracking-widest font-bold shadow-brut hover:bg-accent hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                ejecutar <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button className="inline-flex items-center gap-2 border-2 border-ink bg-transparent text-ink px-5 py-3 mono text-[11px] uppercase tracking-widest font-bold shadow-brut hover:bg-lime hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                ghost
              </button>
            </div>
          </Demo>

          {/* Chip / Tag */}
          <Demo
            title="./chip.tsx"
            code={`border px-3 py-1 mono uppercase tracking-widest`}
          >
            <div className="flex flex-wrap gap-2 items-center justify-center">
              <span className="border-2 border-ink bg-cream px-3 py-1.5 mono text-[10px] uppercase tracking-widest">
                default
              </span>
              <span className="border-2 border-ink bg-cobalt text-cream px-3 py-1.5 mono text-[10px] uppercase tracking-widest font-bold">
                cobalt
              </span>
              <span className="border-2 border-ink bg-lime px-3 py-1.5 mono text-[10px] uppercase tracking-widest font-bold">
                lime
              </span>
              <span className="border-2 border-ink bg-accent text-cream px-3 py-1.5 mono text-[10px] uppercase tracking-widest font-bold">
                accent
              </span>
            </div>
          </Demo>

          {/* Pull quote */}
          <Demo
            title="./pull-quote.tsx"
            code={`border-l-4 border-cobalt + italic-serif`}
          >
            <div className="border-l-4 border-cobalt pl-6 max-w-md">
              <p className="italic-serif text-2xl md:text-3xl leading-snug">
                "El código enseña disciplina; los mercados enseñan humildad."
              </p>
              <p className="mono text-[10px] uppercase tracking-widest text-smoke mt-3">
                — H.R
              </p>
            </div>
          </Demo>

          {/* Drop cap */}
          <Demo
            title="./drop-cap.tsx"
            code={`float-left + display text-[6rem] + text-cobalt`}
          >
            <div className="max-w-md text-[15px] leading-[1.65]">
              <span className="display text-[5rem] font-bold leading-none float-left mr-2 mt-1 text-cobalt">
                B
              </span>
              rutalist typography está diseñada para sostener bloques grandes
              de texto sin perder ritmo. El drop cap marca el inicio y da
              textura editorial.
            </div>
          </Demo>

          {/* Section header */}
          <Demo
            title="./section-header.tsx"
            code={`§NN + display + ~/path.md`}
          >
            <div className="w-full max-w-xl">
              <div className="border-b-2 border-ink pb-3 flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                    §07
                  </span>
                  <span className="display text-xl font-bold tracking-tight">
                    Why me
                  </span>
                </div>
                <span className="mono text-[10px] uppercase tracking-widest text-smoke hidden md:inline">
                  ~/why/reasons.yaml
                </span>
              </div>
            </div>
          </Demo>

          {/* Terminal panel */}
          <Demo
            title="./terminal.tsx"
            code={`bg-ink text-cream mono · blinking prompt`}
          >
            <div className="w-full max-w-xl border-2 border-cream bg-ink text-cream shadow-brut-cobalt overflow-hidden">
              <div className="border-b border-cream/20 bg-cream/5 px-3 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="w-2 h-2 rounded-full bg-lime" />
                <span className="w-2 h-2 rounded-full bg-cobalt" />
                <span className="ml-2 mono text-[9px] uppercase tracking-widest text-cream/50 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" /> hever@career
                </span>
              </div>
              <div className="p-4 mono text-[12px] leading-relaxed">
                <div>
                  <span className="text-cobalt">$</span> git log --oneline
                </div>
                <div className="mt-2">
                  <span className="text-cobalt">e91a7c3</span>{" "}
                  <span className="text-lime border border-lime/60 px-1 mr-1 text-[10px]">
                    HEAD
                  </span>
                  feat(status): open to work
                </div>
                <div>
                  <span className="text-cobalt">a14f8b2</span> chore(aivara):
                  closed cpo cycle
                </div>
                <div className="mt-2 text-cream/60">
                  <span className="text-cobalt">$</span>{" "}
                  <span className="animate-blink">█</span>
                </div>
              </div>
            </div>
          </Demo>

          {/* Polaroid */}
          <Demo
            title="./polaroid.tsx"
            code={`chrome header + aspect-[4/5] + vignette + caption`}
          >
            <div className="relative w-52">
              <div className="absolute inset-0 border-2 border-ink bg-paper shadow-brut translate-x-2 translate-y-2 rotate-[2deg]" />
              <div className="absolute inset-0 border-2 border-ink bg-paper shadow-brut -translate-x-1 translate-y-1 -rotate-[1.5deg]" />
              <figure className="relative border-2 border-ink bg-paper shadow-brut-cobalt">
                <div className="px-3 py-1.5 border-b-2 border-ink bg-ink text-cream flex items-center justify-between">
                  <span className="mono text-[9px] uppercase tracking-widest font-bold">
                    ./img.jpg
                  </span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                  </span>
                </div>
                <div className="aspect-[4/5] bg-gradient-to-br from-smoke to-ink" />
                <figcaption className="flex items-center justify-between px-3 py-1.5 border-t-2 border-ink mono text-[9px] uppercase tracking-widest text-smoke">
                  <span>
                    <span className="text-cobalt">//</span> caption
                  </span>
                  <span>01 / 04</span>
                </figcaption>
              </figure>
            </div>
          </Demo>

          {/* Brut card */}
          <Demo title="./card.tsx" code={`border-2 + shadow-brut`}>
            <div className="border-2 border-ink bg-lime shadow-brut p-5 w-full max-w-xs">
              <div className="mono text-[10px] uppercase tracking-widest opacity-70">
                // metric
              </div>
              <div className="display text-5xl font-bold mt-2">+1,100%</div>
              <div className="mono text-[11px] uppercase tracking-widest mt-2">
                cartera aivara · 2025
              </div>
            </div>
          </Demo>
        </div>
      </div>
    </section>
  );
}
