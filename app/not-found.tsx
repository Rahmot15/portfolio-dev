"use client";

import { useLayoutEffect } from "react";
import { TbArrowLeft } from "react-icons/tb";
import { Link } from "@/lib/router";

export default function NotFound() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main
      id="main"
      tabIndex={-1}
      className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 pt-24 pb-16 outline-none"
    >
      <div className="gridlines pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative text-center">
        <p className="mono-label">Error — 404</p>
        <h1 className="display outline-text mt-6 text-[clamp(6rem,26vw,20rem)]">404</h1>
        <p className="mx-auto mt-6 max-w-md text-dim">
          This route was never deployed. Let's get you back to something that was.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-3 bg-gold px-7 py-4 font-mono text-[0.7rem] tracking-[0.2em] text-bg uppercase"
        >
          <TbArrowLeft className="h-4 w-4" aria-hidden /> Back to index
        </Link>
      </div>
    </main>
  );
}
