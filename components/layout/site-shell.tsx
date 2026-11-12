"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useState, type ReactNode } from "react";
import Cursor from "@/components/layout/cursor";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import { PageShell } from "@/components/layout/page-transition";
import Preloader from "@/components/layout/preloader";
import { AppProviders, useMarkReady } from "@/components/providers/app-providers";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <AppProviders>
      <ShellContent>{children}</ShellContent>
    </AppProviders>
  );
}

function ShellContent({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const markReady = useMarkReady();
  const onDone = useCallback(() => {
    setLoading(false);
    markReady();
  }, [markReady]);

  const skipToContent = () => {
    const main = document.getElementById("main");
    main?.focus();
    main?.scrollIntoView();
  };

  return (
    <div className="grain relative min-h-screen bg-bg text-ink">
      <button
        type="button"
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[210] focus:bg-gold focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-widest focus:text-bg focus:uppercase"
      >
        Skip to content
      </button>
      <Cursor />
      <Nav />
      <AnimatePresence>
        {loading && (
          <motion.div key="preloader" exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.85 }}>
            <Preloader onDone={onDone} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        <PageShell key={pathname}>{children}</PageShell>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
