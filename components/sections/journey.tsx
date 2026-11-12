"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TbArrowRight, TbSchool } from "react-icons/tb";
import { setCursor } from "@/components/layout/cursor";
import { Reveal, SplitChars } from "@/components/ui/reveal";
import { TechChip } from "@/components/ui/tech-icon";
import { interests, journey, profile, story } from "@/data/profile";
import { Link } from "@/lib/router";
import { cn } from "@/utils/cn";

export default function Journey() {
  return (
    <section id="journey" className="relative border-b border-line">
      <Timeline />
      <Interests />
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const rail = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <span className="mono-label">(05) — Learning journey</span>
            <h2 className="display mt-4 text-[clamp(2.4rem,7vw,5.2rem)]">
              <SplitChars text="From HSC" className="text-ink" />
              <br />
              <SplitChars text="to full stack" delay={0.12} className="text-gold" />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed text-dim">{story}</p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-8 flex max-w-sm items-start gap-4 border border-line bg-surface p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center bg-gold/12 text-gold">
                  <TbSchool className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <p className="mono-label text-[0.56rem]">Education</p>
                  <p className="mt-1.5 font-display text-lg leading-tight font-bold text-ink">
                    {profile.education.degree}, {profile.education.subject}
                  </p>
                  <p className="mt-1 text-[0.88rem] text-muted">{profile.education.institution}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div ref={ref} className="relative lg:col-span-8">
          <div className="absolute top-2 bottom-2 left-[7px] w-px bg-line sm:left-[9px]" />
          <motion.div
            className="absolute top-2 left-[7px] w-px origin-top bg-gold sm:left-[9px]"
            style={{ scaleY: rail, height: "calc(100% - 1rem)" }}
          />

          <div className="space-y-12">
            {journey.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <article className="group relative pl-9 sm:pl-12">
                  <span className="absolute top-2 left-0 grid h-[15px] w-[15px] place-items-center sm:h-[19px] sm:w-[19px]">
                    <span className="absolute h-full w-full rounded-full border border-linestrong bg-bg transition-colors duration-500 group-hover:border-gold" />
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-all duration-500 group-hover:scale-[1.6] group-hover:bg-gold",
                        s.tags.length === 0 ? "bg-mint" : "bg-muted"
                      )}
                    />
                  </span>

                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-mono text-[0.68rem] tracking-[0.16em] text-gold uppercase">{s.label}</span>
                    <span className="font-mono text-[0.6rem] tracking-[0.16em] text-muted uppercase">{s.sub}</span>
                  </div>
                  <h3 className="display mt-2 text-[clamp(1.6rem,3.6vw,2.6rem)] text-ink">{s.title}</h3>
                  <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-dim">{s.detail}</p>

                  {s.tags.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <TechChip key={t} name={t} />
                      ))}
                    </div>
                  ) : (
                    <Link
                      href="/#contact"
                      onMouseEnter={() => setCursor({ variant: "link" })}
                      onMouseLeave={() => setCursor({ variant: "default" })}
                      className="mt-5 inline-flex items-center gap-3 border border-mint/40 bg-mint/10 px-4 py-2.5 font-mono text-[0.66rem] tracking-[0.18em] text-mint uppercase transition-colors hover:bg-mint hover:text-bg"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      Open to work — let's talk
                      <TbArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
const tints = [
  "bg-gold/12 text-gold",
  "bg-coral/12 text-coral",
  "bg-mint/12 text-mint",
];

function Interests() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    setFinePointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const scrollTo = useCallback((i: number) => {
    const el = trackRef.current;
    const cards = el ? (Array.from(el.children) as HTMLElement[]) : [];
    const card = cards[i];
    const first = cards[0];
    if (!el || !card || !first) return;
    el.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: "smooth" });
  }, []);

  // active card = the one aligned with the track's padded left edge
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
        setActive(cards.length - 1);
        return;
      }
      const edge = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft);
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.getBoundingClientRect().left - edge);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // mouse drag-to-scroll (touch devices scroll natively)
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !finePointer) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.style.scrollSnapType = "none";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.style.scrollSnapType = "";
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [finePointer]);

  return (
    <div className="relative overflow-hidden border-t border-line bg-bgsoft py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="mono-label">(06) — Beyond the code</span>
            <h2 className="display mt-4 text-[clamp(2rem,6vw,4.4rem)]">
              <SplitChars text="What I'm" className="text-ink" />{" "}
              <SplitChars text="curious about" delay={0.1} className="outline-text" />
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.66rem] tracking-[0.16em] text-muted tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(interests.length).padStart(2, "0")}
            </span>
            <NavBtn dir="prev" onClick={() => scrollTo(Math.max(0, active - 1))} disabled={active === 0} />
            <NavBtn
              dir="next"
              onClick={() => scrollTo(Math.min(interests.length - 1, active + 1))}
              disabled={active === interests.length - 1}
            />
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onMouseEnter={() => setCursor({ variant: "view", label: "Drag" })}
        onMouseLeave={() => setCursor({ variant: "default" })}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-6 select-none sm:scroll-px-8 sm:px-8"
      >
        {interests.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.article
              key={it.name}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="group relative flex min-h-[270px] w-[78vw] shrink-0 snap-start flex-col justify-between border border-line bg-bg p-7 transition-colors duration-500 hover:border-linestrong sm:w-[340px]"
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "grid h-14 w-14 place-items-center transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105",
                    tints[i % tints.length]
                  )}
                >
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
                <span className="font-mono text-[0.62rem] text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-10">
                <h3 className="font-display text-2xl leading-tight font-bold text-ink">{it.name}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{it.line}</p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="mx-auto mt-2 flex max-w-[1600px] gap-1.5 px-5 sm:px-8">
        {interests.map((it, i) => (
          <button
            key={it.name}
            onClick={() => scrollTo(i)}
            aria-label={`Go to ${it.name}`}
            className="group h-[3px] flex-1 bg-line"
          >
            <span
              className={cn(
                "block h-full origin-left bg-gold transition-transform duration-500",
                i === active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function NavBtn({ dir, onClick, disabled }: { dir: "prev" | "next"; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      onMouseEnter={() => setCursor({ variant: "link" })}
      onMouseLeave={() => setCursor({ variant: "default" })}
      className={cn(
        "grid h-11 w-11 place-items-center rounded-full border border-linestrong text-ink transition-all duration-300",
        disabled ? "cursor-not-allowed opacity-30" : "hover:border-gold hover:bg-gold hover:text-bg"
      )}
    >
      <TbArrowRight className={cn("h-4 w-4", dir === "prev" && "rotate-180")} aria-hidden />
    </button>
  );
}
