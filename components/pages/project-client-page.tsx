"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import type { IconType } from "react-icons";
import { SiGithub } from "react-icons/si";
import { TbArrowLeft, TbArrowRight, TbArrowUpRight, TbCheck } from "react-icons/tb";
import { setCursor } from "@/components/layout/cursor";
import { useReady } from "@/components/providers/app-providers";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frames";
import { FitText } from "@/components/ui/fit-text";
import { Reveal, SplitChars } from "@/components/ui/reveal";
import { TechCardBody } from "@/components/ui/tech-icon";
import { projects } from "@/data/projects";
import { findTech } from "@/data/skills";
import { Link } from "@/lib/router";
import type { Accent, Project } from "@/types";
import { cn } from "@/utils/cn";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const accentText: Record<Accent, string> = { gold: "text-gold", coral: "text-coral", mint: "text-mint" };
const accentBg: Record<Accent, string> = { gold: "bg-gold", coral: "bg-coral", mint: "bg-mint" };
const accentGlow: Record<Accent, string> = { gold: "bg-gold/12", coral: "bg-coral/12", mint: "bg-mint/12" };

const hoverLink = {
  onMouseEnter: () => setCursor({ variant: "link" }),
  onMouseLeave: () => setCursor({ variant: "default" }),
};

export default function ProjectClientPage({ project }: { project: Project }) {
  return <ProjectView p={project} />;
}

