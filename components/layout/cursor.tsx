"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export type CursorVariant = "default" | "link" | "view" | "hidden";
export type CursorState = { variant: CursorVariant; label?: string };

const listeners = new Set<(s: CursorState) => void>();
let current: CursorState = { variant: "default" };

/** Global setter — call from any hover handler. */
export function setCursor(next: Partial<CursorState>) {
  current = { ...current, ...next };
  if (next.variant && next.variant !== "view" && !("label" in next)) current.label = undefined;
  listeners.forEach((fn) => fn(current));
}

/** Blend-difference cursor: fast dot + lagging ring with contextual labels. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>(current);
  const [pressed, setPressed] = useState(false);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useSpring(mx, { stiffness: 320, damping: 30, mass: 0.6 });
  const ry = useSpring(my, { stiffness: 320, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const sync = (s: CursorState) => setState({ ...s });

    listeners.add(sync);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      listeners.delete(sync);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [mx, my]);

  if (!enabled) return null;

  const big = state.variant === "view";
  const size = big ? 92 : state.variant === "link" ? 52 : 30;

  return (
    <div className="pointer-events-none fixed inset-0 z-[190]" aria-hidden>
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-gold mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          backgroundColor: big ? "rgba(242,179,61,1)" : "rgba(242,179,61,0)",
          opacity: state.variant === "hidden" ? 0 : 1,
          scale: pressed ? 0.86 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <motion.span
          className="absolute inset-0 grid place-items-center font-mono text-[0.6rem] font-bold tracking-[0.18em] text-black uppercase"
          animate={{ opacity: big && state.label ? 1 : 0 }}
        >
          {state.label}
        </motion.span>
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 h-[5px] w-[5px] rounded-full bg-white mix-blend-difference"
        style={{ x: mx, y: my, marginLeft: -2.5, marginTop: -2.5 }}
        animate={{ scale: state.variant === "default" || state.variant === "hidden" ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
