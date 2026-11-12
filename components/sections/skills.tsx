"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { TbArrowUpRight } from "react-icons/tb";
import { setCursor } from "@/components/layout/cursor";
import { Reveal, SplitChars } from "@/components/ui/reveal";
import { TechCardBody, TechTile } from "@/components/ui/tech-icon";
import { categories, coreStack, findTech, orbitStack, practices, technologies } from "@/data/skills";
import { Link } from "@/lib/router";
import type { SkillCategory } from "@/types";
import { cn } from "@/utils/cn";

type Filter = "all" | SkillCategory;

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const hoverLink = {
  onMouseEnter: () => setCursor({ variant: "link" }),
  onMouseLeave: () => setCursor({ variant: "default" }),
};

export default function Skills() {
  const [filter, setFilter] = useState<Filter>("all");

  const techs = filter === "all" ? technologies : technologies.filter((t) => t.category === filter);
  const prax = filter === "all" ? practices : practices.filter((p) => p.category === filter);
  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: technologies.length },
    ...categories.map((c) => ({
      id: c.id,
      label: c.label,
      count: technologies.filter((t) => t.category === c.id).length,
    })),
  ];
  const blurb =
    filter === "all"
      ? "Every technology I use in real projects — filter by layer, hover any card."
      : categories.find((c) => c.id === filter)?.blurb ?? "";

  return (
    <section id="skills" className="relative overflow-hidden border-b border-line py-24 sm:py-32">
      <div className="pointer-events-none absolute top-1/4 -right-40 h-[480px] w-[480px] rounded-full bg-gold/7 blur-[140px]" />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* header */}
        <div className="mb-14 flex flex-col gap-8 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mono-label">(03) — Skills & stack</span>
            <h2 className="display mt-4 text-[clamp(2.4rem,7.4vw,5.6rem)]">
              <SplitChars text="Tools I" className="text-ink" />
              <br />
              <SplitChars text="build with" delay={0.12} className="text-gold" />
            </h2>
          </div>
          <Reveal delay={0.15} className="max-w-md">
            <p className="text-[0.98rem] leading-relaxed text-dim">
              Next.js and TypeScript at the core, a typed Node.js / Express API layer behind them, and
              PostgreSQL or MongoDB underneath — every logo below is something I've shipped with.
            </p>
            <div className="mt-6 flex gap-10">
              {[
                { n: technologies.length, l: "Technologies" },
                { n: practices.length, l: "Practices" },
                { n: categories.length, l: "Layers" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="display text-4xl text-ink">{s.n}</p>
                  <p className="mono-label mt-1.5">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* core stack */}
        <div className="grid border-t border-l border-line lg:grid-cols-12">
          {coreStack.map((c, i) => (
            <CoreCard key={c.name} {...c} index={i + 1} />
          ))}
          <OrbitCard />
        </div>

        {/* filter */}
        <div className="mt-16 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter skills by layer" className="flex flex-wrap gap-2">
            {tabs.map((t) => {
              const active = filter === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(t.id)}
                  {...hoverLink}
                  className={cn(
                    "relative border px-4 py-2.5 font-mono text-[0.68rem] tracking-[0.16em] uppercase transition-colors duration-300",
                    active ? "border-gold text-bg" : "border-line text-dim hover:border-linestrong hover:text-ink"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="skills-tab"
                      className="absolute inset-0 bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">
                    {t.label} <span className="opacity-60">{t.count}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={filter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="max-w-md text-[0.92rem] text-muted lg:text-right"
            >
              {blurb}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* technology grid */}
        <motion.ul
          layout
          className="relative mt-8 grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {techs.map((t, i) => (
              <motion.li
                key={t.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease, delay: Math.min(i * 0.015, 0.25) }}
                {...hoverLink}
                className="group relative min-h-[150px] overflow-hidden border-r border-b border-line bg-bg p-5 transition-colors duration-500 hover:bg-surface"
              >
                <TechCardBody tech={t} index={i} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* practices */}
        <AnimatePresence initial={false}>
          {prax.length > 0 && (
            <motion.div
              key="practices"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease }}
              className="overflow-hidden"
            >
              <div className="pt-12">
                <div className="flex items-center gap-4">
                  <span className="mono-label">Practices & concepts</span>
                  <span className="h-px flex-1 bg-line" />
                  <span className="font-mono text-[0.62rem] text-muted tabular-nums">
                    {String(prax.length).padStart(2, "0")}
                  </span>
                </div>
                <motion.ul layout className="relative mt-6 flex flex-wrap gap-3">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {prax.map((p, i) => {
                      const Icon = p.icon;
                      return (
                        <motion.li
                          key={p.name}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4, ease, delay: Math.min(i * 0.02, 0.2) }}
                          className="group flex items-center gap-3 border border-line bg-surface py-2.5 pr-4 pl-2.5 transition-colors duration-300 hover:border-gold"
                        >
                          <span className="grid h-9 w-9 place-items-center bg-gold/12 text-gold transition-transform duration-500 group-hover:-rotate-6">
                            <Icon className="h-5 w-5" aria-hidden />
                          </span>
                          <span className="text-[0.92rem] font-semibold text-ink">{p.name}</span>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </motion.ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function CoreCard({
  name,
  label,
  line,
  usedIn,
  index,
}: {
  name: string;
  label: string;
  line: string;
  usedIn: string;
  index: number;
}) {
  const tech = findTech(name);
  if (!tech) return null;
  const Icon = tech.icon;

  return (
    <div className="group relative overflow-hidden border-r border-b border-line bg-bg p-7 transition-colors duration-500 hover:bg-surface sm:p-9 lg:col-span-4">
      <Icon
        aria-hidden
        className="pointer-events-none absolute -right-12 -bottom-12 h-64 w-64 opacity-[0.07] transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110 group-hover:rotate-12"
        style={{ color: tech.color ?? "var(--text)" }}
      />
      <div className="relative flex items-center justify-between">
        <span className="mono-label text-gold">★ {label}</span>
        <span className="font-mono text-[0.6rem] text-muted">0{index}</span>
      </div>
      <TechTile
        tech={tech}
        size={80}
        className="relative mt-8 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-rotate-3 group-hover:scale-105"
      />
      <h3 className="display relative mt-8 text-[clamp(2.4rem,4.4vw,3.6rem)] text-ink">{tech.name}</h3>
      <p className="relative mt-3 max-w-sm text-[0.95rem] leading-relaxed text-dim">{line}</p>
      <Link
        href={`/projects/${usedIn}`}
        {...hoverLink}
        className="relative mt-6 inline-flex items-center gap-2 font-mono text-[0.64rem] tracking-[0.18em] text-ink uppercase"
      >
        <span className="sweep pb-0.5">See it in Shibir</span>
        <TbArrowUpRight className="h-4 w-4 text-gold" aria-hidden />
      </Link>
    </div>
  );
}

function OrbitCard() {
  return (
    <div className="relative flex flex-col overflow-hidden border-r border-b border-line bg-bg p-7 sm:p-9 lg:col-span-4">
      <span className="mono-label">Daily drivers</span>
      <div className="relative mx-auto my-6 aspect-square w-full max-w-[250px]">
        {[0, 1, 2].map((ring) => {
          const inset = ring * 16 + 5;
          const dur = 24 + ring * 10;
          const reverse = ring % 2 === 1;
          return (
            <div
              key={ring}
              className="orbit absolute rounded-full border border-line"
              style={{
                inset: `${inset}%`,
                animationDuration: `${dur}s`,
                animationDirection: reverse ? "reverse" : "normal",
              }}
            >
              {[0, 1].map((k) => {
                const tech = findTech(orbitStack[ring * 2 + k] ?? "");
                if (!tech) return null;
                return (
                  <div
                    key={k}
                    className={cn("absolute left-1/2 -translate-x-1/2", k === 0 ? "-top-[17px]" : "-bottom-[17px]")}
                  >
                    <div
                      className="orbit"
                      style={{
                        animationDuration: `${dur}s`,
                        animationDirection: reverse ? "normal" : "reverse",
                      }}
                    >
                      <TechTile tech={tech} size={34} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/50 bg-bg font-display text-sm font-bold text-gold">
            MR
          </span>
        </div>
      </div>
      <p className="mt-auto text-center text-[0.86rem] leading-relaxed text-muted">
        {orbitStack.join(" · ")}
      </p>
    </div>
  );
}
