import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#top"
      className="fixed bottom-5 right-5 z-40 group inline-flex items-center gap-2 border-2 border-ink bg-cobalt text-cream px-3 py-2 shadow-brut mono text-[10px] uppercase tracking-widest font-bold hover:bg-lime hover:text-ink hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
      aria-label="volver arriba"
    >
      <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
      <span>top</span>
    </a>
  );
}
