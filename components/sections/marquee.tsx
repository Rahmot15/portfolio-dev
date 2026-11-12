import { TechTile } from "@/components/ui/tech-icon";
import { technologies } from "@/data/skills";
import type { Tech } from "@/types";

const top = technologies.filter((t) => t.category === "frontend" || t.category === "backend");
const bottom = technologies.filter((t) => t.category === "database" || t.category === "tools");

export default function Marquee() {
  return (
    <section
      aria-label="Technologies I work with"
      className="marquee-slow relative overflow-hidden border-b border-line bg-surface py-6"
    >
      <Row items={top} />
      <div className="my-4 h-px w-full bg-line" />
      <Row items={bottom} reverse />
    </section>
  );
}

function Row({ items, reverse }: { items: Tech[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee-track ${reverse ? "rev" : ""}`}>
      {doubled.map((t, i) => (
        <span
          key={`${t.name}-${i}`}
          aria-hidden={i >= items.length}
          className="group flex shrink-0 items-center gap-4 px-6"
        >
          <TechTile
            tech={t}
            size={42}
            className="transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
          />
          <span className="display text-[clamp(1.35rem,2.9vw,2.4rem)] text-ink/85 transition-colors duration-300 group-hover:text-gold">
            {t.name}
          </span>
          <span className="ml-4 text-sm text-gold/50">✦</span>
        </span>
      ))}
    </div>
  );
}
