import { useEffect, useMemo, useRef, useState } from "react";
import { Search, CornerDownLeft } from "lucide-react";
import { componentCatalog } from "../sections/Components";

type Item = {
  name: string;
  group: string;
  groupId: string;
  section: string; // "components" etc — for top-level label
};

// Top-level sections (mirror NavBar)
const topLevel: Item[] = [
  { name: "hero", group: "Section", groupId: "top", section: "top" },
  { name: "pillars", group: "Section", groupId: "pillars", section: "pillars" },
  { name: "tokens", group: "Section", groupId: "tokens", section: "tokens" },
  { name: "components", group: "Section", groupId: "components", section: "components" },
  { name: "voice", group: "Section", groupId: "voice", section: "voice" },
  { name: "principles", group: "Section", groupId: "principles", section: "principles" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // All items (sections + components)
  const allItems: Item[] = useMemo(
    () => [
      ...topLevel,
      ...componentCatalog.map((c) => ({
        name: c.name,
        group: c.group,
        groupId: c.groupId,
        section: "components",
      })),
    ],
    []
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return allItems;
    return allItems.filter((i) =>
      (i.name + " " + i.group).toLowerCase().includes(needle)
    );
  }, [q, allItems]);

  // Toggle with ⌘K / ctrl+K, close with esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => Math.min(c + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[cursor];
        if (item) jumpTo(item);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, cursor]);

  // External trigger (from NavBar)
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("brut-ui:open-palette", onOpen);
    return () => window.removeEventListener("brut-ui:open-palette", onOpen);
  }, []);

  // focus input + reset state on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
      setQ("");
      setCursor(0);
    }
  }, [open]);

  // reset cursor when query changes
  useEffect(() => {
    setCursor(0);
  }, [q]);

  // scroll active into view
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector(
      `[data-idx="${cursor}"]`
    ) as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor, open]);

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const jumpTo = (item: Item) => {
    setOpen(false);
    // Anchor to sub-group for components, otherwise section
    const target = document.getElementById(item.groupId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${item.groupId}`);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <div className="absolute left-1/2 top-[15vh] -translate-x-1/2 w-[min(92vw,640px)] border-2 border-ink bg-cream shadow-brut-lg">
            <div className="flex items-center gap-3 px-4 h-14 border-b-2 border-ink bg-paper">
              <Search className="w-4 h-4 text-smoke" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="busca componente, sección, token..."
                className="flex-1 bg-transparent outline-none mono text-[14px] placeholder:text-smoke/50"
              />
              <span className="mono text-[9px] uppercase tracking-widest border border-ink/40 bg-cream px-2 py-1">
                esc
              </span>
            </div>

            <div
              ref={listRef}
              className="max-h-[50vh] overflow-y-auto divide-y divide-ink/10"
            >
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center mono text-[11px] uppercase tracking-widest text-smoke">
                  // sin resultados para "{q}"
                </div>
              )}
              {filtered.map((item, i) => {
                const isActive = i === cursor;
                return (
                  <button
                    key={`${item.groupId}-${item.name}-${i}`}
                    data-idx={i}
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => jumpTo(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      isActive ? "bg-cobalt text-cream" : "bg-cream hover:bg-lime/60"
                    }`}
                  >
                    <span
                      className={`mono text-[9px] uppercase tracking-[0.25em] shrink-0 ${
                        isActive ? "text-cream/70" : "text-smoke"
                      }`}
                    >
                      {item.group}
                    </span>
                    <span className="mono text-[13px] flex-1 truncate">
                      {item.name}
                    </span>
                    {isActive && (
                      <CornerDownLeft className="w-3.5 h-3.5 opacity-80" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="border-t-2 border-ink bg-paper px-4 py-2 flex items-center justify-between mono text-[9px] uppercase tracking-widest text-smoke">
              <div className="flex items-center gap-3">
                <span>
                  <span className="text-cobalt">↑↓</span> navegar
                </span>
                <span>
                  <span className="text-cobalt">⏎</span> abrir
                </span>
                <span>
                  <span className="text-cobalt">esc</span> cerrar
                </span>
              </div>
              <span>{filtered.length} results</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
