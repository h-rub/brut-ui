import { useEffect, useState } from "react";

export function TopBar() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");

  return (
    <div className="sticky top-0 z-40 bg-ink text-cream border-b-2 border-ink">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-10 flex items-center justify-between mono text-[10px] uppercase tracking-[0.25em]">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-lime rounded-full" />
          <span>online · brut-ui/v0.1</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-cream/70">
          <span>~/brut-ui</span>
          <span className="text-cobalt tabular-nums">{hh}:{mm}:{ss}</span>
        </div>
      </div>
    </div>
  );
}
