const links = [
  { href: "#pillars", label: "pillars", num: "01" },
  { href: "#tokens", label: "tokens", num: "02" },
  { href: "#components", label: "components", num: "03" },
  { href: "#voice", label: "voice", num: "04" },
  { href: "#principles", label: "principles", num: "05" },
];

export function NavBar() {
  return (
    <nav className="sticky top-10 z-30 bg-cream/95 backdrop-blur border-b-2 border-ink">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="w-8 h-8 bg-ink text-cream grid place-items-center font-bold display text-sm">
            B
          </span>
          <span className="display text-lg font-bold tracking-tight">
            Brut UI
          </span>
          <span className="mono text-[9px] uppercase tracking-widest text-smoke hidden sm:inline">
            // v0.1
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="mono text-[10px] uppercase tracking-[0.2em] text-ink/70 hover:text-cobalt px-3 py-2 transition-colors flex items-center gap-1.5"
              >
                <span className="text-smoke">{l.num}</span>
                <span>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="https://heverrubiomarin.com"
          className="hidden sm:inline-flex items-center gap-1.5 border-2 border-ink bg-ink text-cream px-3 py-1.5 mono text-[10px] uppercase tracking-widest font-bold hover:bg-cobalt transition-colors"
        >
          ← portfolio
        </a>
      </div>
    </nav>
  );
}
