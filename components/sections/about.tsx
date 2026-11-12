"use client";

import { motion } from "motion/react";
import { TechTile } from "@/components/ui/tech-icon";
import { Reveal, SplitChars } from "@/components/ui/reveal";
import { objective, principles, profile, strengths, summary } from "@/data/profile";
import { findTech } from "@/data/skills";
import { useTilt } from "@/lib/hooks";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const facts = [
  { k: "Education", v: profile.education.degree, sub: profile.education.subject },
  { k: "Institution", v: "Nawabganj Govt. College", sub: profile.location },
  { k: "Experience", v: profile.experience, sub: "Learning & building" },
  { k: "Open to", v: "Full-time roles", sub: "& selected freelance" },
];

export default function About() {
  return (
    <section id="about" className="relative border-b border-line py-24 sm:py-32">
      <div className="hatch pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="relative mx-auto grid max-w-[1600px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* ---------- sticky ID card ---------- */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <DevCard />
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 grid grid-cols-2 border-t border-l border-line">
                {facts.map((f) => (
                  <div
                    key={f.k}
                    className="border-r border-b border-line bg-bg p-4 transition-colors duration-300 hover:bg-surface"
                  >
                    <p className="mono-label text-[0.56rem]">{f.k}</p>
                    <p className="mt-1.5 font-display text-[0.98rem] font-bold text-ink">{f.v}</p>
                    <p className="mt-0.5 text-[0.8rem] text-muted">{f.sub}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------- story ---------- */}
        <div className="lg:col-span-7">
          <div className="mb-10">
            <span className="mono-label">(02) — About me</span>
            <h2 className="display mt-4 text-[clamp(2.4rem,7vw,5.4rem)]">
              <SplitChars text="Curiosity" className="text-ink" />
              <br />
              <SplitChars text="turned into" delay={0.1} className="outline-text" />
              <br />
              <SplitChars text="a craft." delay={0.2} className="text-gold" />
            </h2>
          </div>

          <div className="max-w-2xl space-y-6">
            {summary.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-[1.05rem] leading-[1.75] text-dim sm:text-[1.14rem]">
                  {i === 0 ? (
                    <>
                      <span className="float-left mt-1 mr-3 font-display text-[3.4rem] leading-[0.72] font-extrabold text-gold">
                        {p.charAt(0)}
                      </span>
                      {p.slice(1)}
                    </>
                  ) : (
                    p
                  )}
                </p>
              </Reveal>
            ))}
          </div>

          {/* how I work */}
          <div className="mt-14">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="mono-label">How I work</span>
                <span className="h-px flex-1 bg-line" />
              </div>
            </Reveal>
            <div className="mt-4">
              {principles.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.07}>
                  <div className="group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-1 border-b border-line py-6 transition-colors duration-500 hover:bg-surface sm:grid-cols-[4rem_1.1fr_1.4fr] sm:gap-x-8">
                    <span className="font-mono text-[0.72rem] tracking-[0.18em] text-gold transition-transform duration-500 group-hover:translate-x-1">
                      {p.n}
                    </span>
                    <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">{p.t}</h3>
                    <p className="col-span-2 text-[0.95rem] leading-relaxed text-muted sm:col-span-1">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* strengths */}
          <div className="mt-14">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="mono-label">Strengths</span>
                <span className="h-px flex-1 bg-line" />
                <span className="font-mono text-[0.62rem] text-muted">{strengths.length}</span>
              </div>
            </Reveal>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {strengths.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 14, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease }}
                  whileHover={{ y: -4, rotate: -1.5 }}
                  className="cursor-default border border-line bg-surface px-4 py-2.5 text-[0.92rem] font-semibold text-ink transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <span className="mr-2 font-mono text-[0.6rem] text-gold">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </motion.span>
              ))}
            </div>
          </div>

          {/* objective */}
          <Reveal delay={0.1}>
            <figure className="mt-14 border-l-2 border-gold pl-6">
              <span className="mono-label">Career objective</span>
              <blockquote className="mt-3 font-display text-[clamp(1.2rem,2.2vw,1.6rem)] leading-snug font-semibold text-ink">
                “{objective}”
              </blockquote>
              <figcaption className="mt-6 flex flex-wrap items-end justify-between gap-6">
                <svg viewBox="0 0 220 70" className="h-14 w-auto text-ink" aria-hidden>
                  <motion.path
                    d="M8 52c22-30 30-38 38-38s4 12-4 24-14 18-8 20 22-10 34-24 20-22 24-18-2 16-10 24-6 12 2 10 20-12 32-26 24-26 30-22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 2.2, ease: "easeInOut" }}
                  />
                </svg>
                <span className="font-mono text-[0.62rem] tracking-[0.16em] text-muted uppercase">— {profile.name}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function DevCard() {
  const ref = useTilt<HTMLDivElement>(6);
  const next = findTech("Next.js");
  const ts = findTech("TypeScript");
  const bars = Array.from({ length: 52 }, (_, i) => ((profile.name.charCodeAt(i % profile.name.length) * (i + 7)) % 4) + 1);

  return (
    <div ref={ref} className="tilt group relative">
      <div className="absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 border border-linestrong bg-surface2" aria-hidden>
        <span className="absolute top-1/2 left-1/2 h-1.5 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bg" />
      </div>

      <div className="elev relative overflow-hidden border border-linestrong bg-surface p-5 sm:p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 65%)" }}
        />

        <div className="relative flex items-center justify-between">
          <span className="mono-label">Developer ID · BD</span>
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-gold uppercase">FS-{new Date().getFullYear()}</span>
        </div>

        <div className="relative mt-5 aspect-[5/4] overflow-hidden border border-line bg-surface2">
          {profile.photo ? (
            <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover object-top" />
          ) : (
            <>
              <div className="hatch absolute inset-0 opacity-70" />
              <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-gold/25 blur-3xl" />
              <div className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-coral/20 blur-3xl" />
              <span className="display outline-text absolute inset-0 grid place-items-center text-[clamp(6rem,12vw,10rem)]">
                {profile.initials}
              </span>
              <span className="absolute bottom-3 left-3 font-mono text-[0.58rem] tracking-[0.2em] text-muted uppercase">
                &lt;FullStack /&gt;
              </span>
            </>
          )}
          {next && (
            <div className="float-y absolute top-3 right-3">
              <TechTile tech={next} size={40} />
            </div>
          )}
          {ts && (
            <div className="float-y absolute right-3 bottom-3" style={{ animationDelay: "1.4s" }}>
              <TechTile tech={ts} size={40} />
            </div>
          )}
        </div>

        <div className="relative mt-5">
          <p className="display text-[clamp(1.9rem,3vw,2.6rem)] text-ink">{profile.name}</p>
          <p className="mono-label mt-2 text-gold">{profile.role}</p>
        </div>

        <dl className="relative mt-5 grid grid-cols-[5.2rem_1fr] gap-y-2 border-t border-line pt-4 font-mono text-[0.68rem] tracking-[0.06em]">
          <dt className="text-muted uppercase">Core</dt>
          <dd className="text-ink">Next.js · TypeScript</dd>
          <dt className="text-muted uppercase">Stack</dt>
          <dd className="text-ink">Node · Express · Prisma</dd>
          <dt className="text-muted uppercase">Base</dt>
          <dd className="text-ink">{profile.location} · GMT+6</dd>
          <dt className="text-muted uppercase">Status</dt>
          <dd className="flex items-center gap-2 text-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Open to work
          </dd>
        </dl>

        <div className="relative mt-5 flex items-end justify-between gap-4 border-t border-line pt-4">
          <div className="flex h-9 items-stretch gap-[2px]" aria-hidden>
            {bars.map((w, i) => (
              <span key={i} className={i % 9 === 4 ? "bg-transparent" : "bg-ink/75"} style={{ width: w }} />
            ))}
          </div>
          <span className="font-mono text-[0.56rem] tracking-[0.2em] text-muted uppercase">{profile.initials}-0166</span>
        </div>
      </div>
    </div>
  );
}
