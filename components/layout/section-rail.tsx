"use client";

import { useEffect, useState } from "react";
import { Link } from "@/lib/router";
import { cn } from "@/utils/cn";

const sections = [
  { id: "top", label: "Index" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

/** Fixed side rail highlighting the section currently in view (home only). */
export default function SectionRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-1/2 right-5 z-[95] hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex"
    >
      {sections.map((s) => {
        const on = active === s.id;
        return (
          <Link key={s.id} href={`/#${s.id}`} className="group flex items-center gap-3" aria-label={s.label}>
            <span
              className={cn(
                "font-mono text-[0.58rem] tracking-[0.2em] uppercase transition-all duration-500",
                on
                  ? "translate-x-0 text-gold opacity-100"
                  : "translate-x-2 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              )}
            >
              {s.label}
            </span>
            <span
              className={cn(
                "block h-px transition-all duration-500",
                on ? "w-8 bg-gold" : "w-4 bg-linestrong group-hover:w-6 group-hover:bg-muted"
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
