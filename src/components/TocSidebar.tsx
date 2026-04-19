import { useEffect, useState } from "react";
import { Minus, List } from "lucide-react";
import { componentGroups } from "../sections/Components";

const sections = [
  { id: "pillars", num: "01", label: "pillars" },
  { id: "tokens", num: "02", label: "tokens" },
  { id: "components", num: "03", label: "components", hasChildren: true },
  { id: "voice", num: "04", label: "voice" },
  { id: "principles", num: "05", label: "principles" },
];

const STORAGE_KEY = "brut-ui:toc-collapsed";

function useActiveId(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((x): x is HTMLElement => !!x);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export function TocSidebar() {
  const topActive = useActiveId(sections.map((s) => s.id));
  const subActive = useActiveId(componentGroups.map((g) => g.id));
  const inComponents = topActive === "components";

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
    } catch {
      /* noop */
    }
  }, [collapsed]);

  // Minimized launcher
  if (collapsed) {
    return (
      <aside
        className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 z-20"
        aria-label="table of contents (minimizado)"
      >
        <button
          onClick={() => setCollapsed(false)}
          className="group flex flex-col items-center gap-2 border-2 border-ink bg-cream/40 backdrop-blur-xl backdrop-saturate-150 shadow-brut-sm px-2 py-3 hover:bg-lime/70 transition-colors"
          aria-label="expandir tabla de contenido"
          style={{
            WebkitBackdropFilter: "blur(24px) saturate(1.5)",
          }}
        >
          <List className="w-4 h-4" />
          <span
            className="mono text-[9px] uppercase tracking-[0.3em] font-bold"
            style={{ writingMode: "vertical-rl" }}
          >
            on this page
          </span>
          <span className="w-1.5 h-1.5 bg-cobalt animate-blink" />
        </button>
      </aside>
    );
  }

  return (
    <aside
      className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 z-20 w-[190px]"
      aria-label="table of contents"
    >
      <div
        className="border-2 border-ink bg-cream/35 backdrop-blur-2xl backdrop-saturate-150 shadow-brut-sm relative overflow-hidden"
        style={{
          WebkitBackdropFilter: "blur(28px) saturate(1.6)",
        }}
      >
        {/* highlight top edge · guiño liquid glass */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-paper/60" />
        <div className="border-b-2 border-ink bg-ink/85 backdrop-blur text-cream px-3 py-2 flex items-center justify-between gap-2">
          <span className="mono text-[9px] uppercase tracking-widest font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cobalt animate-blink" />
            // on this page
          </span>
          <button
            onClick={() => setCollapsed(true)}
            className="w-5 h-5 grid place-items-center border border-cream/40 hover:bg-cream hover:text-ink transition-colors"
            aria-label="minimizar tabla de contenido"
          >
            <Minus className="w-3 h-3" />
          </button>
        </div>
        <ul className="p-2 space-y-0.5">
          {sections.map((s) => {
            const isActive = topActive === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`flex items-center gap-2 px-2 py-1.5 mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                    isActive
                      ? "bg-ink text-cream"
                      : "text-ink/70 hover:text-cobalt hover:bg-lime/40"
                  }`}
                >
                  <span
                    className={
                      isActive ? "text-cobalt" : "text-smoke"
                    }
                  >
                    {s.num}
                  </span>
                  <span>{s.label}</span>
                </a>
                {s.hasChildren && inComponents && (
                  <ul className="ml-3 mt-0.5 mb-1 border-l-2 border-ink/20 pl-2 space-y-0.5">
                    {componentGroups.map((g) => {
                      const isSub = subActive === g.id;
                      return (
                        <li key={g.id}>
                          <a
                            href={`#${g.id}`}
                            className={`block px-2 py-1 mono text-[9px] uppercase tracking-[0.2em] transition-colors truncate ${
                              isSub
                                ? "text-cobalt"
                                : "text-ink/60 hover:text-ink"
                            }`}
                          >
                            <span
                              className={`mr-1.5 ${
                                isSub ? "text-cobalt" : "text-smoke/70"
                              }`}
                            >
                              {g.num}
                            </span>
                            {g.title.toLowerCase()}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
