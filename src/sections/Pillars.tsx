import { SectionHeader } from "../components/SectionHeader";

const pillars = [
  {
    id: "01",
    name: "Brutalismo web",
    what: "Estructura expuesta, sin decoración, confrontacional.",
    how: "Bordes 2–4px, sombras sólidas offset, botones que empujan al click, colores puros.",
    color: "bg-ink text-cream",
  },
  {
    id: "02",
    name: "Swiss Style 50s",
    what: "Grid, disciplina tipográfica, paleta mínima.",
    how: "12 cols max-w 1400px, display enorme con tracking negativo, whitespace religioso.",
    color: "bg-paper",
  },
  {
    id: "03",
    name: "Terminal / CLI",
    what: "Lenguaje de código como estética, datos en vivo.",
    how: "Paths ~/file.md, prefijos // $ ∙, semáforos rojo/amarillo/azul, timestamps mono.",
    color: "bg-cobalt text-cream",
  },
  {
    id: "04",
    name: "Editorial impreso",
    what: "Drop caps, italic serif para énfasis, quotes largos.",
    how: "Columnas largas con float drop-cap, italic-serif cobalto para palabras clave.",
    color: "bg-lime",
  },
];

export function Pillars() {
  return (
    <section id="pillars" className="py-16 md:py-24 border-b-2 border-ink">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <SectionHeader number="01" title="Pillars" path="~/brut-ui/pillars.md" />

        <div className="mt-10 grid grid-cols-12 gap-6">
          <h2 className="col-span-12 lg:col-span-5 display text-4xl md:text-6xl font-bold leading-[0.92]">
            Cuatro corrientes,
            <br />
            <span className="italic-serif font-normal">sin jerarquía.</span>
          </h2>
          <p className="col-span-12 lg:col-span-7 text-[17px] leading-[1.65] self-end">
            Las cuatro se mezclan sin orden fijo. La regla es que ningún
            elemento sea decoración: cada borde, cada sombra, cada label mono
            comunica algo — estado, jerarquía, fuente de dato.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {pillars.map((p) => (
            <article
              key={p.id}
              className={`${p.color} border-2 border-ink shadow-brut p-6 md:p-8 flex flex-col min-h-[260px]`}
            >
              <div className="flex items-center justify-between mono text-[10px] uppercase tracking-widest opacity-70">
                <span>§{p.id}</span>
                <span>pillar</span>
              </div>
              <h3 className="display text-3xl md:text-4xl font-bold mt-4 leading-[0.95]">
                {p.name}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.55] opacity-90">
                {p.what}
              </p>
              <p className="mt-auto pt-6 mono text-[11px] uppercase tracking-widest opacity-70">
                → {p.how}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
