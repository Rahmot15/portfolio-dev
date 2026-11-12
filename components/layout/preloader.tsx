"use client";

import { animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const curtainEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setCount(100);
      const t = window.setTimeout(onDone, 250);
      return () => window.clearTimeout(t);
    }
    let t = 0;
    const controls = animate(0, 100, {
      duration: 2.1,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        t = window.setTimeout(onDone, 520);
      },
    });
    return () => {
      controls.stop();
      window.clearTimeout(t);
    };
  }, [onDone, reduce]);

  const done = count >= 100;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]">
      <motion.div
        className="absolute inset-0 flex"
        initial="show"
        animate={done ? "hide" : "show"}
        transition={{ duration: 0.95, ease: curtainEase, delay: 0.05 }}
      >
        {(["left", "right"] as const).map((side) => (
          <motion.div
            key={side}
            className="h-full w-1/2 bg-bgsoft"
            variants={{
              show: { y: "0%" },
              hide: { y: side === "left" ? "-101%" : "101%" },
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-10"
        animate={{ opacity: done ? 0 : 1 }}
        transition={{ duration: 0.45, delay: done ? 0.35 : 0 }}
      >
        <div className="flex items-start justify-between font-mono text-[0.62rem] tracking-[0.28em] text-muted uppercase">
          <span>Portfolio — {new Date().getFullYear()}</span>
          <span>{profile.location} · Full stack</span>
        </div>

        <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="display text-[clamp(2.4rem,8vw,7.5rem)] text-ink">
            {[profile.prefix, profile.first].map((line, i) => (
              <span key={line} className="mask-line">
                <motion.span
                  className={i === 0 ? "outline-text block" : "block"}
                  initial={{ y: "120%" }}
                  animate={{ y: done ? "-120%" : "0%" }}
                  transition={{ duration: 0.85, delay: done ? i * 0.05 : 0.1 + i * 0.1, ease: curtainEase }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </div>
          <div className="display text-[clamp(3rem,10vw,8rem)] text-gold tabular-nums">
            {String(count).padStart(3, "0")}
          </div>
        </div>

        <div className="relative h-px w-full bg-line">
          <div className="absolute inset-y-0 left-0 bg-gold" style={{ width: `${count}%` }} />
        </div>
      </motion.div>
    </div>
  );
}
