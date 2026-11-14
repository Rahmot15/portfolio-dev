"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { profile } from "@/data/profile";
import { getProject } from "@/data/projects";

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

function labelFor(pathname: string) {
  if (pathname === "/") return "Index";
  const match = pathname.match(/^\/projects\/([^/]+)$/);
  if (match) return getProject(match[1] ?? "")?.name ?? "Not found";
  return "Not found";
}

/**
 * Covers each newly mounted route with a short curtain reveal. The page itself
 * is never transformed, so `position: fixed` children stay intact.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const [showCurtain, setShowCurtain] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Ensure the overlay cannot remain over a cached Back/Forward navigation
    // if the browser skips or interrupts the Motion animation lifecycle.
    const dismiss = () => setShowCurtain(false);
    const dismissAfterRestore = (event: PageTransitionEvent) => {
      if (event.persisted) dismiss();
    };
    const fallback = window.setTimeout(dismiss, reduceMotion ? 100 : 1800);
    window.addEventListener("popstate", dismiss);
    window.addEventListener("pageshow", dismissAfterRestore);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("popstate", dismiss);
      window.removeEventListener("pageshow", dismissAfterRestore);
    };
  }, [reduceMotion]);

  return (
    <div>
      {children}
      {showCurtain && <Curtain reduceMotion={reduceMotion} />}
    </div>
  );
}

function Curtain({ reduceMotion }: { reduceMotion: boolean | null }) {
  const pathname = usePathname();
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[180] flex flex-col justify-between bg-bgsoft p-6 sm:p-10"
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.12, ease }}
    >
      <div className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.28em] text-muted uppercase">
        <span>{profile.name}</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
          Loading
        </span>
      </div>
      <div className="display text-[clamp(3rem,13vw,11rem)] text-ink">{labelFor(pathname)}</div>
    </motion.div>
  );
}
