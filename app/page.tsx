import type { Metadata } from "next";
import HomePage from "@/components/pages/home-page";

export const metadata: Metadata = {
  title: "MD. Rahmatullah — Full Stack Web Developer · Next.js & TypeScript",
  description:
    "Portfolio of MD. Rahmatullah, a self-taught full-stack web developer from Bangladesh building with Next.js, TypeScript, Node.js, PostgreSQL and MongoDB.",
};

export default function Page() {
  return <HomePage />;
}