/* ------------------------------------------------------------------ */
function ProjectView({ p }: { p: Project }) {
  const ready = useReady();
  const reduce = useReducedMotion();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  const shotRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: shotRef, offset: ["start end", "end start"] });
  const shotScale = useTransform(scrollYProgress, [0, 0.55], [1.12, 1]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const intro = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      {/* ================= header ================= */}
      <section className="relative overflow-hidden border-b border-line pt-28 pb-14 sm:pt-32">
        <div className="gridlines pointer-events-none absolute inset-0 opacity-60" />
        <div className={cn("pointer-events-none absolute -top-32 right-0 h-[520px] w-[520px] rounded-full blur-[140px]", accentGlow[p.accent])} />

        <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
          <motion.div
            className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.2em] text-muted uppercase">
              <Link href="/#top" className="sweep hover:text-ink" {...hoverLink}>
                Index
              </Link>
              <span>/</span>
              <Link href="/#work" className="sweep hover:text-ink" {...hoverLink}>
                Work
              </Link>
              <span>/</span>
              <span className="text-ink">{p.name}</span>
            </nav>
            <span className="mono-label">
              Case study {p.index} — {String(projects.length).padStart(2, "0")}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={ready ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            <Link
              href="/#work"
              {...hoverLink}
              className="group mt-8 inline-flex items-center gap-3 font-mono text-[0.68rem] tracking-[0.2em] text-dim uppercase transition-colors hover:text-ink"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border border-linestrong transition-all duration-500 group-hover:-translate-x-1 group-hover:border-gold group-hover:bg-gold group-hover:text-bg">
                <TbArrowLeft className="h-4 w-4" aria-hidden />
              </span>
              All projects
            </Link>
          </motion.div>

          <h1 className="display mt-10">
            <FitText measure={p.name} max={250}>
              <span className="mask-line">
                <motion.span
                  className="block text-ink"
                  initial={reduce ? { opacity: 0 } : { y: "120%" }}
                  animate={ready ? { y: "0%", opacity: 1 } : undefined}
                  transition={{ duration: 1.05, delay: 0.3, ease }}
                >
                  {p.name}
                </motion.span>
              </span>
            </FitText>
          </h1>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <motion.div className="lg:col-span-7" {...intro(0.55)}>
              <p className={cn("mono-label", accentText[p.accent])}>{p.kind}</p>
              <p className="mt-3 font-display text-[clamp(1.4rem,2.8vw,2.3rem)] leading-[1.1] font-bold tracking-tight text-ink">
                {p.tagline}
              </p>
            </motion.div>
            <motion.div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end" {...intro(0.65)}>
              <ExtButton href={p.links.live} primary>
                Live website
              </ExtButton>
              <ExtButton href={p.links.frontend} icon={SiGithub}>
                Frontend
              </ExtButton>
              <ExtButton href={p.links.backend} icon={SiGithub}>
                Backend
              </ExtButton>
            </motion.div>
          </div>

          <motion.dl className="mt-12 grid grid-cols-2 border-t border-l border-line lg:grid-cols-4" {...intro(0.75)}>
            {[
              { k: "Type", v: "Full-stack web app" },
              { k: "Role", v: "Full-stack development" },
              { k: "Architecture", v: p.architecture },
              { k: "Status", v: "Live & deployed" },
            ].map((m, i) => (
              <div key={m.k} className="border-r border-b border-line p-4 sm:p-6">
                <dt className="mono-label text-[0.56rem]">{m.k}</dt>
                <dd className="mt-2 flex items-center gap-2 font-display text-base font-bold text-ink sm:text-lg">
                  {i === 3 && (
                    <span className="relative grid h-2 w-2 place-items-center">
                      <span className="pulse-ring absolute inset-0" />
                      <span className="h-2 w-2 rounded-full bg-mint" />
                    </span>
                  )}
                  {m.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* ================= showcase ================= */}
      <section ref={shotRef} className="relative overflow-hidden border-b border-line bg-bgsoft py-14 sm:py-20">
        <div className="hatch pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.1, delay: 0.5, ease }}
          >
            <a
              href={p.links.live}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursor({ variant: "view", label: "Visit" })}
              onMouseLeave={() => setCursor({ variant: "default" })}
              className="block"
              aria-label={`Visit ${p.domain}`}
            >
              <BrowserFrame domain={p.domain} className="elev">
                <motion.img
                  src={p.cover}
                  alt={`${p.name} homepage`}
                  style={{ scale: reduce ? 1 : shotScale }}
                  className="h-full w-full object-cover object-top"
                />
              </BrowserFrame>
            </a>
          </motion.div>

          {p.mobile && (
            <motion.div
              className="absolute right-8 bottom-6 w-[20%] max-w-[200px] min-w-[96px] sm:right-16"
              style={{ y: reduce ? 0 : phoneY }}
            >
              <motion.div
                initial={{ opacity: 0, rotate: 10, y: 50 }}
                animate={ready ? { opacity: 1, rotate: 4, y: 0 } : undefined}
                transition={{ duration: 1.1, delay: 0.85, ease }}
              >
                <PhoneFrame src={p.mobile} alt={`${p.name} on mobile`} />
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ================= overview ================= */}
      <section className="border-b border-line py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="mono-label">(01) — Overview</span>
            <h2 className="display mt-4 text-[clamp(2.2rem,5vw,4rem)]">
              <SplitChars text="The" className="text-ink" />{" "}
              <SplitChars text="project" delay={0.08} className={accentText[p.accent]} />
            </h2>
          </div>
          <div className="space-y-6 lg:col-span-8">
            {p.overview.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p
                  className={
                    i === 0
                      ? "font-display text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug font-semibold text-ink"
                      : "text-[1.05rem] leading-relaxed text-dim sm:text-lg"
                  }
                >
                  {para}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="mt-10 grid grid-cols-3 border-t border-l border-line">
                {p.highlights.map((h) => (
                  <div key={h.k} className="border-r border-b border-line p-4 sm:p-6">
                    <p className="mono-label text-[0.56rem]">{h.k}</p>
                    <p className="mt-2 font-display text-lg font-bold text-ink sm:text-2xl">{h.v}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= stack ================= */}
      <section className="border-b border-line py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <SectionHead index="02" label="Built with" title="The stack" accent={p.accent}>
            {p.stack.length} technologies working together — from the interface to the database.
          </SectionHead>
          <ul className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-5">
            {p.stack.map((name, i) => {
              const tech = findTech(name);
              return (
                <motion.li
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.6, delay: (i % 5) * 0.05, ease }}
                  className="group relative min-h-[150px] overflow-hidden border-r border-b border-line bg-bg p-5 transition-colors duration-500 hover:bg-surface"
                >
                  {tech ? (
                    <TechCardBody tech={tech} index={i} label={name} />
                  ) : (
                    <p className="font-display text-lg font-bold text-ink">{name}</p>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ================= features ================= */}
      <section className="border-b border-line py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <SectionHead index="03" label="Key features" title="What it does" accent={p.accent}>
            {p.features.length} features shipped in production.
          </SectionHead>
          <ol className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {p.features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease }}
                className="group flex items-start gap-4 border-r border-b border-line p-5 transition-colors duration-500 hover:bg-surface sm:p-6"
              >
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center text-black transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110",
                    accentBg[p.accent]
                  )}
                >
                  <TbCheck className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <span className="font-mono text-[0.6rem] text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-1 font-display text-[1.06rem] leading-snug font-bold text-ink">{f}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= contributions ================= */}
      <section className="border-b border-line bg-bgsoft py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <span className="mono-label">(04) — Challenges & contributions</span>
              <h2 className="display mt-4 text-[clamp(2.2rem,5vw,4rem)]">
                <SplitChars text="What I" className="text-ink" />
                <br />
                <SplitChars text="handled" delay={0.1} className={accentText[p.accent]} />
              </h2>
              <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed text-dim">
                The hard parts of {p.name} — and the pieces I owned end to end.
              </p>
            </div>
          </div>
          <ol className="lg:col-span-8">
            {p.contributions.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: i * 0.04, ease }}
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-line py-7 first:border-t sm:grid-cols-[5rem_1fr]"
              >
                <span className={cn("font-mono text-sm", accentText[p.accent])}>{String(i + 1).padStart(2, "0")}</span>
                <p className="font-display text-[clamp(1.2rem,2.4vw,1.9rem)] leading-snug font-bold text-ink transition-transform duration-500 group-hover:translate-x-2">
                  {c}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= links ================= */}
      <section className="border-b border-line py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <span className="mono-label">(05) — See it live</span>
          <a
            href={p.links.live}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursor({ variant: "view", label: "Visit" })}
            onMouseLeave={() => setCursor({ variant: "default" })}
            className="group mt-6 flex items-center justify-between gap-6 border-b border-line pb-8"
          >
            <span className="display min-w-0 text-[clamp(1.5rem,4.6vw,4.4rem)] break-all normal-case text-ink transition-colors duration-500 group-hover:text-gold">
              {p.domain}
            </span>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-linestrong transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-bg sm:h-20 sm:w-20">
              <TbArrowUpRight className="h-6 w-6" aria-hidden />
            </span>
          </a>

          <div className="mt-10 grid border-t border-l border-line sm:grid-cols-2">
            {[
              { k: "Frontend repository", href: p.links.frontend },
              { k: "Backend repository", href: p.links.backend },
            ].map((r) => (
              <a
                key={r.k}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                {...hoverLink}
                className="group relative flex items-center gap-5 overflow-hidden border-r border-b border-line p-6 sm:p-8"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-surface transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
                <SiGithub className="relative h-9 w-9 shrink-0 text-ink" aria-hidden />
                <span className="relative min-w-0 flex-1">
                  <span className="mono-label block">{r.k}</span>
                  <span className="mt-1.5 block truncate font-display text-lg font-bold text-ink">
                    {r.href.replace("https://", "")}
                  </span>
                </span>
                <TbArrowUpRight className="relative h-5 w-5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= next project ================= */}
      <Link
        href={`/projects/${next.slug}`}
        onMouseEnter={() => setCursor({ variant: "view", label: "Next" })}
        onMouseLeave={() => setCursor({ variant: "default" })}
        className="group relative block overflow-hidden"
      >
        <img
          src={next.cover}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover object-top opacity-0 transition-all duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-100 group-hover:opacity-20"
        />
        <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="flex items-center justify-between gap-4">
            <span className="mono-label">Next project — {next.index}</span>
            <span className="mono-label hidden sm:block">{next.kind}</span>
          </div>
          <FitText measure={next.name} max={220} className="display mt-6 text-ink transition-colors duration-500 group-hover:text-gold">
            <span className="block">{next.name}</span>
          </FitText>
          <div className="mt-6 flex items-center justify-between gap-6">
            <p className="max-w-xl text-dim">{next.tagline}</p>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-linestrong transition-all duration-500 group-hover:translate-x-2 group-hover:border-gold group-hover:bg-gold group-hover:text-bg">
              <TbArrowRight className="h-5 w-5" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </main>
  );
}

/* ------------------------------------------------------------------ */
function SectionHead({
  index,
  label,
  title,
  accent,
  children,
}: {
  index: string;
  label: string;
  title: string;
  accent: Accent;
  children: ReactNode;
}) {
  const [first, ...rest] = title.split(" ");
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div>
        <span className="mono-label">
          ({index}) — {label}
        </span>
        <h2 className="display mt-4 text-[clamp(2.2rem,5vw,4rem)]">
          <SplitChars text={first ?? ""} className="text-ink" />{" "}
          <SplitChars text={rest.join(" ")} delay={0.08} className={accentText[accent]} />
        </h2>
      </div>
      <Reveal delay={0.1}>
        <p className="max-w-sm text-[0.95rem] leading-relaxed text-dim">{children}</p>
      </Reveal>
    </div>
  );
}

function ExtButton({
  href,
  children,
  primary,
  icon: Icon,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
  icon?: IconType;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setCursor({ variant: primary ? "hidden" : "link" })}
      onMouseLeave={() => setCursor({ variant: "default" })}
      className={cn(
        "group relative inline-flex items-center gap-2.5 overflow-hidden px-5 py-3.5 font-mono text-[0.66rem] tracking-[0.18em] uppercase transition-colors duration-300",
        primary ? "bg-gold text-bg" : "border border-linestrong text-ink hover:border-gold"
      )}
    >
      {primary && (
        <span className="absolute inset-0 -translate-y-full bg-ink transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0" />
      )}
      {Icon && <Icon className="relative z-10 h-4 w-4" aria-hidden />}
      <span className="relative z-10">{children}</span>
      <TbArrowUpRight
        className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </a>
  );
}
