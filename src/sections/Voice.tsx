import { SectionHeader } from "../components/SectionHeader";
import { Check, X } from "lucide-react";

const rules = [
  {
    n: "01",
    rule: "Español mexicano, conversacional.",
    ok: "Crecí en Sánchez Magallanes viendo a mi abuelo vender tacos.",
    bad: "Originario de una localidad costera, me crié en un entorno de emprendimiento familiar.",
  },
  {
    n: "02",
    rule: "Cero LinkedIn-speak.",
    ok: "Entregué 3 plataformas en 2 años. Todas en producción.",
    bad: "Apasionado por la excelencia y la sinergia multidisciplinaria.",
  },
  {
    n: "03",
    rule: "Opinión > modestia.",
    ok: "Construyo plataformas con IA donde mueven métricas.",
    bad: "He tenido la suerte de colaborar en algunos proyectos interesantes.",
  },
  {
    n: "04",
    rule: "Datos > adjetivos.",
    ok: "Cartera +1,100%. 3 ascensos en 3 años.",
    bad: "Logré un crecimiento impresionante y múltiples promociones.",
  },
  {
    n: "05",
    rule: "Pro-IA sin defensa.",
    ok: "Uso IA para entregar más valor más rápido.",
    bad: "La IA no reemplaza humanos, es sólo una herramienta más.",
  },
  {
    n: "06",
    rule: "Humanidad permitida.",
    ok: "Reír hasta que duela. Amar lo que haces. Ese es el KPI.",
    bad: "Enfocado en maximizar el impacto empresarial sostenible.",
  },
];

const marks = [
  { mark: "//", role: "Glosa · aclaración · side-note", example: "// now playing" },
  { mark: "$", role: "Prompt · CTA · invocación", example: "$ git log --oneline" },
  { mark: "§", role: "Numeración de sección", example: "§04 career log" },
  { mark: "~/", role: "Path · ubicación del contenido", example: "~/about/profile.md" },
  { mark: "→", role: "Flujo · consecuencia", example: "input → proceso → output" },
  { mark: "█", role: "Cursor blinking, fin de prompt", example: "$ █" },
];

export function Voice() {
  return (
    <section id="voice" className="py-16 md:py-24 bg-paper border-b-2 border-ink">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <SectionHeader
          number="04"
          title="Voice"
          path="~/brut-ui/voice.yaml"
        />

        <h2 className="display text-4xl md:text-6xl font-bold mt-10 leading-[0.95] max-w-3xl">
          El copy es
          <br />
          <span className="italic-serif font-normal text-cobalt">parte del sistema.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-[1.65]">
          Sin este tono el diseño se siente genérico. Cada regla viene con un
          "dice" y un "no dice" concreto.
        </p>

        {/* Rules */}
        <div className="mt-10 border-2 border-ink divide-y-2 divide-ink bg-cream shadow-brut">
          {rules.map((r) => (
            <div key={r.n} className="grid grid-cols-12 gap-4 p-5 md:p-7">
              <div className="col-span-12 md:col-span-3">
                <div className="display text-3xl md:text-4xl font-bold text-cobalt">
                  {r.n}
                </div>
                <div className="display text-lg md:text-xl font-bold mt-1 leading-tight">
                  {r.rule}
                </div>
              </div>
              <div className="col-span-12 md:col-span-9 space-y-3">
                <div className="flex items-start gap-3 border-2 border-ink bg-lime/40 p-3">
                  <Check className="w-4 h-4 shrink-0 mt-0.5 text-ink" />
                  <p className="text-[15px] leading-[1.55]">{r.ok}</p>
                </div>
                <div className="flex items-start gap-3 border-2 border-ink bg-accent/10 p-3">
                  <X className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                  <p className="text-[15px] leading-[1.55] text-ink/70 line-through decoration-accent">
                    {r.bad}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marks */}
        <h3 className="display text-3xl md:text-4xl font-bold mt-20">
          Marcas del sistema
        </h3>
        <p className="mt-3 mono text-[11px] uppercase tracking-widest text-smoke">
          // glifos que funcionan como puntuación semántica
        </p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {marks.map((m) => (
            <div
              key={m.mark}
              className="border-2 border-ink bg-cream shadow-brut p-5"
            >
              <div className="display text-6xl md:text-7xl font-bold text-cobalt leading-none">
                {m.mark}
              </div>
              <div className="mono text-[10px] uppercase tracking-widest text-smoke mt-4">
                {m.role}
              </div>
              <div className="mono text-[11px] text-ink mt-2 bg-paper border border-ink/30 px-2 py-1 inline-block">
                {m.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
