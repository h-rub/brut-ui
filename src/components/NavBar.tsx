import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";

const openPalette = () =>
  window.dispatchEvent(new CustomEvent("brut-ui:open-palette"));

// Detect mac for the keycap hint
const isMac =
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad/.test(navigator.platform);

const links = [
  { id: "pillars", label: "pillars", num: "01" },
  { id: "tokens", label: "tokens", num: "02" },
  { id: "components", label: "components", num: "03" },
  { id: "voice", label: "voice", num: "04" },
  { id: "principles", label: "principles", num: "05" },
];

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((x): x is HTMLElement => !!x);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport (but visible)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export function NavBar() {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(links.map((l) => l.id));

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close on route hash change
  useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <>
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

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={`mono text-[10px] uppercase tracking-[0.2em] px-3 py-2 transition-colors flex items-center gap-1.5 relative ${
                      isActive
                        ? "text-cobalt"
                        : "text-ink/70 hover:text-cobalt"
                    }`}
                  >
                    <span
                      className={isActive ? "text-cobalt" : "text-smoke"}
                    >
                      {l.num}
                    </span>
                    <span>{l.label}</span>
                    {isActive && (
                      <span className="absolute left-3 right-3 -bottom-[2px] h-[2px] bg-cobalt" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* Search trigger · desktop pill, mobile icon-only */}
            <button
              onClick={openPalette}
              className="hidden md:inline-flex items-center gap-2 border-2 border-ink bg-paper text-ink px-3 py-1.5 mono text-[10px] uppercase tracking-widest hover:bg-lime transition-colors"
              aria-label="buscar componente (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-smoke">buscar...</span>
              <span className="ml-2 border border-ink/30 bg-cream px-1.5 py-0.5 text-[9px]">
                {isMac ? "⌘K" : "^K"}
              </span>
            </button>
            <button
              onClick={openPalette}
              className="md:hidden border-2 border-ink bg-paper text-ink w-10 h-10 grid place-items-center hover:bg-lime transition-colors"
              aria-label="buscar componente"
            >
              <Search className="w-4 h-4" />
            </button>
            <a
              href="https://heverrubiomarin.com"
              className="hidden sm:inline-flex items-center gap-1.5 border-2 border-ink bg-ink text-cream px-3 py-1.5 mono text-[10px] uppercase tracking-widest font-bold hover:bg-cobalt transition-colors"
            >
              ← portfolio
            </a>
            {/* Hamburger mobile */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden border-2 border-ink bg-paper text-ink w-10 h-10 grid place-items-center shadow-brut-sm hover:bg-lime transition-colors"
              aria-label="abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-ink/80"
            onClick={() => setOpen(false)}
          />
          {/* sheet */}
          <div className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-cream border-l-2 border-ink flex flex-col">
            <div className="h-14 border-b-2 border-ink flex items-center justify-between px-4">
              <span className="mono text-[10px] uppercase tracking-widest text-smoke">
                // navegación
              </span>
              <button
                onClick={() => setOpen(false)}
                className="border-2 border-ink bg-paper text-ink w-9 h-9 grid place-items-center hover:bg-accent hover:text-cream transition-colors"
                aria-label="cerrar menú"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto p-4 space-y-1">
              {links.map((l) => {
                const isActive = active === l.id;
                return (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 border-2 px-4 py-3 mono text-[11px] uppercase tracking-[0.2em] font-bold transition-colors ${
                        isActive
                          ? "border-ink bg-ink text-cream shadow-brut-sm"
                          : "border-ink bg-paper hover:bg-lime"
                      }`}
                    >
                      <span
                        className={
                          isActive ? "text-cobalt" : "text-smoke"
                        }
                      >
                        {l.num}
                      </span>
                      <span>{l.label}</span>
                      {isActive && (
                        <span className="ml-auto w-2 h-2 bg-cobalt rounded-full animate-blink" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="border-t-2 border-ink p-4">
              <a
                href="https://heverrubiomarin.com"
                className="w-full inline-flex items-center justify-between border-2 border-ink bg-ink text-cream px-4 py-3 mono text-[11px] uppercase tracking-widest font-bold hover:bg-cobalt transition-colors"
              >
                ← portfolio
                <span className="mono text-[9px] text-cream/60">
                  heverrubiomarin.com
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
