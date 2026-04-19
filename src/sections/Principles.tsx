import { X } from "lucide-react";

const nogoes = [
  "Gradientes (linear / radial)",
  "Border-radius > 0 (salvo círculos completos)",
  "Box-shadow con blur",
  "Iconos decorativos sin función",
  "Colores fuera de paleta (azul Bootstrap, verde WhatsApp, etc.)",
  "Stock photos / ilustraciones genéricas",
  "Animaciones wow (paralax, lottie, hero video)",
  "Dark mode toggle (secciones ya alternan cream/ink)",
  "Loading spinners redondos (usar █ blink o skeletons brut)",
  "Emojis decorativos de relleno",
];

export function Principles() {
  return (
    <section id="principles" className="py-16 md:py-24 bg-ink text-cream border-y-4 border-ink">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="border-b-2 border-cream/40 pb-3 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <span className="mono text-[10px] uppercase tracking-[0.3em] text-cream/50">
              §05
            </span>
            <span className="display text-xl md:text-2xl font-bold tracking-tight">
              Principles
            </span>
          </div>
          <span className="mono text-[10px] uppercase tracking-widest text-cream/40 hidden md:inline">
            ~/brut-ui/.gitignore
          </span>
        </div>

        <h2 className="display text-4xl md:text-6xl font-bold mt-10 leading-[0.95] max-w-3xl">
          No-goes.
          <br />
          <span className="italic-serif font-normal text-lime">
            Así es como no se normie-fica.
          </span>
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
          {nogoes.map((n) => (
            <div
              key={n}
              className="border-2 border-cream/80 bg-cream/5 p-4 flex items-start gap-3"
            >
              <X className="w-5 h-5 shrink-0 text-accent mt-0.5" />
              <span className="text-[15px] leading-[1.5]">{n}</span>
            </div>
          ))}
        </div>

        {/* Quick reference for AI */}
        <div className="mt-20 border-2 border-cream bg-cream/5 p-6 md:p-8 shadow-brut-cobalt">
          <div className="mono text-[10px] uppercase tracking-widest text-cream/50">
            // quick reference · para pegar en prompts de IA
          </div>
          <p className="mt-4 font-mono text-[13px] leading-[1.65] text-cream/90">
            Style: brutalist-editorial con guiños de terminal. Paleta:{" "}
            <span className="text-cobalt">#0A0A0A</span> (ink),{" "}
            <span className="text-cream">#F4F1EA</span> (cream/bg),{" "}
            <span className="text-cobalt">#2540FF</span> (cobalt),{" "}
            <span className="text-lime">#D4FF3B</span> (lime),{" "}
            <span className="text-accent">#FF3B1F</span> (accent),{" "}
            <span className="text-cream/60">#6B7280</span> (smoke). Fonts:
            Space Grotesk (display, tracking -0.035em), Instrument Serif
            (italic, énfasis editorial), JetBrains Mono (labels uppercase
            tracking 0.2–0.3em), Inter (body 17px/1.65). Cards:{" "}
            <span className="text-lime">border-2 border-ink</span> +{" "}
            <span className="text-lime">shadow-brut</span> (8px 8px 0 ink o
            cobalt), sin border-radius, sin gradientes, sin blur. Hover:
            translate(-2px,-2px) y sombra crece/cambia a accent o lime.
            Headers de sección usan <span className="text-cobalt">§NN</span> +
            path tipo <span className="text-cobalt">~/section/file.ext</span>{" "}
            + display H2 en Space Grotesk. Marca:{" "}
            <span className="text-cobalt">//</span> para glosas mono,{" "}
            <span className="text-cobalt">$</span> para CTAs/prompts. Voz:
            español mexicano directo, pro-IA, con humanidad. Grid 12-col,
            max-width 1400px. No dark-mode toggle.
          </p>
          <button
            onClick={() => {
              const el = document.querySelector("[data-qref]") as HTMLElement;
              if (el) navigator.clipboard.writeText(el.innerText);
            }}
            className="mt-6 inline-flex items-center gap-2 border-2 border-cream bg-cream/5 px-4 py-2 mono text-[10px] uppercase tracking-widest font-bold hover:bg-cobalt hover:border-cobalt transition-colors"
          >
            copiar quick reference
          </button>
          <div data-qref className="hidden">
            Style: brutalist-editorial con guiños de terminal. Paleta: #0A0A0A
            (ink), #F4F1EA (cream/bg), #2540FF (cobalt), #D4FF3B (lime), #FF3B1F
            (accent), #6B7280 (smoke). Fonts: Space Grotesk (display, tracking
            -0.035em), Instrument Serif (italic, énfasis editorial), JetBrains
            Mono (labels uppercase tracking 0.2-0.3em), Inter (body 17px/1.65).
            Cards: border-2 border-ink + shadow-brut (8px 8px 0 ink o cobalt),
            sin border-radius, sin gradientes, sin blur. Hover: translate(-2px,
            -2px) y sombra crece/cambia a accent o lime. Headers de sección
            usan §NN + path tipo ~/section/file.ext + display H2 en Space
            Grotesk. Marca: // para glosas mono, $ para CTAs/prompts. Voz:
            español mexicano directo, pro-IA, con humanidad. Grid 12-col,
            max-width 1400px. No dark-mode toggle.
          </div>
        </div>
      </div>
    </section>
  );
}
