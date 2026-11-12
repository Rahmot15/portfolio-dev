import {
  SiAxios,
  SiBetterauth,
  SiCss,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiJsonwebtokens,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiNpm,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiShadcnui,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiZod,
} from "react-icons/si";
import {
  TbApi,
  TbBolt,
  TbBrandVscode,
  TbBug,
  TbComponents,
  TbDatabaseEdit,
  TbDevices,
  TbHierarchy3,
  TbLayoutDashboard,
  TbLock,
  TbPlugConnected,
  TbSchema,
  TbServer,
  TbShieldLock,
  TbUsersGroup,
} from "react-icons/tb";
import type { Practice, SkillCategory, Tech } from "@/types";

export const categories: {
  id: SkillCategory;
  label: string;
  blurb: string;
}[] = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Interfaces, components and the interaction layer people actually touch.",
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "APIs, authentication, validation and the server logic behind every screen.",
  },
  {
    id: "database",
    label: "Database & ORM",
    blurb: "Relational and document databases, schema design and type-safe queries.",
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    blurb: "Everything that helps me write, test, ship and organise the work.",
  },
];

export const technologies: Tech[] = [
  /* ---------- frontend ---------- */
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", category: "frontend", note: "Semantic markup" },
  { name: "CSS3", icon: SiCss, color: "#2D8CF0", category: "frontend", note: "Layout & animation" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", category: "frontend", note: "ES6+" },
  { name: "TypeScript", icon: SiTypescript, color: "#3D8BE0", category: "frontend", note: "Main language" },
  { name: "React.js", icon: SiReact, color: "#61DAFB", category: "frontend", note: "UI library" },
  { name: "Next.js", icon: SiNextdotjs, color: null, category: "frontend", note: "Main framework" },
  { name: "React Router", icon: SiReactrouter, color: "#E8505B", category: "frontend", note: "Client routing" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#22C3E6", category: "frontend", note: "Utility-first CSS" },
  { name: "shadcn/ui", icon: SiShadcnui, color: null, category: "frontend", note: "Component system" },
  { name: "TanStack Query", icon: SiReactquery, color: "#FF4154", category: "frontend", note: "Server state" },
  { name: "Axios", icon: SiAxios, color: "#8E6CFF", category: "frontend", note: "HTTP client" },
  { name: "Framer Motion", icon: SiFramer, color: "#2E9BFF", category: "frontend", note: "Animation" },

  /* ---------- backend ---------- */
  { name: "Node.js", icon: SiNodedotjs, color: "#6CC24A", category: "backend", note: "Runtime" },
  { name: "Express.js", icon: SiExpress, color: null, category: "backend", note: "REST APIs" },
  { name: "JWT", icon: SiJsonwebtokens, color: "#FB015B", category: "backend", note: "Token auth" },
  { name: "Better Auth", icon: SiBetterauth, color: null, category: "backend", note: "Sessions & auth" },
  { name: "Zod", icon: SiZod, color: "#5B8DEF", category: "backend", note: "Validation" },

  /* ---------- database ---------- */
  { name: "PostgreSQL", icon: SiPostgresql, color: "#5C87F0", category: "database", note: "Relational DB" },
  { name: "MongoDB", icon: SiMongodb, color: "#4DB33D", category: "database", note: "Document DB" },
  { name: "MongoDB Atlas", icon: SiMongodb, color: "#00ED64", category: "database", note: "Cloud database" },
  { name: "Prisma ORM", icon: SiPrisma, color: null, category: "database", note: "Type-safe ORM" },

  /* ---------- tools ---------- */
  { name: "Git", icon: SiGit, color: "#F05032", category: "tools", note: "Version control" },
  { name: "GitHub", icon: SiGithub, color: null, category: "tools", note: "Code & collaboration" },
  { name: "VS Code", icon: TbBrandVscode, color: "#23A9F2", category: "tools", note: "Editor" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37", category: "tools", note: "API testing" },
  { name: "Docker", icon: SiDocker, color: "#2496ED", category: "tools", note: "Containers" },
  { name: "Vercel", icon: SiVercel, color: null, category: "tools", note: "Deployment" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28", category: "tools", note: "Hosting & auth" },
  { name: "Notion", icon: SiNotion, color: null, category: "tools", note: "Docs & planning" },
  { name: "Jira", icon: SiJira, color: "#2684FF", category: "tools", note: "Project tracking" },
  { name: "npm", icon: SiNpm, color: "#E0474C", category: "tools", note: "Packages" },
];

export const practices: Practice[] = [
  { name: "Responsive Web Design", icon: TbDevices, category: "frontend" },
  { name: "Component-Based Architecture", icon: TbComponents, category: "frontend" },
  { name: "UI Implementation", icon: TbLayoutDashboard, category: "frontend" },
  { name: "REST API Development", icon: TbApi, category: "backend" },
  { name: "API Integration", icon: TbPlugConnected, category: "backend" },
  { name: "Authentication & Authorization", icon: TbShieldLock, category: "backend" },
  { name: "Role-Based Access Control", icon: TbUsersGroup, category: "backend" },
  { name: "Protected Routes", icon: TbLock, category: "backend" },
  { name: "Server-Side Development", icon: TbServer, category: "backend" },
  { name: "Error Handling", icon: TbBug, category: "backend" },
  { name: "Database Schema Design", icon: TbSchema, category: "database" },
  { name: "CRUD Operations", icon: TbDatabaseEdit, category: "database" },
  { name: "Data Relationships", icon: TbHierarchy3, category: "database" },
  { name: "Query Optimization", icon: TbBolt, category: "database" },
];

/** Not in the main grid, but used by project stacks. */
const extras: Tech[] = [
  { name: "Stripe", icon: SiStripe, color: "#7A73FF", category: "backend", note: "Payments" },
  { name: "REST API", icon: TbApi, color: "#F2B33D", category: "backend", note: "API design" },
];

const aliases: Record<string, string> = {
  "JWT Authentication": "JWT",
  "Stripe API": "Stripe",
  React: "React.js",
  Prisma: "Prisma ORM",
};

export function findTech(name: string): Tech | undefined {
  const key = aliases[name] ?? name;
  return technologies.find((t) => t.name === key) ?? extras.find((t) => t.name === key);
}

export const coreStack = [
  {
    name: "Next.js",
    label: "Main framework",
    line: "App Router, layouts, dynamic routes and protected dashboards — my default for full-stack products like Shibir.",
    usedIn: "shibir",
  },
  {
    name: "TypeScript",
    label: "Main language",
    line: "Typed components, typed API contracts and Zod-validated data — fewer guesses, fewer bugs, end to end.",
    usedIn: "shibir",
  },
];

export const orbitStack = [
  "React.js",
  "Node.js",
  "PostgreSQL",
  "Prisma ORM",
  "Tailwind CSS",
  "MongoDB",
];
