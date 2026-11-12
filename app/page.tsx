import type { Metadata } from "next";
import PersonJsonLd from "@/components/seo/person-json-ld";
import HomePage from "@/components/pages/home-page";

export const metadata: Metadata = {
  title: "Full Stack Web Developer · Next.js & TypeScript",
  description:
    "Explore the portfolio of MD. Rahmatullah, a Bangladesh-based full-stack developer building responsive web applications with Next.js, TypeScript, Node.js, PostgreSQL, and MongoDB.",
  openGraph: {
    type: "website",
    title: "MD. Rahmatullah | Full Stack Web Developer",
    description:
      "Portfolio, skills, and full-stack projects built with Next.js, TypeScript, Node.js, PostgreSQL, and MongoDB.",
  },
  twitter: {
    card: "summary",
    title: "MD. Rahmatullah | Full Stack Web Developer",
    description:
      "Portfolio, skills, and full-stack projects built with Next.js, TypeScript, Node.js, PostgreSQL, and MongoDB.",
  },
};

export default function Page() {
  return (
    <>
      <PersonJsonLd />
      <HomePage />
    </>
  );
}
