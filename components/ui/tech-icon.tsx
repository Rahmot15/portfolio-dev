import { findTech } from "@/data/skills";
import type { Tech } from "@/types";
import { cn } from "@/utils/cn";

/** Square brand tile — always a dark backdrop so every logo colour reads in both themes. */
export function TechTile({
  tech,
  size = 44,
  className,
}: {
  tech: Tech;
  size?: number;
  className?: string;
}) {
  const Icon = tech.icon;
  return (
    <span
      className={cn("tech-tile inline-grid shrink-0 place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <Icon
        aria-hidden
        style={{
          width: Math.round(size * 0.52),
          height: Math.round(size * 0.52),
          color: tech.color ?? "var(--tile-fg)",
        }}
      />
    </span>
  );
}

/** Inline chip: tiny tile + clearly readable name. */
export function TechChip({ name, className }: { name: string; className?: string }) {
  const tech = findTech(name);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-line bg-surface/70 py-1 pr-3 pl-1 text-[0.8rem] font-semibold text-ink",
        className
      )}
    >
      {tech ? <TechTile tech={tech} size={22} /> : <span className="h-[22px] w-[22px] bg-surface2" />}
      {name}
    </span>
  );
}

/** Inner content of a skill card (used by the skills grid and project pages). */
export function TechCardBody({
  tech,
  index,
  label,
}: {
  tech: Tech;
  index?: number;
  label?: string;
}) {
  const tint = tech.color ? `color-mix(in srgb, ${tech.color} 18%, transparent)` : "var(--glow)";
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(240px circle at 22% 18%, ${tint}, transparent 70%)` }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <TechTile
          tech={tech}
          size={48}
          className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-1 group-hover:scale-105"
        />
        {index !== undefined && (
          <span className="font-mono text-[0.6rem] text-muted tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="relative mt-6">
        <p className="font-display text-[1.06rem] leading-tight font-bold text-ink sm:text-lg">
          {label ?? tech.name}
        </p>
        {tech.note && (
          <p className="mt-1.5 font-mono text-[0.6rem] tracking-[0.14em] text-muted uppercase">
            {tech.note}
          </p>
        )}
      </div>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: tech.color ?? "var(--text)" }}
      />
    </>
  );
}
