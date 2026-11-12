import type { ReactNode } from "react";
import { TbLock } from "react-icons/tb";
import { cn } from "@/utils/cn";

/** Minimal browser chrome around a screenshot. */
export function BrowserFrame({
  domain,
  children,
  className,
}: {
  domain: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden border border-linestrong bg-surface2", className)}>
      <div className="flex items-center gap-3 border-b border-line bg-surface px-3 py-2 sm:px-4">
        <div className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-coral/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 border border-line bg-bg/60 px-3 py-1 font-mono text-[0.6rem] tracking-[0.04em] text-muted">
          <TbLock className="h-3 w-3 shrink-0" aria-hidden />
          <span className="truncate">{domain}</span>
        </div>
        <span className="hidden w-[46px] shrink-0 sm:block" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">{children}</div>
    </div>
  );
}

/** Phone mock for mobile screenshots. */
export function PhoneFrame({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={cn("elev rounded-[1.6rem] bg-[#0b0a09] p-[5px] ring-1 ring-linestrong", className)}>
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.25rem] bg-surface2">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
        <span className="absolute top-1.5 left-1/2 h-[9px] w-[34%] -translate-x-1/2 rounded-full bg-[#0b0a09]" />
      </div>
    </div>
  );
}
