"use client";

import { motion, useReducedMotion } from "motion/react";
import { SiGithub } from "react-icons/si";
import { TbArrowRight, TbArrowUpRight } from "react-icons/tb";
import { setCursor } from "@/components/layout/cursor";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frames";
import { Reveal, SplitChars } from "@/components/ui/reveal";
import { TechChip } from "@/components/ui/tech-icon";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { Link } from "@/lib/router";
import type { Accent, Project } from "@/types";
import { cn } from "@/utils/cn";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const accentBg: Record<Accent, string> = { gold: "bg-gold", coral: "bg-coral", mint: "bg-mint" };
const accentText: Record<Accent, string> = { gold: "text-gold", coral: "text-coral", mint: "text-mint" };

export default function Work() {
  return (
    <section id="work" className="relative border-b border-line">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 border-b border-line py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mono-label">(04) — Selected work</span>
            <h2 className="display mt-4 text-[clamp(2.6rem,8.6vw,7rem)]">
              <SplitChars text="Things I" className="text-ink" />
              <br />
              <SplitChars text="built" delay={0.1} className="text-gold" />{" "}
              <span className="inline-block align-middle text-[0.4em] text-coral">↗</span>
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-[0.98rem] leading-relaxed text-dim">
              {projects.length} full-stack projects, all live. Click any card to open the full case study —
              features, challenges, stack and source code.
            </p>
          </Reveal>
        </div>

        <div className="py-12 sm:py-20">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} p={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>

      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setCursor({ variant: "view", label: "GitHub" })}
        onMouseLeave={() => setCursor({ variant: "default" })}
        className="group block border-t border-line bg-bgsoft"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-10 sm:px-8 sm:py-12">
          <div className="min-w-0">
            <span className="mono-label">More code on GitHub</span>
            <p className="display mt-3 truncate text-[clamp(1.6rem,5vw,3.6rem)] normal-case text-ink transition-colors duration-500 group-hover:text-gold">
              github.com/Rahmot15
            </p>
          </div>
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-linestrong text-ink transition-all duration-500 group-hover:rotate-[-12deg] group-hover:border-gold group-hover:bg-gold group-hover:text-bg sm:h-20 sm:w-20">
            <SiGithub className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden />
          </span>
        </div>
      </a>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function ProjectCard({ p, flip }: { p: Project; flip: boolean }) {
  const reduce = useReducedMotion();
  const href = `/projects/${p.slug}`;
  const visible = p.stack.slice(0, 5);
  const extra = p.stack.length - visible.length;

  const enterCard = () => setCursor({ variant: "view", label: "Open" });
  const leaveCard = () => setCursor({ variant: "default" });
  const enterButtons = () => setCursor({ variant: "link" });

  return (
    <article
      onMouseEnter={enterCard}
      onMouseLeave={leaveCard}
      className={cn(
        "group relative grid items-center gap-10 border-t border-line py-14 first:border-t-0 lg:grid-cols-12 lg:gap-12",
        flip && "lg:[direction:rtl]"
      )}
    >
      {/* stretched link — the whole card opens the case study */}
      <Link href={href} aria-label={`Open the ${p.name} case study`} className="absolute inset-0 z-10" />

      {/* screenshot */}
      <div className="relative lg:col-span-7 [direction:ltr]">
        <motion.div
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <BrowserFrame domain={p.domain}>
            <img
              src={p.cover}
              alt={`${p.name} — homepage screenshot`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span
              className={cn(
                "absolute top-0 left-0 px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.2em] text-black uppercase",
                accentBg[p.accent]
              )}
            >
              {p.index} / {p.kind}
            </span>
            <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end gap-6 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {p.highlights.map((m) => (
                <div key={m.k} className="border-l border-white/30 pl-3">
                  <p className="font-mono text-[0.55rem] tracking-[0.18em] text-white/70 uppercase">{m.k}</p>
                  <p className="font-display text-lg font-bold text-white sm:text-xl">{m.v}</p>
                </div>
              ))}
              <span className="ml-auto hidden items-center gap-2 font-mono text-[0.6rem] tracking-[0.18em] text-white uppercase sm:flex">
                Case study <TbArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
          </BrowserFrame>
        </motion.div>

        {p.mobile && (
          <motion.div
            className={cn("absolute -bottom-8 hidden w-[19%] min-w-[92px] sm:block", flip ? "-left-4" : "-right-4")}
            initial={{ opacity: 0, y: 50, rotate: flip ? -8 : 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: flip ? -3 : 3 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.1, delay: 0.35, ease }}
          >
            <div className="transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-3">
              <PhoneFrame src={p.mobile} alt={`${p.name} on mobile`} />
            </div>
          </motion.div>
        )}
      </div>

      {/* copy — clicks fall through to the stretched link, except the buttons */}
      <div className="pointer-events-none relative z-20 lg:col-span-5 [direction:ltr]">
        <Reveal delay={0.05}>
          <div className="flex items-center gap-4">
            <span className="display outline-text text-[clamp(2.6rem,6vw,4.6rem)] opacity-40">{p.index}</span>
            <span className={cn("font-mono text-[0.64rem] tracking-[0.2em] uppercase", accentText[p.accent])}>
              {p.architecture}
            </span>
          </div>

          <h3 className="display mt-1 text-[clamp(2.2rem,5.4vw,4rem)] text-ink transition-colors duration-500 group-hover:text-gold">
            {p.name}
          </h3>
          <p className="mt-3 font-display text-lg leading-snug font-semibold text-ink/80">{p.tagline}</p>
          <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-dim">{p.summary}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {visible.map((n) => (
              <TechChip key={n} name={n} />
            ))}
            {extra > 0 && (
              <span className="inline-flex items-center border border-line px-3 py-1 font-mono text-[0.7rem] text-muted">
                +{extra} more
              </span>
            )}
          </div>

          <div
            className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3"
            onMouseEnter={enterButtons}
            onMouseLeave={enterCard}
          >
            <Link
              href={href}
              className="group/btn relative inline-flex items-center gap-3 overflow-hidden bg-ink px-6 py-3.5 font-mono text-[0.68rem] tracking-[0.18em] text-bg uppercase"
            >
              <span
                className={cn(
                  "absolute inset-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover/btn:translate-x-0",
                  accentBg[p.accent]
                )}
              />
              <span className="relative z-10 transition-colors group-hover/btn:text-black">View details</span>
              <TbArrowRight className="relative z-10 h-4 w-4 transition-all duration-500 group-hover/btn:translate-x-1 group-hover/btn:text-black" />
            </Link>
            <a
              href={p.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-linestrong px-4 py-3.5 font-mono text-[0.66rem] tracking-[0.18em] text-ink uppercase transition-colors hover:border-gold hover:text-gold"
            >
              Live <TbArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={p.links.frontend}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.name} source code on GitHub`}
              className="grid h-[46px] w-[46px] place-items-center border border-linestrong text-ink transition-colors hover:border-gold hover:text-gold"
            >
              <SiGithub className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
