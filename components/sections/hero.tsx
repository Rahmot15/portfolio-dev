"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { TbArrowRight, TbDownload } from "react-icons/tb";
import { setCursor } from "@/components/layout/cursor";
import { useReady } from "@/components/providers/app-providers";
import { FitText } from "@/components/ui/fit-text";
import { Counter } from "@/components/ui/reveal";
import { TechTile } from "@/components/ui/tech-icon";
import { codeLines, profile, roles } from "@/data/profile";
import { projects } from "@/data/projects";
import { findTech, technologies } from "@/data/skills";
import { useMagnetic, useScramble } from "@/lib/hooks";
import { Link } from "@/lib/router";
import { cn } from "@/utils/cn";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stats = [
  { value: 2, suffix: "+", label: "Years of building" },
  { value: projects.length, suffix: "", label: "Live full-stack projects" },
  { value: technologies.length, suffix: "", label: "Technologies & tools" },
  { value: 100, suffix: "%", label: "Self-taught" },
];

export default function Hero() {
  const ready = useReady();
  const wrap = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const role = useScramble(roles, 70, 2300);

  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const sx = useSpring(gx, { stiffness: 60, damping: 20, mass: 0.8 });
  const sy = useSpring(gy, { stiffness: 60, damping: 20, mass: 0.8 });
  const glow = useMotionTemplate`radial-gradient(440px circle at ${sx}px ${sy}px, var(--glow), transparent 70%)`;

  useEffect(() => {
    const el = wrap.current;
    if (!el || reduce) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      gx.set(e.clientX - r.left);
      gy.set(e.clientY - r.top);
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [gx, gy, reduce]);

  const workRef = useMagnetic<HTMLAnchorElement>(0.28);
  const cvRef = useMagnetic<HTMLAnchorElement>(0.28);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, delay, ease },
  });
  const line = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { y: "120%" },
    animate: ready ? { y: "0%", opacity: 1 } : undefined,
    transition: { duration: 1.05, delay, ease },
  });

  return (
    <section
      id="top"
      ref={wrap}
      className="relative min-h-[100svh] overflow-hidden border-b border-line pt-28 pb-10 sm:pt-32"
    >
      <div className="gridlines pointer-events-none absolute inset-0 opacity-70" />
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      <div className="pointer-events-none absolute -top-24 -left-40 h-[520px] w-[520px] rounded-full bg-coral/8 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-mint/6 blur-[130px]" />

      <Seal ready={ready} />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        <motion.div
          className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="mono-label">(01) — {profile.role}</span>
          <span className="mono-label hidden md:block">Next.js · TypeScript · Node.js</span>
          <span className="mono-label">{profile.location} · GMT+6</span>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---------- left: name & intro ---------- */}
          <div className="lg:col-span-7 xl:col-span-8">
            <h1 className="display">
              <FitText measure={profile.first} max={200}>
                <span className="mask-line">
                  <motion.span className="flex items-center gap-[0.2em]" {...line(0.35)}>
                    <span className="outline-text">{profile.prefix}</span>
                    <span className="hidden flex-col gap-[0.5em] font-mono text-[max(0.6rem,0.072em)] leading-none font-normal tracking-[0.22em] text-muted sm:flex">
                      {profile.titles.map((t, i) => (
                        <span key={t} className={i === 1 ? "text-gold" : undefined}>
                          {t}
                        </span>
                      ))}
                    </span>
                  </motion.span>
                </span>
                <span className="mask-line">
                  <motion.span className="block text-ink" {...line(0.47)}>
                    {profile.first}
                  </motion.span>
                </span>
              </FitText>
            </h1>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="font-mono text-[0.72rem] tracking-[0.22em] text-muted uppercase">I build</span>
              <span className="relative font-mono text-[0.86rem] tracking-[0.06em] text-gold sm:text-base" aria-live="off">
                {role}
                <span className="caret ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-gold" />
              </span>
              <span className="h-px min-w-8 flex-1 bg-line" />
            </div>

            <motion.p className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-dim sm:text-lg" {...rise(0.85)}>
              Self-taught full-stack developer from {profile.location}, building modern, responsive and
              secure web applications. <span className="font-semibold text-ink">Next.js</span> and{" "}
              <span className="font-semibold text-ink">TypeScript</span> up front — Node.js, Express and
              PostgreSQL behind them. Clean interfaces, reliable APIs, real products.
            </motion.p>

            <motion.div className="mt-9 flex flex-wrap items-center gap-4" {...rise(1)}>
              <Link
                ref={workRef}
                href="/#work"
                onMouseEnter={() => setCursor({ variant: "hidden" })}
                onMouseLeave={() => setCursor({ variant: "default" })}
                className="group relative inline-flex items-center gap-3 overflow-hidden bg-gold px-7 py-4 font-mono text-[0.7rem] tracking-[0.2em] text-bg uppercase"
              >
                <span className="absolute inset-0 -translate-y-full bg-ink transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0" />
                <span className="relative z-10">See my projects</span>
                <TbArrowRight className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>

              <a
                ref={cvRef}
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursor({ variant: "link" })}
                onMouseLeave={() => setCursor({ variant: "default" })}
                className="group inline-flex items-center gap-3 border border-linestrong px-7 py-4 font-mono text-[0.7rem] tracking-[0.2em] text-ink uppercase transition-colors duration-300 hover:border-gold"
              >
                <TbDownload className="h-4 w-4 text-gold transition-transform duration-300 group-hover:translate-y-0.5" />
                Download resume
              </a>
            </motion.div>

            <motion.p className="mt-6 font-mono text-[0.68rem] tracking-[0.12em] text-muted" {...rise(1.1)}>
              or write to{" "}
              <a href={`mailto:${profile.email}`} className="sweep pb-0.5 text-ink">
                {profile.email}
              </a>
            </motion.p>
          </div>

          {/* ---------- right: live code ---------- */}
          <motion.div
            className="lg:col-span-5 xl:col-span-4"
            initial={{ opacity: 0, y: 40 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.75, ease }}
          >
            <CodeWindow start={ready} />
          </motion.div>
        </div>

        {/* ---------- stats ---------- */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-y-8 border-t border-line pt-8 md:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 0.9, delay: 1.2 }}
        >
          {stats.map((s, i) => (
            <div key={s.label} className={cn("flex flex-col gap-1 px-1 md:px-6", i > 0 && "md:border-l md:border-line")}>
              <span className="display text-[clamp(2rem,4.6vw,3.4rem)] text-ink">
                <Counter to={s.value} suffix={s.suffix} />
              </span>
              <span className="mono-label">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Seal({ ready }: { ready: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute top-24 right-[4vw] hidden xl:block"
      initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
      animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
      transition={{ duration: 1.2, delay: 0.9, ease }}
      aria-hidden
    >
      <div className="spin-slow relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <defs>
            <path id="seal-path" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <text fill="var(--muted)" style={{ fontSize: 9, letterSpacing: "0.18em", fontFamily: "var(--font-mono)" }}>
            <textPath href="#seal-path" textLength="272" lengthAdjust="spacing">
              NEXT.JS · TYPESCRIPT · FULL STACK ·
            </textPath>
          </text>
        </svg>
        <span className="absolute inset-0 grid place-items-center text-gold">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l2.6 8.1L22 4.3l-4.6 7.7L24 12l-6.6 0L22 19.7l-7.4-3.8L12 24l-2.6-8.1L2 19.7l4.6-7.7L0 12l6.6 0L2 4.3l7.4 3.8z" />
          </svg>
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
function CodeWindow({ start }: { start: boolean }) {
  const [typed, setTyped] = useState<string[]>([]);
  const [cursorLine, setCursorLine] = useState(0);
  const reduce = useReducedMotion();
  const next = findTech("Next.js");
  const ts = findTech("TypeScript");

  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setTyped([...codeLines]);
      setCursorLine(codeLines.length - 1);
      return;
    }
    const timers: number[] = [];
    const buffer = codeLines.map(() => "");
    let li = 0;
    let ci = 0;

    const tick = () => {
      if (li >= codeLines.length) return;
      const text = codeLines[li];
      if (ci <= text.length) {
        buffer[li] = text.slice(0, ci);
        setTyped(buffer.slice(0, li + 1));
        setCursorLine(li);
        ci++;
        timers.push(window.setTimeout(tick, text[ci - 1] === " " ? 14 : 26));
      } else {
        li++;
        ci = 0;
        timers.push(window.setTimeout(tick, 110));
      }
    };
    timers.push(window.setTimeout(tick, 900));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [start, reduce]);

  return (
    <div className="relative">
      <div className="absolute -inset-3 border border-line opacity-60" aria-hidden />
      <div className="relative overflow-hidden border border-linestrong bg-surface/90 backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-line bg-surface2 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-coral/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
          </div>
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-muted uppercase">developer.ts</span>
          <span className="font-mono text-[0.6rem] text-[#3D8BE0]">TS</span>
        </div>

        <div className="px-4 py-4 font-mono text-[0.7rem] leading-[1.8] sm:text-[0.78rem]" aria-label="Code describing MD. Rahmatullah">
          {codeLines.map((_, i) => {
            const shown = typed[i] ?? "";
            return (
              <div key={i} className="flex gap-3 whitespace-pre">
                <span className="w-4 shrink-0 text-right text-muted/45 select-none">{i + 1}</span>
                <span>
                  {highlight(shown)}
                  {cursorLine === i && typed.length - 1 === i && (
                    <span className="caret ml-px inline-block h-[1em] w-[7px] translate-y-[2px] bg-gold" />
                  )}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-line bg-surface2 px-4 py-2 font-mono text-[0.58rem] tracking-[0.14em] text-muted uppercase">
          <span>strict · ESLint · Prettier</span>
          <span className="text-mint">✓ 0 errors</span>
        </div>
      </div>

      {next && (
        <div className="float-y absolute -top-6 -left-6 hidden items-center gap-2 border border-linestrong bg-bg py-1.5 pr-3 pl-1.5 font-mono text-[0.6rem] tracking-[0.16em] text-ink uppercase sm:flex">
          <TechTile tech={next} size={24} /> App Router
        </div>
      )}
      {ts && (
        <div
          className="float-y absolute -right-5 -bottom-7 hidden items-center gap-2 border border-linestrong bg-bg py-1.5 pr-3 pl-1.5 font-mono text-[0.6rem] tracking-[0.16em] text-ink uppercase sm:flex"
          style={{ animationDelay: "1.6s" }}
        >
          <TechTile tech={ts} size={24} /> Type-safe
        </div>
      )}
    </div>
  );
}

const TOKEN = /("[^"]*"?|\/\/.*$|\b(?:export|const|import|type|from|await)\b|\b(?:Infinity|\d+)\b)/g;
const KEYWORD = /^(?:export|const|import|type|from|await)$/;

/** Cheap token colouring: keywords, strings, numbers, comments. */
function highlight(text: string) {
  if (!text) return null;
  return text.split(TOKEN).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("//"))
      return (
        <span key={i} className={part.includes("✓") ? "text-mint" : "text-muted"}>
          {part}
        </span>
      );
    if (part.startsWith('"'))
      return (
        <span key={i} className="text-mint">
          {part}
        </span>
      );
    if (KEYWORD.test(part))
      return (
        <span key={i} className="text-coral">
          {part}
        </span>
      );
    if (/^(?:Infinity|\d+)$/.test(part))
      return (
        <span key={i} className="text-gold">
          {part}
        </span>
      );
    return (
      <span key={i} className="text-dim">
        {part}
      </span>
    );
  });
}
