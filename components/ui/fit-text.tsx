"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/**
 * Scales its font-size so the `measure` string exactly fills the parent width.
 * Children can be any markup (animated lines etc.) — `measure` should be the
 * longest line. Re-fits on resize and once web fonts finish loading.
 */
export function FitText({
  measure,
  children,
  className,
  max = 240,
  min = 32,
}: {
  measure: string;
  children: ReactNode;
  className?: string;
  max?: number;
  min?: number;
}) {
  const box = useRef<HTMLSpanElement>(null);
  const probe = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = box.current;
    const pr = probe.current;
    if (!el || !pr) return;

    const apply = () => {
      const avail = el.clientWidth;
      const natural = pr.offsetWidth;
      if (!avail || !natural) return;
      const size = Math.max(min, Math.min(max, (avail / natural) * 100 * 0.985));
      el.style.fontSize = `${size.toFixed(2)}px`;
    };

    let frame = 0;
    const fit = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    apply();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    const fonts = document.fonts;
    fonts.ready.then(fit).catch(() => undefined);
    fonts.addEventListener("loadingdone", fit);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      fonts.removeEventListener("loadingdone", fit);
    };
  }, [measure, max, min]);

  return (
    <span ref={box} className={cn("relative block", className)}>
      <span
        ref={probe}
        aria-hidden
        className="pointer-events-none invisible absolute top-0 left-0 whitespace-nowrap"
        style={{ fontSize: "100px" }}
      >
        {measure}
      </span>
      {children}
    </span>
  );
}
