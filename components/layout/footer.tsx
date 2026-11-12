"use client";

import { motion } from "motion/react";
import { TbArrowUp } from "react-icons/tb";
import { setCursor } from "@/components/layout/cursor";
import { FitText } from "@/components/ui/fit-text";
import { profile, socials } from "@/data/profile";
import { useClock, useMagnetic } from "@/lib/hooks";

export default function Footer() {
  const time = useClock(profile.tz);
  const topRef = useMagnetic<HTMLButtonElement>(0.25);

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bgsoft pt-16">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-10 border-b border-line pb-12 md:grid-cols-3">
          <div>
            <span className="mono-label">Status</span>
            <p className="mt-3 flex items-center gap-2.5 font-display text-lg font-bold text-ink">
              <span className="relative grid h-2 w-2 place-items-center">
                <span className="pulse-ring absolute inset-0" />
                <span className="h-2 w-2 rounded-full bg-mint" />
              </span>
              Open to work
            </p>
            <p className="mt-1 text-[0.88rem] text-muted">Full-time roles & selected freelance</p>
          </div>

          <div>
            <span className="mono-label">Local time</span>
            <p className="mt-3 font-display text-lg font-bold text-ink tabular-nums">
              {time} <span className="text-muted">GMT+6</span>
            </p>
            <p className="mt-1 text-[0.88rem] text-muted">{profile.location}</p>
          </div>

          <div className="md:text-right">
            <span className="mono-label">Elsewhere</span>
            <div className="mt-3 flex gap-2.5 md:justify-end">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    onMouseEnter={() => setCursor({ variant: "link" })}
                    onMouseLeave={() => setCursor({ variant: "default" })}
                    className="grid h-11 w-11 place-items-center rounded-full border border-linestrong text-ink transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-bg"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <button
          ref={topRef}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onMouseEnter={() => setCursor({ variant: "link" })}
          onMouseLeave={() => setCursor({ variant: "default" })}
          className="group mx-auto mt-12 flex items-center gap-4 font-mono text-[0.66rem] tracking-[0.24em] text-dim uppercase transition-colors hover:text-ink"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full border border-linestrong transition-all duration-500 group-hover:-translate-y-1 group-hover:border-gold group-hover:bg-gold group-hover:text-bg">
            <TbArrowUp className="h-4 w-4" aria-hidden />
          </span>
          Back to top
        </button>
      </div>

      <div className="relative mt-10 overflow-hidden px-3 select-none" aria-hidden>
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <FitText
            measure={profile.first}
            max={420}
            className="display text-center leading-[0.8] text-ink/10 transition-colors duration-700 hover:text-gold/25"
          >
            <span className="block">{profile.first}</span>
          </FitText>
        </motion.div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 px-5 py-6 text-center font-mono text-[0.6rem] tracking-[0.16em] text-muted uppercase sm:flex-row sm:px-8 sm:text-left">
          <span>
            © {new Date().getFullYear()} {profile.name} — All rights reserved
          </span>
          <span className="flex items-center gap-2">
            TypeScript · React · Tailwind · Motion
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-coral" />
          </span>
        </div>
      </div>
    </footer>
  );
}
