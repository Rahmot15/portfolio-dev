"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
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
 * Wraps every route. On navigation the old page's curtain slides up from the
 * bottom (exit), then the new page mounts and its curtain lifts away (enter).
 * The page itself is never transformed, so `position: fixed` children stay intact.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.div initial="initial" animate="enter" exit="exit">
      {children}
      <Curtain />
    </motion.div>
  );
}

function Curtain() {
  const pathname = usePathname();
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[180] flex flex-col justify-between bg-bgsoft p-6 sm:p-10"
      variants={{
        initial: { y: "0%" },
        enter: { y: "-100%", transition: { duration: 0.85, delay: 0.12, ease } },
        exit: { y: ["100%", "0%"], transition: { duration: 0.65, ease } },
      }}
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
