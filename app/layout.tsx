import type { Metadata, Viewport } from "next";
import SiteShell from "@/components/layout/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MD. Rahmatullah — Full Stack Web Developer",
    template: "%s · MD. Rahmatullah",
  },
  description:
    "Portfolio of MD. Rahmatullah, a self-taught full-stack web developer from Bangladesh building with Next.js, TypeScript, Node.js, PostgreSQL and MongoDB.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0c0b" },
    { media: "(prefers-color-scheme: light)", color: "#f3efe7" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
