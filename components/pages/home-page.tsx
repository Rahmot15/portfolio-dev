"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import SectionRail from "@/components/layout/section-rail";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Hero from "@/components/sections/hero";
import Journey from "@/components/sections/journey";
import Marquee from "@/components/sections/marquee";
import Skills from "@/components/sections/skills";
import Work from "@/components/sections/work";

/** Scroll position of the home page, restored when coming back from a case study. */
let savedScroll: number | null = null;

export default function HomePage() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname !== "/") return;
    const section = decodeURIComponent(window.location.hash.slice(1));
    const target = section ? document.getElementById(section) : null;
    if (target) {
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
    } else if (savedScroll !== null) {
      window.scrollTo({ top: savedScroll, behavior: "instant" });
    }
    savedScroll = null;
  }, [pathname]);

  useLayoutEffect(
    () => () => {
      savedScroll = window.scrollY;
    },
    []
  );

  return (
    <>
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Work />
        <Journey />
        <Contact />
      </main>
      <SectionRail />
    </>
  );
}
