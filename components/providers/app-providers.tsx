"use client";

import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from "next-themes";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Theme = "dark" | "light";
type ThemeValue = { theme: Theme; toggleTheme: () => void };
type ReadyValue = { ready: boolean; markReady: () => void };

const ThemeContext = createContext<ThemeValue | null>(null);
const ReadyContext = createContext<ReadyValue | null>(null);

function ProvidersInner({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useNextTheme();
  const [ready, setReady] = useState(false);
  const toggleTheme = useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [setTheme, theme],
  );
  const markReady = useCallback(() => setReady(true), []);
  const themeValue = useMemo<ThemeValue>(
    () => ({ theme: theme === "light" ? "light" : "dark", toggleTheme }),
    [theme, toggleTheme],
  );
  const readyValue = useMemo(() => ({ ready, markReady }), [ready, markReady]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <ReadyContext.Provider value={readyValue}>{children}</ReadyContext.Provider>
    </ThemeContext.Provider>
  );
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider attribute="data-theme" storageKey="mr-theme" defaultTheme="dark" enableSystem={false}>
      <ProvidersInner>{children}</ProvidersInner>
    </NextThemeProvider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <AppProviders>");
  return ctx;
}

export function useReady() {
  const ctx = useContext(ReadyContext);
  if (!ctx) throw new Error("useReady must be used inside <AppProviders>");
  return ctx.ready;
}

export function useMarkReady() {
  const ctx = useContext(ReadyContext);
  if (!ctx) throw new Error("useMarkReady must be used inside <AppProviders>");
  return ctx.markReady;
}
