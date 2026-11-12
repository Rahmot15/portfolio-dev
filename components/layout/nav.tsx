"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TbDownload } from "react-icons/tb";
import { setCursor } from "@/components/layout/cursor";
import { useReady, useTheme } from "@/components/providers/app-providers";
import { navLinks, profile, socials } from "@/data/profile";
import { useClock, useMagnetic } from "@/lib/hooks";
import { Link } from "@/lib/router";
import { cn } from "@/utils/cn";

const hoverLink = {
  onMouseEnter: () => setCursor({ variant: "link" }),
  onMouseLeave: () => setCursor({ variant: "default" }),
};

export default function Nav() {
  const ready = useReady();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const time = useClock(profile.tz);
  const cvRef = useMagnetic<HTMLAnchorElement>(0.3);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  const onProject = pathname.startsWith("/projects");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[105] h-[2px] w-full origin-left bg-gold"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-[background-color,padding,border-color] duration-500",
          scrolled ? "border-b border-line bg-bg/80 py-3 backdrop-blur-xl" : "border-b border-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/#top" className="group flex items-center gap-3" aria-label="Back to the top" {...hoverLink}>
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden border border-linestrong font-mono text-[0.7rem] font-bold">
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-bg">{profile.initials}</span>
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-[0.95rem] font-bold tracking-tight text-ink">{profile.name}</span>
              <span className="block font-mono text-[0.58rem] tracking-[0.22em] text-muted uppercase">
                Full stack · Next.js
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((l, i) => {
              const active = onProject && l.label === "Work";
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "group relative px-3.5 py-2 font-mono text-[0.68rem] tracking-[0.18em] uppercase transition-colors hover:text-ink",
                    active ? "text-ink" : "text-dim"
                  )}
                  {...hoverLink}
                >
                  <span
                    className={cn(
                      "mr-1.5 text-[0.55rem] text-gold transition-opacity",
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span className="sweep">{l.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[0.65rem] tracking-[0.16em] text-muted tabular-nums xl:block">
              BD {time}
            </span>

            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line text-dim transition-colors hover:text-ink"
              {...hoverLink}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ y: 14, opacity: 0, rotate: -35 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -14, opacity: 0, rotate: 35 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="grid place-items-center"
                >
                  {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                </motion.span>
              </AnimatePresence>
            </button>

            <a
              ref={cvRef}
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursor({ variant: "hidden" })}
              onMouseLeave={() => setCursor({ variant: "default" })}
              className="hidden items-center gap-2.5 border border-linestrong px-4 py-2.5 font-mono text-[0.66rem] tracking-[0.18em] text-ink uppercase transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-bg sm:flex"
            >
              <span className="relative grid h-1.5 w-1.5 place-items-center">
                <span className="pulse-ring absolute inset-0" />
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              Resume
              <TbDownload className="h-3.5 w-3.5" aria-hidden />
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center border border-line lg:hidden"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-px w-4 bg-ink" />
                <span className="block h-px w-4 bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] bg-bgsoft lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex h-full flex-col justify-between overflow-y-auto p-6">
              <div className="flex items-center justify-between">
                <span className="mono-label">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center border border-line text-ink"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
              </div>

              <nav className="my-8 flex flex-col" aria-label="Mobile">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-baseline gap-4 border-b border-line py-3 text-[clamp(2rem,11vw,3.4rem)] text-ink"
                    >
                      <span className="font-mono text-[0.6rem] tracking-[0.2em] text-gold">0{i + 1}</span>
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col gap-5"
              >
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-gold px-5 py-4 font-mono text-[0.7rem] tracking-[0.2em] text-bg uppercase"
                >
                  <TbDownload className="h-4 w-4" aria-hidden /> Download resume
                </a>
                <div className="flex items-center gap-3">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="grid h-11 w-11 place-items-center rounded-full border border-linestrong text-ink"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
                <div className="flex flex-col gap-1 font-mono text-[0.68rem] tracking-[0.12em] text-muted">
                  <span>{profile.email}</span>
                  <span>
                    {profile.location} — {time}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <circle cx="8" cy="8" r="3.2" />
      <path d="M8 1v1.8M8 13.2V15M1 8h1.8M13.2 8H15M3.1 3.1l1.3 1.3M11.6 11.6l1.3 1.3M12.9 3.1l-1.3 1.3M4.4 11.6l-1.3 1.3" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M13.5 9.7A5.9 5.9 0 016.3 2.5a5.9 5.9 0 107.2 7.2z" />
    </svg>
  );
}
