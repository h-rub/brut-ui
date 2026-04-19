import { useEffect, useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import {
  ArrowRight,
  ArrowUpRight,
  Terminal,
  Sparkles,
  Info,
  AlertTriangle,
  XCircle,
  Check,
  Copy,
  Inbox,
  Loader2,
  CheckCircle2,
  Bell,
  X,
} from "lucide-react";

// Mapa de sub-secciones (exportado para NavBar, TOC y CommandPalette)
export const componentGroups = [
  { id: "c-buttons", num: "03.1", title: "Buttons & CTAs" },
  { id: "c-labels", num: "03.2", title: "Labels & Chips" },
  { id: "c-type", num: "03.3", title: "Typography & Quotes" },
  { id: "c-structure", num: "03.4", title: "Structure & Nav" },
  { id: "c-data", num: "03.5", title: "Data & Layout" },
  { id: "c-media", num: "03.6", title: "Media" },
  { id: "c-feedback", num: "03.7", title: "Feedback" },
  { id: "c-states", num: "03.8", title: "States & Indicators" },
  { id: "c-forms", num: "03.9", title: "Forms" },
  { id: "c-code", num: "03.10", title: "Code & Terminal" },
  { id: "c-fullwidth", num: "03.11", title: "Full-width" },
  { id: "c-textures", num: "03.12", title: "Textures" },
] as const;

// Lista plana para el command palette: cada demo con su anchor de grupo
export const componentCatalog: { name: string; group: string; groupId: string }[] = [
  { name: "btn-brut", group: "Buttons & CTAs", groupId: "c-buttons" },
  { name: "cta", group: "Buttons & CTAs", groupId: "c-buttons" },
  { name: "chip", group: "Labels & Chips", groupId: "c-labels" },
  { name: "eyebrow", group: "Labels & Chips", groupId: "c-labels" },
  { name: "keyword-label", group: "Labels & Chips", groupId: "c-labels" },
  { name: "kbd", group: "Labels & Chips", groupId: "c-labels" },
  { name: "inline-code", group: "Labels & Chips", groupId: "c-labels" },
  { name: "tag-group", group: "Labels & Chips", groupId: "c-labels" },
  { name: "avatar-chip", group: "Labels & Chips", groupId: "c-labels" },
  { name: "pull-quote", group: "Typography & Quotes", groupId: "c-type" },
  { name: "drop-cap", group: "Typography & Quotes", groupId: "c-type" },
  { name: "shoutout", group: "Typography & Quotes", groupId: "c-type" },
  { name: "section-header", group: "Structure & Nav", groupId: "c-structure" },
  { name: "breadcrumb", group: "Structure & Nav", groupId: "c-structure" },
  { name: "nav-link", group: "Structure & Nav", groupId: "c-structure" },
  { name: "case-tab", group: "Structure & Nav", groupId: "c-structure" },
  { name: "link-external", group: "Structure & Nav", groupId: "c-structure" },
  { name: "divider", group: "Structure & Nav", groupId: "c-structure" },
  { name: "meta-grid", group: "Data & Layout", groupId: "c-data" },
  { name: "stat-card", group: "Data & Layout", groupId: "c-data" },
  { name: "numbered-article", group: "Data & Layout", groupId: "c-data" },
  { name: "polaroid", group: "Media", groupId: "c-media" },
  { name: "side-card", group: "Media", groupId: "c-media" },
  { name: "status-bar", group: "Feedback", groupId: "c-feedback" },
  { name: "prompt", group: "Feedback", groupId: "c-feedback" },
  { name: "progress", group: "Feedback", groupId: "c-feedback" },
  { name: "callout-info", group: "Feedback", groupId: "c-feedback" },
  { name: "callout-warn", group: "Feedback", groupId: "c-feedback" },
  { name: "callout-error", group: "Feedback", groupId: "c-feedback" },
  { name: "state-cards", group: "States & Indicators", groupId: "c-states" },
  { name: "toast", group: "States & Indicators", groupId: "c-states" },
  { name: "tooltip", group: "States & Indicators", groupId: "c-states" },
  { name: "skeleton", group: "States & Indicators", groupId: "c-states" },
  { name: "input", group: "Forms", groupId: "c-forms" },
  { name: "textarea", group: "Forms", groupId: "c-forms" },
  { name: "submit", group: "Forms", groupId: "c-forms" },
  { name: "terminal", group: "Code & Terminal", groupId: "c-code" },
  { name: "file-tree", group: "Code & Terminal", groupId: "c-code" },
  { name: "code-block", group: "Code & Terminal", groupId: "c-code" },
  { name: "marquee", group: "Full-width", groupId: "c-fullwidth" },
  { name: "mega-logotype", group: "Full-width", groupId: "c-fullwidth" },
  { name: "grid-lines", group: "Textures", groupId: "c-textures" },
  { name: "scanlines", group: "Textures", groupId: "c-textures" },
  { name: "noise", group: "Textures", groupId: "c-textures" },
];

// Fuente canónica por demo · lo que copia el botón "copy" del header
// El key es el slug (título sin "./" ni ".tsx")
const sources: Record<string, string> = {
  "btn-brut": `<button className="inline-flex items-center gap-2 border-2 border-ink bg-ink text-cream px-5 py-3 mono text-[11px] uppercase tracking-widest font-bold shadow-brut hover:bg-accent hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
  ejecutar <ArrowRight className="w-3.5 h-3.5" />
</button>`,
  cta: `<button className="inline-flex items-center gap-3 border-2 border-ink bg-ink text-cream px-6 py-4 shadow-brut-lg hover:bg-accent hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brut-accent transition-all group">
  <Sparkles className="w-4 h-4" />
  <span className="mono text-[12px] uppercase tracking-[0.2em] font-bold">
    empezar proyecto
  </span>
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</button>`,
  chip: `<span className="border-2 border-ink bg-cobalt text-cream px-3 py-1.5 mono text-[10px] uppercase tracking-widest font-bold">
  cobalt
</span>`,
  eyebrow: `<div className="mono text-[11px] uppercase tracking-[0.3em] text-smoke flex items-center gap-3">
  <span className="w-8 h-[2px] bg-cobalt" />
  <span>// portfolio · 2026</span>
</div>`,
  "keyword-label": `<div className="mono text-[11px] uppercase tracking-widest text-smoke flex items-center gap-2">
  <span className="w-1.5 h-1.5 bg-cobalt" />
  keyword / product
</div>`,
  kbd: `<kbd className="inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 mono text-[11px] uppercase tracking-widest font-bold border-2 border-ink bg-paper text-ink shadow-[2px_2px_0_0_#0A0A0A] leading-none">
  ⌘
</kbd>`,
  "inline-code": `<code className="mono text-[13px] bg-lime/50 border border-ink/20 px-1.5 py-0.5">
  border-2 border-ink
</code>`,
  "tag-group": `<div className="flex flex-wrap gap-1.5">
  <span className="mono text-[10px] uppercase tracking-widest border-2 border-ink px-2 py-1 bg-paper">
    python
  </span>
  <span className="mono text-[10px] uppercase tracking-widest border-2 border-ink px-2 py-1 bg-cobalt text-cream">
    typescript
  </span>
  <span className="mono text-[10px] uppercase tracking-widest border-2 border-ink px-2 py-1 bg-lime">
    dart
  </span>
</div>`,
  "avatar-chip": `<div className="inline-flex items-center gap-3 border-2 border-ink bg-paper shadow-brut-sm pl-1 pr-3 py-1">
  <div className="w-8 h-8 rounded-full bg-cobalt text-cream grid place-items-center display font-bold text-sm shrink-0">
    HR
  </div>
  <div className="leading-tight">
    <div className="mono text-[11px] font-bold">Hernán R.</div>
    <div className="mono text-[9px] uppercase tracking-widest text-smoke">
      mentor · 2018
    </div>
  </div>
</div>`,
  "pull-quote": `<div className="border-l-4 border-cobalt pl-6">
  <p className="italic-serif text-2xl md:text-3xl leading-snug">
    "El código enseña disciplina; los mercados enseñan humildad."
  </p>
  <p className="mono text-[10px] uppercase tracking-widest text-smoke mt-3">
    — H.R
  </p>
</div>`,
  "drop-cap": `<div className="text-[15px] leading-[1.65]">
  <span className="display text-[5rem] font-bold leading-none float-left mr-2 mt-1 text-cobalt">
    B
  </span>
  rutalist typography está diseñada para sostener bloques grandes de texto sin
  perder ritmo. El drop cap marca el inicio y da textura editorial.
</div>`,
  shoutout: `<div className="border-l-4 border-cobalt pl-5">
  <div className="mono text-[10px] uppercase tracking-widest opacity-60 mb-2">
    // shoutout
  </div>
  <p className="italic-serif text-lg leading-snug">
    "Gracias por apostar por un desarrollador sin experiencia profesional."
  </p>
  <p className="mono text-[10px] uppercase tracking-widest opacity-70 mt-3">
    — para Hernán Restrepo C.
  </p>
</div>`,
  "section-header": `<div className="border-b-2 border-ink pb-3 flex items-center justify-between gap-4">
  <div className="flex items-baseline gap-4">
    <span className="mono text-[10px] uppercase tracking-[0.3em] text-smoke">
      §07
    </span>
    <span className="display text-xl font-bold tracking-tight">Why me</span>
  </div>
  <span className="mono text-[10px] uppercase tracking-widest text-smoke hidden md:inline">
    ~/why/reasons.yaml
  </span>
</div>`,
  breadcrumb: `<nav className="mono text-[11px] uppercase tracking-widest flex items-center gap-2 flex-wrap">
  <a href="#" className="text-smoke hover:text-ink">~</a>
  <span className="text-smoke/40">/</span>
  <a href="#" className="text-smoke hover:text-ink">brut-ui</a>
  <span className="text-smoke/40">/</span>
  <span className="text-cobalt">breadcrumb.tsx</span>
</nav>`,
  "nav-link": `<a
  href="#"
  className="mono text-[11px] uppercase tracking-[0.2em] text-ink/70 hover:text-cobalt px-3 py-2 transition-colors flex items-center gap-1.5"
>
  <span className="text-smoke">01</span>
  <span>about</span>
</a>`,
  "case-tab": `<div className="flex gap-0 border-2 border-ink">
  <button className="bg-ink text-cream px-4 py-2 mono text-[10px] uppercase tracking-widest font-bold border-r-2 border-cream/20">
    aivara
  </button>
  <button className="bg-cream text-ink px-4 py-2 mono text-[10px] uppercase tracking-widest font-bold border-r-2 border-ink hover:bg-lime">
    kosmos
  </button>
  <button className="bg-cream text-ink px-4 py-2 mono text-[10px] uppercase tracking-widest font-bold hover:bg-lime">
    syncronik
  </button>
</div>`,
  "link-external": `<a
  href="#"
  className="inline-flex items-center gap-1.5 underline decoration-cobalt decoration-2 underline-offset-4 hover:text-cobalt transition-colors"
>
  ver el portfolio completo
  <ArrowUpRight className="w-4 h-4" />
</a>`,
  divider: `<div className="flex items-center gap-3">
  <div className="flex-1 h-[2px] bg-ink" />
  <span className="mono text-[10px] uppercase tracking-[0.3em] text-smoke">
    // 2024 · aivara
  </span>
  <div className="flex-1 h-[2px] bg-ink" />
</div>`,
  "meta-grid": `<div>
  <div className="mono text-[10px] uppercase tracking-[0.25em] text-cobalt mb-2">
    // contact
  </div>
  <dl className="space-y-1">
    <div className="flex items-baseline gap-2 mono text-[11px]">
      <dt className="text-smoke w-[56px] shrink-0 uppercase tracking-widest text-[9px]">
        linkedin
      </dt>
      <dd className="text-ink">@heverrubio</dd>
    </div>
  </dl>
</div>`,
  "stat-card": `<div className="border-2 border-ink bg-cobalt text-cream p-4">
  <div className="display text-3xl font-bold leading-none">24</div>
  <div className="mono text-[9px] uppercase tracking-widest mt-2 opacity-80">
    años
  </div>
</div>`,
  "numbered-article": `<article className="border-2 border-ink p-5 bg-paper hover:bg-lime/60 transition-colors group">
  <div className="grid grid-cols-12 gap-4 items-start">
    <div className="col-span-2">
      <div className="display text-5xl font-bold text-cobalt leading-none">
        01
      </div>
    </div>
    <div className="col-span-10">
      <div className="mono text-[10px] uppercase tracking-widest text-smoke flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-cobalt" />
        keyword / context
      </div>
      <h3 className="display text-xl font-bold mt-2 leading-tight">
        Pregunto antes de codear.
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-ink/85">
        El mejor código es el que no tuviste que escribir.
      </p>
    </div>
  </div>
</article>`,
  polaroid: `<figure className="border-2 border-ink bg-paper shadow-brut-cobalt">
  <div className="px-3 py-1.5 border-b-2 border-ink bg-ink text-cream flex items-center justify-between">
    <span className="mono text-[9px] uppercase tracking-widest font-bold">
      ./img.jpg
    </span>
  </div>
  <img src="/img.jpg" alt="" className="aspect-[4/5] object-cover w-full" />
  <figcaption className="flex items-center justify-between px-3 py-1.5 border-t-2 border-ink mono text-[9px] uppercase tracking-widest text-smoke">
    <span><span className="text-cobalt">//</span> caption</span>
    <span>01 / 04</span>
  </figcaption>
</figure>`,
  "side-card": `<article className="border-2 border-ink bg-ink text-cream shadow-brut max-w-xs">
  <div className="aspect-[4/3] bg-gradient-to-br from-cobalt via-ink to-accent relative">
    <span className="absolute top-3 left-3 mono text-[9px] uppercase tracking-widest bg-lime text-ink px-2 py-1 font-bold">
      founder
    </span>
  </div>
  <div className="p-4">
    <div className="mono text-[10px] uppercase tracking-widest text-cream/60">
      // project
    </div>
    <h3 className="display text-xl font-bold mt-1 leading-tight">
      LoopGk Academy
    </h3>
    <p className="text-[13px] text-cream/80 mt-2 leading-relaxed">
      Comunidad de +3k mentees.
    </p>
  </div>
</article>`,
  "status-bar": `<div className="bg-ink text-cream border-2 border-ink">
  <div className="px-4 h-10 flex items-center justify-between mono text-[10px] uppercase tracking-[0.25em]">
    <div className="flex items-center gap-3">
      <span className="w-1.5 h-1.5 bg-lime rounded-full" />
      <span>online</span>
    </div>
    <div className="text-cobalt tabular-nums">16:42:07</div>
  </div>
</div>`,
  prompt: `<div className="font-mono text-lg text-ink">
  <span className="text-cobalt">$</span> say hi{" "}
  <span className="animate-blink">█</span>
</div>`,
  progress: `<div>
  <div className="flex justify-between mono text-[10px] uppercase tracking-widest mb-1">
    <span>ship rate</span>
    <span className="text-cobalt">72%</span>
  </div>
  <div className="border-2 border-ink h-4 bg-cream overflow-hidden">
    <div className="h-full bg-lime" style={{ width: "72%" }} />
  </div>
</div>`,
  "callout-info": `<div className="border-2 border-ink bg-cobalt/5 p-4 flex gap-3">
  <div className="w-8 h-8 bg-cobalt text-cream grid place-items-center shrink-0">
    <Info className="w-4 h-4" />
  </div>
  <div className="flex-1">
    <div className="mono text-[10px] uppercase tracking-widest text-cobalt font-bold">
      // note
    </div>
    <p className="text-[14px] leading-relaxed mt-1">
      Todos los componentes heredan los tokens de Tailwind.
    </p>
  </div>
</div>`,
  "callout-warn": `<div className="border-2 border-ink bg-lime p-4 flex gap-3">
  <div className="w-8 h-8 bg-ink text-lime grid place-items-center shrink-0">
    <AlertTriangle className="w-4 h-4" />
  </div>
  <div className="flex-1">
    <div className="mono text-[10px] uppercase tracking-widest font-bold">
      // warn
    </div>
    <p className="text-[14px] leading-relaxed mt-1">
      Cualquier border-radius &gt; 0 viola el sistema.
    </p>
  </div>
</div>`,
  "callout-error": `<div className="border-2 border-ink bg-accent text-cream p-4 flex gap-3">
  <div className="w-8 h-8 bg-cream text-accent grid place-items-center shrink-0">
    <XCircle className="w-4 h-4" />
  </div>
  <div className="flex-1">
    <div className="mono text-[10px] uppercase tracking-widest font-bold">
      // error
    </div>
    <p className="text-[14px] leading-relaxed mt-1">
      Fallo al cargar ~/track-2.mp3. Verifica la ruta del asset.
    </p>
  </div>
</div>`,
  "state-cards": `// empty
<div className="border-2 border-ink bg-cream p-4 flex flex-col gap-2">
  <Inbox className="w-5 h-5" />
  <div className="mono text-[10px] uppercase tracking-widest font-bold">empty</div>
  <p className="text-[12px] text-ink/70">Sin resultados por ahora.</p>
</div>

// loading
<div className="border-2 border-ink bg-cobalt text-cream p-4 flex flex-col gap-2">
  <Loader2 className="w-5 h-5 animate-spin" />
  <div className="mono text-[10px] uppercase tracking-widest font-bold">loading</div>
</div>

// error
<div className="border-2 border-ink bg-accent text-cream p-4 flex flex-col gap-2">
  <XCircle className="w-5 h-5" />
  <div className="mono text-[10px] uppercase tracking-widest font-bold">error</div>
</div>

// success
<div className="border-2 border-ink bg-lime p-4 flex flex-col gap-2">
  <CheckCircle2 className="w-5 h-5" />
  <div className="mono text-[10px] uppercase tracking-widest font-bold">success</div>
</div>`,
  toast: `{shown && (
  <div className="fixed bottom-4 right-4 border-2 border-ink bg-ink text-cream shadow-brut animate-toast-in">
    <div className="flex items-stretch">
      <div className="bg-lime text-ink grid place-items-center px-3 border-r-2 border-cream/20">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <div className="flex-1 px-3 py-2.5">
        <div className="mono text-[10px] uppercase tracking-widest text-cream/60">// notif</div>
        <div className="text-[13px] leading-snug">
          Mensaje enviado a <span className="text-lime">hever@</span>
        </div>
      </div>
      <button
        onClick={() => setShown(false)}
        className="border-l-2 border-cream/20 px-3 hover:bg-accent transition-colors grid place-items-center"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
)}`,
  tooltip: `<div className="relative group inline-block">
  <button className="border-2 border-ink bg-paper px-4 py-2 mono text-[10px] uppercase tracking-widest font-bold hover:bg-lime transition-colors">
    hover me
  </button>
  <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border-2 border-cream bg-ink text-cream px-2.5 py-1 mono text-[10px] uppercase tracking-widest shadow-brut-sm">
    // tooltip
  </span>
</div>`,
  skeleton: `<div className="relative w-full h-4 border-2 border-ink bg-cream overflow-hidden">
  <div
    className="absolute inset-y-0 w-1/3 bg-ink/10 animate-scan"
    style={{
      backgroundImage:
        "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(10,10,10,0.25) 2px, rgba(10,10,10,0.25) 3px)",
    }}
  />
</div>

// tailwind.config.js
// keyframes: { scan: { "0%": { transform: "translateX(-120%)" }, "100%": { transform: "translateX(220%)" } } }
// animation: { scan: "scan 1.8s linear infinite" }`,
  input: `<label className="block">
  <span className="mono text-[10px] uppercase tracking-widest text-smoke mb-1.5 block flex items-center gap-1.5">
    <span className="w-1.5 h-1.5 bg-cobalt" /> nombre
  </span>
  <input
    type="text"
    placeholder="tu nombre"
    className="w-full border-2 border-ink bg-paper px-3 py-2.5 text-[15px] focus:outline-none focus:shadow-[4px_4px_0_0_#2540FF] focus:-translate-x-1 focus:-translate-y-1 transition-all mono placeholder:text-smoke/50"
  />
</label>`,
  textarea: `<label className="block">
  <span className="mono text-[10px] uppercase tracking-widest text-smoke mb-1.5 block flex items-center gap-1.5">
    <span className="w-1.5 h-1.5 bg-cobalt" /> mensaje
  </span>
  <textarea
    rows={4}
    placeholder="Cuéntame qué estás construyendo..."
    className="w-full border-2 border-ink bg-paper px-3 py-2.5 text-[15px] focus:outline-none focus:shadow-[4px_4px_0_0_#2540FF] focus:-translate-x-1 focus:-translate-y-1 transition-all mono placeholder:text-smoke/50 resize-y min-h-[110px]"
  />
</label>`,
  submit: `<button className="w-full group border-2 border-ink bg-cobalt text-cream px-6 py-4 shadow-brut hover:bg-lime hover:text-ink hover:-translate-x-1 hover:-translate-y-1 transition-all flex items-center justify-between">
  <span className="mono text-[12px] uppercase tracking-[0.2em] font-bold flex items-center gap-2">
    <span className="w-1.5 h-1.5 bg-lime group-hover:bg-ink" />
    enviar mensaje
  </span>
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</button>`,
  terminal: `<div className="border-2 border-cream bg-ink text-cream shadow-brut-cobalt overflow-hidden">
  <div className="border-b border-cream/20 bg-cream/5 px-3 py-2 flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-accent" />
    <span className="w-2 h-2 rounded-full bg-lime" />
    <span className="w-2 h-2 rounded-full bg-cobalt" />
    <span className="ml-2 mono text-[9px] uppercase tracking-widest text-cream/50 flex items-center gap-1.5">
      <Terminal className="w-3 h-3" /> hever@career
    </span>
  </div>
  <div className="p-4 mono text-[12px] leading-relaxed">
    <div><span className="text-cobalt">$</span> git log --oneline</div>
    <div className="mt-2 text-cream/60">
      <span className="text-cobalt">$</span>{" "}
      <span className="animate-blink">█</span>
    </div>
  </div>
</div>`,
  "file-tree": `<pre className="mono text-[12px] leading-[1.7] bg-ink text-cream border-2 border-ink p-4 overflow-x-auto">
{\`brut-ui/
├─ src/
│  ├─ components/
│  │  └─ NavBar.tsx
│  ├─ sections/
│  │  └─ Components.tsx
│  └─ App.tsx
└─ package.json\`}
</pre>`,
  "code-block": `<div className="border-2 border-ink shadow-brut overflow-hidden">
  <div className="border-b-2 border-ink bg-ink text-cream px-3 py-2 flex items-center justify-between">
    <span className="mono text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
      <span className="w-1.5 h-1.5 bg-cobalt" />
      tsx
    </span>
    <button className="mono text-[10px] uppercase tracking-widest inline-flex items-center gap-1.5 hover:text-lime transition-colors">
      <Copy className="w-3 h-3" /> copy
    </button>
  </div>
  <pre className="bg-ink text-cream mono text-[12px] leading-[1.7] p-4 overflow-x-auto">
    <code>{\`<button className="btn-brut">click</button>\`}</code>
  </pre>
</div>`,
  marquee: `<div className="overflow-hidden bg-ink text-cream py-5">
  <div className="flex gap-8 animate-marquee whitespace-nowrap mono text-sm uppercase tracking-[0.2em]">
    {Array.from({ length: 2 }).map((_, dup) => (
      <div key={dup} className="flex gap-8 shrink-0">
        {["ingeniería", "//", "IA", "//", "mercados"].map((t, i) => (
          <span key={i} className={t === "//" ? "text-cobalt" : "text-cream"}>
            {t}
          </span>
        ))}
      </div>
    ))}
  </div>
</div>

// tailwind.config.js
// keyframes: { marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } } }
// animation: { marquee: "marquee 30s linear infinite" }`,
  "mega-logotype": `<div className="display text-[20vw] md:text-[15vw] font-bold leading-[0.85] tracking-tighter select-none flex items-baseline overflow-hidden">
  HEVER<span className="text-cobalt">_</span>
</div>`,
  "grid-lines": `<div
  className="h-36 bg-cream border-2 border-ink"
  style={{
    backgroundImage:
      "linear-gradient(to right, rgba(10,10,10,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.08) 1px, transparent 1px)",
    backgroundSize: "24px 24px",
  }}
/>`,
  scanlines: `<div
  className="h-36 bg-cobalt border-2 border-ink"
  style={{
    backgroundImage:
      "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(10,10,10,0.35) 2px, rgba(10,10,10,0.35) 3px)",
  }}
/>`,
  noise: `<div
  className="h-36 bg-lime border-2 border-ink"
  style={{
    backgroundImage: \`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")\`,
    backgroundBlendMode: "multiply",
  }}
/>`,
};

// Normaliza el title de un demo (`./btn-brut`, `./cta.tsx`) al slug del map
function titleToSlug(title: string): string {
  return title.replace(/^\.\//, "").replace(/\.tsx$/, "");
}

function SubHeader({ num, title, anchor }: { num: string; title: string; anchor: string }) {
  return (
    <div id={anchor} className="scroll-mt-28 pt-14 first:pt-4">
      <div className="flex items-baseline gap-4 border-b-2 border-ink pb-2 mb-6">
        <span className="mono text-[10px] uppercase tracking-[0.3em] text-cobalt">
          §{num}
        </span>
        <h3 className="display text-xl md:text-2xl font-bold tracking-tight">
          {title}
        </h3>
      </div>
    </div>
  );
}

function SubGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>;
}

function Demo({
  title,
  code,
  children,
}: {
  title: string;
  code: string;
  children: React.ReactNode;
}) {
  const source = sources[titleToSlug(title)];
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (!source) return;
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <article className="border-2 border-ink bg-paper shadow-brut">
      <div className="border-b-2 border-ink bg-ink text-cream px-4 py-2 flex items-center justify-between gap-3">
        <span className="mono text-[10px] uppercase tracking-widest font-bold truncate">
          {title}
        </span>
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="w-2 h-2 rounded-full bg-lime" />
            <span className="w-2 h-2 rounded-full bg-cobalt" />
          </span>
          {source && (
            <button
              onClick={onCopy}
              className={`inline-flex items-center gap-1.5 border px-2 py-0.5 mono text-[9px] uppercase tracking-widest font-bold transition-colors ${
                copied
                  ? "border-lime bg-lime text-ink"
                  : "border-cream/40 text-cream hover:bg-cream hover:text-ink"
              }`}
              aria-label={copied ? "copiado" : "copiar código"}
              title={copied ? "copiado" : "copiar código"}
            >
              {copied ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              <span>{copied ? "copied" : "copy"}</span>
            </button>
          )}
        </div>
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
    <section id="components" className="py-16 md:py-24 border-b-2 border-ink scroll-mt-24">
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

        <div className="mt-12 space-y-2">
          {/* ————————————— 03.1 Buttons & CTAs ————————————— */}
          <SubHeader num="03.1" title="Buttons & CTAs" anchor="c-buttons" />
          <SubGrid>
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

            <Demo
              title="./cta.tsx"
              code={`btn brut con arrow icon + hover accent`}
            >
              <button className="inline-flex items-center gap-3 border-2 border-ink bg-ink text-cream px-6 py-4 shadow-brut-lg hover:bg-accent hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brut-accent transition-all group">
                <Sparkles className="w-4 h-4" />
                <span className="mono text-[12px] uppercase tracking-[0.2em] font-bold">
                  empezar proyecto
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Demo>
          </SubGrid>

          {/* ————————————— 03.2 Labels & Chips ————————————— */}
          <SubHeader num="03.2" title="Labels & Chips" anchor="c-labels" />
          <SubGrid>
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

            <Demo
              title="./eyebrow.tsx"
              code={`bar 2px + // label mono uppercase`}
            >
              <div className="mono text-[11px] uppercase tracking-[0.3em] text-smoke flex items-center gap-3">
                <span className="w-8 h-[2px] bg-cobalt" />
                <span>// portfolio · 2026</span>
              </div>
            </Demo>

            <Demo
              title="./keyword-label.tsx"
              code={`• dot cobalto + keyword / slug`}
            >
              <div className="mono text-[11px] uppercase tracking-widest text-smoke flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cobalt" />
                keyword / product
              </div>
            </Demo>

            <Demo
              title="./kbd.tsx"
              code={`border-b-3 · shadow-sm · mono small`}
            >
              <div className="flex flex-col gap-3 items-center">
                <div className="flex items-center gap-2 text-sm">
                  <span>presiona</span>
                  <Kbd>⌘</Kbd>
                  <span>+</span>
                  <Kbd>K</Kbd>
                  <span>para abrir</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Kbd>esc</Kbd>
                  <span>cierra el modal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd>
                  <span className="text-sm ml-2">para navegar</span>
                </div>
              </div>
            </Demo>

            <Demo
              title="./inline-code.tsx"
              code={`<code> · bg-lime/40 · mono · px-1.5`}
            >
              <p className="text-[15px] leading-[1.65] max-w-md">
                Usa{" "}
                <code className="mono text-[13px] bg-lime/50 border border-ink/20 px-1.5 py-0.5">
                  border-2 border-ink
                </code>{" "}
                +{" "}
                <code className="mono text-[13px] bg-lime/50 border border-ink/20 px-1.5 py-0.5">
                  shadow-brut
                </code>{" "}
                para la mayoría de cards. Los acentos van con{" "}
                <code className="mono text-[13px] bg-cobalt text-cream px-1.5 py-0.5">
                  text-cobalt
                </code>
                .
              </p>
            </Demo>

            <Demo
              title="./tag-group.tsx"
              code={`cluster · flex-wrap gap-1.5 · mono uppercase`}
            >
              <div className="max-w-md">
                <div className="mono text-[10px] uppercase tracking-[0.25em] text-cobalt mb-3">
                  // stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    ["python", "lime"],
                    ["typescript", "cobalt"],
                    ["dart", "paper"],
                    ["docker", "paper"],
                    ["kubernetes", "cobalt"],
                    ["llms", "accent"],
                    ["rag", "paper"],
                    ["ocr", "lime"],
                    ["nlp", "paper"],
                  ].map(([t, tone]) => {
                    const bg =
                      tone === "cobalt"
                        ? "bg-cobalt text-cream"
                        : tone === "lime"
                          ? "bg-lime"
                          : tone === "accent"
                            ? "bg-accent text-cream"
                            : "bg-paper";
                    return (
                      <span
                        key={t}
                        className={`mono text-[10px] uppercase tracking-widest border-2 border-ink px-2 py-1 ${bg}`}
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Demo>

            <Demo
              title="./avatar-chip.tsx"
              code={`círculo + nombre · atribuciones "— para …"`}
            >
              <div className="flex flex-col gap-3 items-start">
                <div className="inline-flex items-center gap-3 border-2 border-ink bg-paper shadow-brut-sm pl-1 pr-3 py-1">
                  <div className="w-8 h-8 rounded-full bg-cobalt text-cream grid place-items-center display font-bold text-sm shrink-0">
                    HR
                  </div>
                  <div className="leading-tight">
                    <div className="mono text-[11px] font-bold">Hernán R.</div>
                    <div className="mono text-[9px] uppercase tracking-widest text-smoke">
                      mentor · 2018
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 border-2 border-ink bg-ink text-cream pl-1 pr-3 py-1">
                  <div className="w-7 h-7 rounded-full bg-lime text-ink grid place-items-center display font-bold text-xs shrink-0">
                    HE
                  </div>
                  <span className="mono text-[11px] uppercase tracking-widest font-bold">
                    hever
                  </span>
                  <span className="w-1.5 h-1.5 bg-lime rounded-full animate-blink" />
                </div>
              </div>
            </Demo>
          </SubGrid>

          {/* ————————————— 03.3 Typography & Quotes ————————————— */}
          <SubHeader num="03.3" title="Typography & Quotes" anchor="c-type" />
          <SubGrid>
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

            <Demo
              title="./shoutout.tsx"
              code={`border-l-4 cobalt + italic + attribution`}
            >
              <div className="border-l-4 border-cobalt pl-5 max-w-md">
                <div className="mono text-[10px] uppercase tracking-widest opacity-60 mb-2">
                  // shoutout
                </div>
                <p className="italic-serif text-lg leading-snug">
                  "Gracias por apostar por un desarrollador sin experiencia
                  profesional y abrirme la primera puerta."
                </p>
                <p className="mono text-[10px] uppercase tracking-widest opacity-70 mt-3">
                  — para Hernán Restrepo C.
                </p>
              </div>
            </Demo>
          </SubGrid>

          {/* ————————————— 03.4 Structure & Nav ————————————— */}
          <SubHeader num="03.4" title="Structure & Nav" anchor="c-structure" />
          <SubGrid>
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

            <Demo
              title="./breadcrumb.tsx"
              code={`mono uppercase · / separador · current cobalto`}
            >
              <nav className="mono text-[11px] uppercase tracking-widest flex items-center gap-2 flex-wrap">
                <a href="#" className="text-smoke hover:text-ink">
                  ~
                </a>
                <span className="text-smoke/40">/</span>
                <a href="#" className="text-smoke hover:text-ink">
                  brut-ui
                </a>
                <span className="text-smoke/40">/</span>
                <a href="#" className="text-smoke hover:text-ink">
                  components
                </a>
                <span className="text-smoke/40">/</span>
                <span className="text-cobalt">breadcrumb.tsx</span>
              </nav>
            </Demo>

            <Demo
              title="./nav-link.tsx"
              code={`num smoke + label · hover → cobalt`}
            >
              <div className="flex items-center gap-1">
                {[
                  ["01", "about"],
                  ["02", "work"],
                  ["03", "log"],
                  ["04", "contact"],
                ].map(([n, l]) => (
                  <a
                    key={n}
                    href="#"
                    className="mono text-[11px] uppercase tracking-[0.2em] text-ink/70 hover:text-cobalt px-3 py-2 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-smoke">{n}</span>
                    <span>{l}</span>
                  </a>
                ))}
              </div>
            </Demo>

            <Demo
              title="./case-tab.tsx"
              code={`active: underline cobalto + bg-ink text-cream`}
            >
              <div className="flex flex-wrap gap-0 border-2 border-ink">
                <button className="bg-ink text-cream px-4 py-2 mono text-[10px] uppercase tracking-widest font-bold border-r-2 border-cream/20">
                  aivara
                </button>
                <button className="bg-cream text-ink px-4 py-2 mono text-[10px] uppercase tracking-widest font-bold border-r-2 border-ink hover:bg-lime">
                  kosmos
                </button>
                <button className="bg-cream text-ink px-4 py-2 mono text-[10px] uppercase tracking-widest font-bold border-r-2 border-ink hover:bg-lime">
                  hubmine
                </button>
                <button className="bg-cream text-ink px-4 py-2 mono text-[10px] uppercase tracking-widest font-bold hover:bg-lime">
                  syncronik
                </button>
              </div>
            </Demo>

            <Demo
              title="./link-external.tsx"
              code={`underline cobalt + ↗ icon · outbound`}
            >
              <div className="flex flex-col gap-3 items-start">
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 underline decoration-cobalt decoration-2 underline-offset-4 hover:text-cobalt transition-colors"
                >
                  ver el portfolio completo
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="mono text-[11px] uppercase tracking-widest inline-flex items-center gap-1.5 hover:text-cobalt transition-colors"
                >
                  github.com/heverrubio
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </Demo>

            <Demo
              title="./divider.tsx"
              code={`h-[2px] bg-ink · label centrada // section`}
            >
              <div className="w-full max-w-md flex flex-col gap-8">
                {/* labeled divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-[2px] bg-ink" />
                  <span className="mono text-[10px] uppercase tracking-[0.3em] text-smoke">
                    // 2024 · aivara
                  </span>
                  <div className="flex-1 h-[2px] bg-ink" />
                </div>
                {/* dotted divider */}
                <div
                  className="h-[2px] w-full"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #0A0A0A 1px, transparent 1.2px)",
                    backgroundSize: "8px 2px",
                    backgroundRepeat: "repeat-x",
                  }}
                />
                {/* cobalt rule with slash */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-[2px] bg-cobalt" />
                  <span className="mono text-[12px] text-cobalt">//</span>
                  <div className="flex-1 h-[2px] bg-cobalt" />
                </div>
              </div>
            </Demo>
          </SubGrid>

          {/* ————————————— 03.5 Data & Layout ————————————— */}
          <SubHeader num="03.5" title="Data & Layout" anchor="c-data" />
          <SubGrid>
            <Demo
              title="./meta-grid.tsx"
              code={`footer style · col-6 md:col-3 · k/v mono`}
            >
              <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                <Col
                  label="contact"
                  lines={[
                    ["linkedin", "@heverrubio"],
                    ["location", "monterrey"],
                    ["tz", "gmt-6"],
                  ]}
                />
                <Col
                  label="stack"
                  lines={[
                    ["langs", "ts · py · dart"],
                    ["infra", "k8s · cloud"],
                    ["ai", "llms · rag"],
                  ]}
                />
              </div>
            </Demo>

            <Demo title="./stat-card.tsx" code={`bg color + display enorme + label mono`}>
              <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                <div className="border-2 border-ink bg-cobalt text-cream p-4">
                  <div className="display text-3xl font-bold leading-none">24</div>
                  <div className="mono text-[9px] uppercase tracking-widest mt-2 opacity-80">
                    años
                  </div>
                </div>
                <div className="border-2 border-ink bg-cream p-4">
                  <div className="display text-3xl font-bold leading-none">+5</div>
                  <div className="mono text-[9px] uppercase tracking-widest mt-2 text-smoke">
                    años exp
                  </div>
                </div>
                <div className="border-2 border-ink bg-lime p-4">
                  <div className="display text-3xl font-bold leading-none">206</div>
                  <div className="mono text-[9px] uppercase tracking-widest mt-2 text-ink/70">
                    huesos
                  </div>
                </div>
              </div>
            </Demo>

            <Demo
              title="./numbered-article.tsx"
              code={`display 01 cobalto + hover bg-lime`}
            >
              <article className="border-2 border-ink p-5 bg-paper w-full max-w-lg hover:bg-lime/60 transition-colors group">
                <div className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-2">
                    <div className="display text-5xl font-bold text-cobalt leading-none">
                      01
                    </div>
                  </div>
                  <div className="col-span-10">
                    <div className="mono text-[10px] uppercase tracking-widest text-smoke flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cobalt" />
                      keyword / context
                    </div>
                    <h3 className="display text-xl font-bold mt-2 leading-tight">
                      Pregunto antes de codear.
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink/85">
                      El mejor código es el que no tuviste que escribir.
                    </p>
                  </div>
                </div>
              </article>
            </Demo>
          </SubGrid>

          {/* ————————————— 03.6 Media ————————————— */}
          <SubHeader num="03.6" title="Media" anchor="c-media" />
          <SubGrid>
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

            <Demo
              title="./side-card.tsx"
              code={`photo + badge chip + caption · patrón "proyecto"`}
            >
              <article className="border-2 border-ink bg-ink text-cream shadow-brut w-full max-w-xs h-full flex flex-col">
                <div className="aspect-[4/3] bg-gradient-to-br from-cobalt via-ink to-accent relative overflow-hidden">
                  <span className="absolute top-3 left-3 mono text-[9px] uppercase tracking-widest bg-lime text-ink px-2 py-1 font-bold">
                    founder
                  </span>
                  <span className="absolute bottom-3 right-3 mono text-[9px] uppercase tracking-widest bg-ink/80 text-cream px-2 py-1">
                    2020 → now
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="mono text-[10px] uppercase tracking-widest text-cream/60">
                    // project
                  </div>
                  <h3 className="display text-xl font-bold mt-1 leading-tight">
                    LoopGk Academy
                  </h3>
                  <p className="text-[13px] text-cream/80 mt-2 leading-relaxed">
                    Comunidad de +3k mentees. Fundada en 2020, activa al día de
                    hoy.
                  </p>
                  <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                    <span className="mono text-[9px] uppercase tracking-widest border border-cream/40 px-2 py-0.5">
                      edtech
                    </span>
                    <span className="mono text-[9px] uppercase tracking-widest border border-cream/40 px-2 py-0.5">
                      mentoring
                    </span>
                  </div>
                </div>
              </article>
            </Demo>
          </SubGrid>

          {/* ————————————— 03.7 Feedback ————————————— */}
          <SubHeader num="03.7" title="Feedback" anchor="c-feedback" />
          <SubGrid>
            <Demo
              title="./status-bar.tsx"
              code={`bg-ink mono uppercase · clock tick 1s`}
            >
              <LiveStatusBar />
            </Demo>

            <Demo
              title="./prompt.tsx"
              code={`$ + animate-blink █`}
            >
              <div className="font-mono text-lg text-ink">
                <span className="text-cobalt">$</span> say hi{" "}
                <span className="animate-blink">█</span>
              </div>
            </Demo>

            <Demo
              title="./progress.tsx"
              code={`border-2 + fill lime con % width`}
            >
              <div className="w-full max-w-md space-y-3">
                <div>
                  <div className="flex justify-between mono text-[10px] uppercase tracking-widest mb-1">
                    <span>ship rate</span>
                    <span className="text-cobalt">72%</span>
                  </div>
                  <div className="border-2 border-ink h-4 bg-cream overflow-hidden">
                    <div className="h-full bg-lime" style={{ width: "72%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mono text-[10px] uppercase tracking-widest mb-1">
                    <span>coverage</span>
                    <span className="text-cobalt">94%</span>
                  </div>
                  <div className="border-2 border-ink h-4 bg-cream overflow-hidden">
                    <div className="h-full bg-cobalt" style={{ width: "94%" }} />
                  </div>
                </div>
              </div>
            </Demo>

            <Demo
              title="./callout-info.tsx"
              code={`// note · borde cobalto + icon`}
            >
              <div className="border-2 border-ink bg-cobalt/5 p-4 w-full max-w-md flex gap-3">
                <div className="w-8 h-8 bg-cobalt text-cream grid place-items-center shrink-0">
                  <Info className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="mono text-[10px] uppercase tracking-widest text-cobalt font-bold">
                    // note
                  </div>
                  <p className="text-[14px] leading-relaxed mt-1">
                    Todos los componentes heredan los tokens de Tailwind. No uses
                    valores hardcoded.
                  </p>
                </div>
              </div>
            </Demo>

            <Demo
              title="./callout-warn.tsx"
              code={`// warn · borde ink + bg lime`}
            >
              <div className="border-2 border-ink bg-lime p-4 w-full max-w-md flex gap-3">
                <div className="w-8 h-8 bg-ink text-lime grid place-items-center shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="mono text-[10px] uppercase tracking-widest font-bold">
                    // warn
                  </div>
                  <p className="text-[14px] leading-relaxed mt-1">
                    Cualquier border-radius &gt; 0 viola el sistema. Revisa antes
                    de commit.
                  </p>
                </div>
              </div>
            </Demo>

            <Demo
              title="./callout-error.tsx"
              code={`// error · bg accent · texto cream`}
            >
              <div className="border-2 border-ink bg-accent text-cream p-4 w-full max-w-md flex gap-3">
                <div className="w-8 h-8 bg-cream text-accent grid place-items-center shrink-0">
                  <XCircle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="mono text-[10px] uppercase tracking-widest font-bold">
                    // error
                  </div>
                  <p className="text-[14px] leading-relaxed mt-1">
                    Fallo al cargar ~/track-2.mp3. Verifica la ruta del asset.
                  </p>
                </div>
              </div>
            </Demo>
          </SubGrid>

          {/* ————————————— 03.8 States & Indicators ————————————— */}
          <SubHeader num="03.8" title="States & Indicators" anchor="c-states" />
          <SubGrid>
            <Demo
              title="./state-cards.tsx"
              code={`empty · loading · error · success · 4 colores`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {/* empty */}
                <div className="border-2 border-ink bg-cream p-4 flex flex-col items-start gap-2">
                  <Inbox className="w-5 h-5" />
                  <div className="mono text-[10px] uppercase tracking-widest font-bold">
                    empty
                  </div>
                  <p className="text-[12px] text-ink/70 leading-snug">
                    Sin resultados por ahora. Prueba otro filtro.
                  </p>
                </div>
                {/* loading */}
                <div className="border-2 border-ink bg-cobalt text-cream p-4 flex flex-col items-start gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <div className="mono text-[10px] uppercase tracking-widest font-bold">
                    loading
                  </div>
                  <p className="text-[12px] text-cream/80 leading-snug">
                    Buscando coincidencias en el índice…
                  </p>
                </div>
                {/* error */}
                <div className="border-2 border-ink bg-accent text-cream p-4 flex flex-col items-start gap-2">
                  <XCircle className="w-5 h-5" />
                  <div className="mono text-[10px] uppercase tracking-widest font-bold">
                    error
                  </div>
                  <p className="text-[12px] text-cream/85 leading-snug">
                    La request falló. Intenta en unos segundos.
                  </p>
                </div>
                {/* success */}
                <div className="border-2 border-ink bg-lime p-4 flex flex-col items-start gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <div className="mono text-[10px] uppercase tracking-widest font-bold">
                    success
                  </div>
                  <p className="text-[12px] text-ink/80 leading-snug">
                    Mensaje enviado. Te responderé pronto.
                  </p>
                </div>
              </div>
            </Demo>

            <Demo
              title="./toast.tsx"
              code={`slide-in desde bottom · dismiss X`}
            >
              <ToastDemo />
            </Demo>

            <Demo
              title="./tooltip.tsx"
              code={`bg-ink text-cream · aparece en hover`}
            >
              <div className="flex flex-wrap items-center justify-center gap-10 py-6">
                <TooltipDemo label="top" position="top" tip="// desde arriba" />
                <TooltipDemo
                  label="right"
                  position="right"
                  tip="// desde la derecha"
                />
                <TooltipDemo
                  label="bottom"
                  position="bottom"
                  tip="// desde abajo"
                />
              </div>
            </Demo>

            <Demo
              title="./skeleton.tsx"
              code={`bars brut · scanline translate infinito`}
            >
              <div className="w-full max-w-md space-y-3">
                <SkeletonBar w="w-3/4" />
                <SkeletonBar w="w-full" />
                <SkeletonBar w="w-5/6" />
                <div className="flex gap-3 items-center pt-2">
                  <div className="w-12 h-12 border-2 border-ink bg-cream relative overflow-hidden">
                    <ScanOverlay />
                  </div>
                  <div className="flex-1 space-y-2">
                    <SkeletonBar w="w-1/2" h="h-3" />
                    <SkeletonBar w="w-3/4" h="h-3" />
                  </div>
                </div>
              </div>
            </Demo>
          </SubGrid>

          {/* ————————————— 03.9 Forms ————————————— */}
          <SubHeader num="03.9" title="Forms" anchor="c-forms" />
          <SubGrid>
            <Demo
              title="./input.tsx"
              code={`border-2 · bg-paper · focus: shadow-brut-cobalt`}
            >
              <div className="w-full max-w-md space-y-4">
                <label className="block">
                  <span className="mono text-[10px] uppercase tracking-widest text-smoke mb-1.5 block flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cobalt" /> nombre
                  </span>
                  <input
                    type="text"
                    defaultValue="Hever Rubio"
                    className="w-full border-2 border-ink bg-paper px-3 py-2.5 text-[15px] focus:outline-none focus:shadow-[4px_4px_0_0_#2540FF] focus:-translate-x-1 focus:-translate-y-1 transition-all mono"
                  />
                </label>
                <label className="block">
                  <span className="mono text-[10px] uppercase tracking-widest text-smoke mb-1.5 block flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cobalt" /> email
                  </span>
                  <input
                    type="email"
                    placeholder="tú@dominio.com"
                    className="w-full border-2 border-ink bg-paper px-3 py-2.5 text-[15px] focus:outline-none focus:shadow-[4px_4px_0_0_#2540FF] focus:-translate-x-1 focus:-translate-y-1 transition-all mono placeholder:text-smoke/50"
                  />
                </label>
              </div>
            </Demo>

            <Demo
              title="./textarea.tsx"
              code={`border-2 · min-h · resize-y · focus: shadow cobalto`}
            >
              <label className="block w-full max-w-md">
                <span className="mono text-[10px] uppercase tracking-widest text-smoke mb-1.5 block flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cobalt" /> mensaje
                </span>
                <textarea
                  rows={4}
                  placeholder="Cuéntame qué estás construyendo..."
                  className="w-full border-2 border-ink bg-paper px-3 py-2.5 text-[15px] focus:outline-none focus:shadow-[4px_4px_0_0_#2540FF] focus:-translate-x-1 focus:-translate-y-1 transition-all mono placeholder:text-smoke/50 resize-y min-h-[110px]"
                />
                <span className="mono text-[9px] uppercase tracking-widest text-smoke mt-1.5 block text-right">
                  // max 2000 chars
                </span>
              </label>
            </Demo>

            <Demo
              title="./submit.tsx"
              code={`cta full-width · bg-cobalt · hover lime`}
            >
              <button className="w-full max-w-md group border-2 border-ink bg-cobalt text-cream px-6 py-4 shadow-brut hover:bg-lime hover:text-ink hover:-translate-x-1 hover:-translate-y-1 transition-all flex items-center justify-between">
                <span className="mono text-[12px] uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-lime group-hover:bg-ink" />
                  enviar mensaje
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Demo>
          </SubGrid>

          {/* ————————————— 03.10 Code & Terminal ————————————— */}
          <SubHeader num="03.10" title="Code & Terminal" anchor="c-code" />
          <SubGrid>
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

            <Demo
              title="./file-tree.tsx"
              code={`ascii · mono · ├─ └─ │`}
            >
              <pre className="mono text-[12px] leading-[1.7] bg-ink text-cream border-2 border-ink p-4 w-full max-w-md overflow-x-auto">
{`brut-ui/
├─ src/
│  ├─ components/
│  │  ├─ NavBar.tsx
│  │  └─ SectionHeader.tsx
│  ├─ sections/
│  │  ├─ `}<span className="text-cobalt">Components.tsx</span>{`
│  │  ├─ Tokens.tsx
│  │  └─ Voice.tsx
│  └─ App.tsx
├─ tailwind.config.js
└─ package.json`}
              </pre>
            </Demo>

            <Demo
              title="./code-block.tsx"
              code={`chrome header + copy btn · bg-ink`}
            >
              <CodeBlock
                lang="tsx"
                code={`<button className="btn-brut">
  <Check className="w-4 h-4" />
  envía mensaje
</button>`}
              />
            </Demo>
          </SubGrid>

          {/* ————————————— 03.11 Full-width ————————————— */}
          <SubHeader num="03.11" title="Full-width" anchor="c-fullwidth" />
          <p className="-mt-4 mono text-[11px] uppercase tracking-widest text-smoke">
            // ocupan 100vw · se usan entre secciones como separadores
            editoriales
          </p>

          <div className="mt-6 border-2 border-ink shadow-brut overflow-hidden bg-ink text-cream">
            <div className="border-b-2 border-cream/20 bg-cream/5 px-4 py-2 flex items-center justify-between">
              <span className="mono text-[10px] uppercase tracking-widest font-bold">
                ./marquee.tsx
              </span>
              <span className="mono text-[9px] uppercase tracking-widest text-cream/50">
                animate-marquee · 30s
              </span>
            </div>
            <div className="overflow-hidden py-5">
              <div className="flex gap-8 animate-marquee whitespace-nowrap mono text-sm uppercase tracking-[0.2em]">
                {Array.from({ length: 2 }).map((_, dup) => (
                  <div key={dup} className="flex gap-8 shrink-0">
                    {[
                      "ingeniería",
                      "//",
                      "IA",
                      "//",
                      "mercados",
                      "//",
                      "código",
                      "//",
                      "disciplina",
                      "//",
                      "envío",
                      "//",
                      "humildad",
                      "//",
                    ].map((t, i) => (
                      <span
                        key={i}
                        className={t === "//" ? "text-cobalt" : "text-cream"}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 border-2 border-ink bg-cream shadow-brut overflow-hidden">
            <div className="border-b-2 border-ink bg-ink text-cream px-4 py-2 flex items-center justify-between">
              <span className="mono text-[10px] uppercase tracking-widest font-bold">
                ./mega-logotype.tsx
              </span>
              <span className="mono text-[9px] uppercase tracking-widest text-cream/50">
                text-[15vw] · clippeado
              </span>
            </div>
            <div className="display text-[20vw] md:text-[15vw] font-bold leading-[0.85] tracking-tighter select-none flex items-baseline overflow-hidden px-4">
              HEVER<span className="text-cobalt">_</span>
            </div>
          </div>

          {/* ————————————— 03.12 Textures ————————————— */}
          <SubHeader num="03.12" title="Textures" anchor="c-textures" />
          <p className="-mt-4 mono text-[11px] uppercase tracking-widest text-smoke">
            // tres overlays · úsense con mesura
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-ink shadow-brut overflow-hidden">
              <div className="px-4 py-2 bg-ink text-cream mono text-[10px] uppercase tracking-widest font-bold">
                grid-lines
              </div>
              <div
                className="h-36 bg-cream"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(10,10,10,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.08) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
            <div className="border-2 border-ink shadow-brut overflow-hidden">
              <div className="px-4 py-2 bg-ink text-cream mono text-[10px] uppercase tracking-widest font-bold">
                scanlines
              </div>
              <div
                className="h-36 bg-cobalt"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(10,10,10,0.35) 2px, rgba(10,10,10,0.35) 3px)",
                }}
              />
            </div>
            <div className="border-2 border-ink shadow-brut overflow-hidden">
              <div className="px-4 py-2 bg-ink text-cream mono text-[10px] uppercase tracking-widest font-bold">
                noise (svg turb.)
              </div>
              <div
                className="h-36 bg-lime relative"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                  backgroundBlendMode: "multiply",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveStatusBar() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return (
    <div className="bg-ink text-cream border-2 border-ink w-full max-w-lg">
      <div className="px-4 h-10 flex items-center justify-between mono text-[10px] uppercase tracking-[0.25em]">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-lime rounded-full" />
          <span>online</span>
        </div>
        <div className="text-cobalt tabular-nums">
          {hh}:{mm}:{ss}
        </div>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 mono text-[11px] uppercase tracking-widest font-bold border-2 border-ink bg-paper text-ink shadow-[2px_2px_0_0_#0A0A0A] leading-none">
      {children}
    </kbd>
  );
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };
  return (
    <div className="w-full max-w-md border-2 border-ink shadow-brut overflow-hidden">
      <div className="border-b-2 border-ink bg-ink text-cream px-3 py-2 flex items-center justify-between">
        <span className="mono text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-cobalt" />
          {lang}
        </span>
        <button
          onClick={onCopy}
          className="mono text-[10px] uppercase tracking-widest inline-flex items-center gap-1.5 hover:text-lime transition-colors"
          aria-label="copiar código"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" /> copiado
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-ink text-cream mono text-[12px] leading-[1.7] p-4 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ToastDemo() {
  const [shown, setShown] = useState(true);
  const [key, setKey] = useState(0); // para re-trigger de animación
  const show = () => {
    setShown(true);
    setKey((k) => k + 1);
  };
  return (
    <div className="relative w-full max-w-md h-[160px] flex items-center justify-center">
      <button
        onClick={show}
        className="inline-flex items-center gap-2 border-2 border-ink bg-ink text-cream px-4 py-2.5 mono text-[10px] uppercase tracking-widest font-bold shadow-brut hover:bg-cobalt transition-colors"
      >
        <Bell className="w-3.5 h-3.5" />
        trigger toast
      </button>
      {shown && (
        <div
          key={key}
          className="absolute bottom-0 right-0 left-0 sm:left-auto border-2 border-ink bg-ink text-cream shadow-brut animate-toast-in"
        >
          <div className="flex items-stretch">
            <div className="bg-lime text-ink grid place-items-center px-3 border-r-2 border-cream/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 px-3 py-2.5">
              <div className="mono text-[10px] uppercase tracking-widest text-cream/60">
                // notif
              </div>
              <div className="text-[13px] leading-snug">
                Mensaje enviado a <span className="text-lime">hever@</span>
              </div>
            </div>
            <button
              onClick={() => setShown(false)}
              className="border-l-2 border-cream/20 px-3 hover:bg-accent transition-colors grid place-items-center"
              aria-label="cerrar toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TooltipDemo({
  label,
  position,
  tip,
}: {
  label: string;
  position: "top" | "bottom" | "right";
  tip: string;
}) {
  const pos =
    position === "top"
      ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
      : position === "bottom"
        ? "top-full mt-2 left-1/2 -translate-x-1/2"
        : "left-full ml-2 top-1/2 -translate-y-1/2";
  return (
    <div className="relative group inline-block">
      <button className="border-2 border-ink bg-paper px-4 py-2 mono text-[10px] uppercase tracking-widest font-bold hover:bg-lime transition-colors">
        hover {label}
      </button>
      <span
        className={`pointer-events-none absolute ${pos} opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border-2 border-cream bg-ink text-cream px-2.5 py-1 mono text-[10px] uppercase tracking-widest shadow-brut-sm`}
      >
        {tip}
      </span>
    </div>
  );
}

function SkeletonBar({ w, h = "h-4" }: { w: string; h?: string }) {
  return (
    <div
      className={`relative ${w} ${h} border-2 border-ink bg-cream overflow-hidden`}
    >
      <ScanOverlay />
    </div>
  );
}

function ScanOverlay() {
  return (
    <div
      className="absolute inset-y-0 w-1/3 bg-ink/10 animate-scan"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(10,10,10,0.25) 2px, rgba(10,10,10,0.25) 3px)",
      }}
    />
  );
}

function Col({
  label,
  lines,
}: {
  label: string;
  lines: [string, string][];
}) {
  return (
    <div>
      <div className="mono text-[10px] uppercase tracking-[0.25em] text-cobalt mb-2">
        // {label}
      </div>
      <dl className="space-y-1">
        {lines.map(([k, v]) => (
          <div
            key={k}
            className="flex items-baseline gap-2 mono text-[11px]"
          >
            <dt className="text-smoke w-[56px] shrink-0 uppercase tracking-widest text-[9px]">
              {k}
            </dt>
            <dd className="text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
