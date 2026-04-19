import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function Copyable({
  value,
  label,
}: {
  value: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  };
  return (
    <button
      onClick={onClick}
      className="mono text-[10px] uppercase tracking-widest hover:text-cobalt transition-colors inline-flex items-center gap-1.5"
      aria-label={`copiar ${label ?? value}`}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" /> copied
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" /> {label ?? value}
        </>
      )}
    </button>
  );
}
