import { SectionHeader } from "../components/SectionHeader";
import { Copyable } from "../components/Copyable";

const colors = [
  { name: "ink", hex: "#0A0A0A", use: "tinta principal, bordes, texto", onDark: false },
  { name: "cream", hex: "#F4F1EA", use: "fondo base (papel envejecido)", onDark: false },
  { name: "paper", hex: "#FFFFFF", use: "cards limpias sobre cream", onDark: false },
  { name: "cobalt", hex: "#2540FF", use: "acento primario, links", onDark: true },
  { name: "lime", hex: "#D4FF3B", use: "highlight, estado activo", onDark: false },
  { name: "accent", hex: "#FF3B1F", use: "alerta, CTA al hover", onDark: true },
  { name: "smoke", hex: "#6B7280", use: "gris neutro para meta", onDark: true },
];

const shadows = [
  { name: "shadow-brut-sm", value: "4px 4px 0 0 #0A0A0A" },
  { name: "shadow-brut", value: "8px 8px 0 0 #0A0A0A" },
  { name: "shadow-brut-lg", value: "12px 12px 0 0 #0A0A0A" },
  { name: "shadow-brut-cobalt", value: "8px 8px 0 0 #2540FF" },
  { name: "shadow-brut-accent", value: "8px 8px 0 0 #FF3B1F" },
];

const fonts = [
  {
    name: "Space Grotesk",
    cls: "display",
    role: "Display · headings · numeros grandes",
    rules: "tracking -0.035em, line-height 0.9, weights 400/500/600/700",
    sample: "Hola, soy Hever.",
  },
  {
    name: "Instrument Serif",
    cls: "italic-serif",
    role: "Énfasis editorial · quotes",
    rules: "siempre italic, casi siempre color cobalt",
    sample: "y me gusta construir.",
  },
  {
    name: "JetBrains Mono",
    cls: "mono uppercase tracking-[0.2em]",
    role: "Voz del sistema · labels · paths",
    rules: "uppercase, tracking 0.2-0.3em, tamaño 9-12px",
    sample: "// now playing",
  },
  {
    name: "Inter",
    cls: "",
    role: "Body · párrafos · UI secundaria",
    rules: "weights 400/500/600, line-height 1.65 para lectura",
    sample:
      "Crecí en Sánchez Magallanes, viendo a mi abuelo empujar un puesto de tacos.",
  },
];

export function Tokens() {
  return (
    <section id="tokens" className="py-16 md:py-24 border-b-2 border-ink">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <SectionHeader
          number="02"
          title="Tokens"
          path="~/brut-ui/tokens.css"
        />

        {/* Colors */}
        <h3 className="display text-3xl md:text-4xl font-bold mt-12">
          Color
        </h3>
        <p className="mt-3 mono text-[11px] uppercase tracking-widest text-smoke">
          // click cualquier hex para copiar
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {colors.map((c) => (
            <div
              key={c.name}
              className="border-2 border-ink shadow-brut bg-paper"
            >
              <div
                className={`h-24 md:h-32 border-b-2 border-ink ${
                  c.onDark ? "text-cream" : "text-ink"
                } flex items-end p-3`}
                style={{ backgroundColor: c.hex }}
              >
                <span className="mono text-[10px] uppercase tracking-widest opacity-80">
                  {c.name}
                </span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <Copyable value={c.hex} />
                <span className="mono text-[9px] uppercase tracking-widest text-smoke text-right max-w-[60%] leading-tight">
                  {c.use}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Typography */}
        <h3 className="display text-3xl md:text-4xl font-bold mt-20">
          Tipografía
        </h3>
        <div className="mt-6 border-2 border-ink divide-y-2 divide-ink bg-paper shadow-brut">
          {fonts.map((f) => (
            <div
              key={f.name}
              className="grid grid-cols-12 gap-4 p-5 md:p-7 items-start"
            >
              <div className="col-span-12 md:col-span-3">
                <div className="mono text-[10px] uppercase tracking-widest text-smoke">
                  {f.role}
                </div>
                <div className="display text-xl md:text-2xl font-bold mt-1">
                  {f.name}
                </div>
                <div className="mono text-[9px] uppercase tracking-widest text-smoke mt-2">
                  {f.rules}
                </div>
              </div>
              <div className={`col-span-12 md:col-span-9 ${f.cls} text-2xl md:text-4xl`}>
                {f.sample}
              </div>
            </div>
          ))}
        </div>

        {/* Shadows */}
        <h3 className="display text-3xl md:text-4xl font-bold mt-20">
          Shadows
        </h3>
        <p className="mt-3 mono text-[11px] uppercase tracking-widest text-smoke">
          // siempre offset bottom-right, nunca blur
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {shadows.map((s) => (
            <div key={s.name} className="text-center">
              <div
                className="h-20 bg-paper border-2 border-ink mx-auto"
                style={{ boxShadow: s.value }}
              />
              <div className="mt-5 mono text-[10px] uppercase tracking-widest">
                <Copyable value={s.name} />
              </div>
              <div className="mono text-[9px] text-smoke mt-1 truncate">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Spacing */}
        <h3 className="display text-3xl md:text-4xl font-bold mt-20">
          Spacing · Grid
        </h3>
        <div className="mt-6 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 border-2 border-ink p-5 bg-paper shadow-brut">
            <div className="mono text-[10px] uppercase tracking-widest text-smoke">
              // sección
            </div>
            <div className="display text-2xl font-bold mt-2">
              py-20 md:py-28
            </div>
            <p className="mt-2 mono text-[11px] text-smoke">
              80px mobile · 112px desktop · separación vertical entre secciones
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 border-2 border-ink p-5 bg-paper shadow-brut">
            <div className="mono text-[10px] uppercase tracking-widest text-smoke">
              // container
            </div>
            <div className="display text-2xl font-bold mt-2">
              max-w-[1400px]
            </div>
            <p className="mt-2 mono text-[11px] text-smoke">
              px-4 mobile · px-6 desktop · grid 12-col con gap 4/8
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
