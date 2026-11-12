"use client";

import { useEffect, useRef, useState } from "react";

/** Pointer-position magnetic pull for buttons & links. */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate3d(0,0,0)";
    };

    // keep colour transitions from utility classes alongside the magnetic ease
    el.style.transition =
      "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease";
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}

/** 3D tilt following the pointer; also exposes --mx / --my for sheen effects. */
export function useTilt<T extends HTMLElement>(max = 8) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(
        px * max
      ).toFixed(2)}deg)`;
      el.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
    };
    const reset = () => {
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [max]);

  return ref;
}

/** Live clock in a given IANA timezone. */
export function useClock(timeZone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return time;
}

/** Scramble / decode text effect cycling through `words`. */
export function useScramble(words: string[], speed = 90, hold = 2100) {
  const [out, setOut] = useState(words[0] ?? "");
  const idx = useRef(0);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let timer = 0;
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/\\<>[]{}*#%$@!?";

    const run = () => {
      const from = words[idx.current];
      idx.current = (idx.current + 1) % words.length;
      const to = words[idx.current];
      frame = 0;

      const step = () => {
        const len = Math.max(from.length, to.length);
        let str = "";
        for (let i = 0; i < len; i++) {
          const start = i * 2;
          const end = start + 8;
          if (frame >= end) str += to[i] ?? "";
          else if (frame >= start)
            str += to[i] && Math.random() > 0.35 ? glyphs[Math.floor(Math.random() * glyphs.length)] : to[i] ?? " ";
          else str += from[i] ?? "";
        }
        setOut(str);
        frame++;
        if (frame < len * 2 + 10) {
          timer = window.setTimeout(step, speed / 3);
        } else {
          setOut(to);
          timer = window.setTimeout(run, hold);
        }
      };
      step();
    };

    timer = window.setTimeout(run, hold);
    return () => window.clearTimeout(timer);
  }, [words, speed, hold]);

  return out;
}
