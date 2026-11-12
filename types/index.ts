import type { IconType } from "react-icons";

export type Accent = "gold" | "coral" | "mint";

export type SkillCategory = "frontend" | "backend" | "database" | "tools";

export type Tech = {
  name: string;
  icon: IconType;
  /** Brand colour. `null` = monochrome logo, rendered in the tile foreground. */
  color: string | null;
  category: SkillCategory;
  note?: string;
};

export type Practice = {
  name: string;
  icon: IconType;
  category: SkillCategory;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  kind: string;
  architecture: string;
  accent: Accent;
  domain: string;
  cover: string;
  mobile?: string;
  summary: string;
  overview: string[];
  stack: string[];
  features: string[];
  contributions: string[];
  highlights: { k: string; v: string }[];
  links: { live: string; frontend: string; backend: string };
};

export type JourneyStep = {
  label: string;
  title: string;
  sub: string;
  detail: string;
  tags: string[];
};

export type Interest = { name: string; line: string; icon: IconType };

export type Social = { label: string; handle: string; href: string; icon: IconType };
