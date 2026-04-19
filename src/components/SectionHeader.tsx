export function SectionHeader({
  number,
  title,
  path,
}: {
  number: string;
  title: string;
  path: string;
}) {
  return (
    <div className="border-b-2 border-ink pb-3 flex items-center justify-between gap-4">
      <div className="flex items-baseline gap-4">
        <span className="mono text-[10px] uppercase tracking-[0.3em] text-smoke">
          §{number}
        </span>
        <span className="display text-xl md:text-2xl font-bold tracking-tight">
          {title}
        </span>
      </div>
      <span className="mono text-[10px] uppercase tracking-widest text-smoke hidden md:inline">
        {path}
      </span>
    </div>
  );
}
