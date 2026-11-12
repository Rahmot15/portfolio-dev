import { SiGithub, SiWhatsapp, SiX } from "react-icons/si";
import {
  TbApi,
  TbBrain,
  TbBrandLinkedin,
  TbDatabase,
  TbDeviceGamepad2,
  TbHandClick,
  TbLayoutBoard,
  TbPalette,
  TbRocket,
  TbServer2,
  TbShieldCheck,
  TbStack2,
} from "react-icons/tb";
import type { Interest, JourneyStep, Social } from "@/types";

export const profile = {
  name: "MD. Rahmatullah",
  prefix: "MD.",
  first: "Rahmatullah",
  initials: "MR",
  role: "Full Stack Web Developer",
  titles: ["Full Stack Web Developer", "Next.js Developer", "Frontend & Backend Engineer"],
  location: "Bangladesh",
  tz: "Asia/Dhaka",
  email: "mdrahmatulla666@gmail.com",
  phone: "+8801616658465",
  phoneDisplay: "+880 1616-658465",
  whatsapp: "8801616658465",
  experience: "2+ years",
  availability: "Open to full-time roles & selected freelance projects",
  resume:
    "https://drive.google.com/uc?export=download&id=1J8NOe9EVd49TbFaTbL5nDgFJtOz-NtWE",
  github: "https://github.com/Rahmot15",
  /** Paste a URL to your photo here — it replaces the monogram on the ID card. */
  photo: "/projects/rahmot.png",
  education: {
    degree: "Honours 1st Year",
    subject: "Accounting",
    institution: "Nawabganj Government College",
  },
};

export const roles = [
  "Next.js applications",
  "full-stack web apps",
  "secure auth & RBAC",
  "well-structured REST APIs",
  "role-based dashboards",
  "responsive interfaces",
];

export const navLinks = [
  { label: "Index", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Work", href: "/#work" },
  { label: "Journey", href: "/#journey" },
  { label: "Contact", href: "/#contact" },
];

export const summary = [
  "I'm a passionate Full Stack Web Developer who enjoys building modern, responsive, secure and scalable web applications — and solving real-world problems with them.",
  "My journey started right after HSC, learning HTML, CSS and JavaScript from YouTube and online resources. Step by step that curiosity grew into React.js, Next.js, TypeScript, Node.js, Express.js, databases, authentication and complete full-stack applications.",
  "Today my focus is clean user interfaces, reliable backend systems, secure authentication and well-structured APIs — maintainable code that keeps working long after it ships. I believe in continuous learning, teamwork and getting better with every project.",
];

export const principles = [
  {
    n: "01",
    t: "Clean interfaces",
    d: "Responsive, component-based UIs with Tailwind CSS and shadcn/ui — careful on every screen size.",
  },
  {
    n: "02",
    t: "Reliable backends",
    d: "Well-structured REST APIs with Express, Zod validation and proper error handling.",
  },
  {
    n: "03",
    t: "Secure by default",
    d: "Authentication, sessions, role-based access and protected routes — designed in from day one.",
  },
  {
    n: "04",
    t: "Always learning",
    d: "Self-taught and project-driven. Every build teaches me something a tutorial didn't.",
  },
];

export const strengths = [
  "Problem Solving",
  "Analytical Thinking",
  "Quick Learning",
  "Team Collaboration",
  "Attention to Detail",
  "Self-Motivation",
  "Adaptability",
  "Continuous Learning",
  "Creative Thinking",
  "Responsibility",
];

export const objective =
  "To grow as a professional Full Stack Developer by working on real-world applications, solving challenging technical problems, collaborating with experienced developers, and continuously improving my frontend and backend engineering skills.";

export const story =
  "Self-taught through online resources and project-based learning — while studying Accounting. Building practical projects taught me how real-world applications work beyond just writing code.";

export const journey: JourneyStep[] = [
  {
    label: "Chapter 01",
    title: "The first line of code",
    sub: "After HSC · Self-taught",
    detail:
      "Right after HSC I started learning HTML, CSS and JavaScript from YouTube and online resources — and got hooked on making things appear in the browser.",
    tags: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    label: "Chapter 02",
    title: "Thinking in components",
    sub: "Modern frontend",
    detail:
      "Moved into React.js, React Router and Tailwind CSS. Learned component-based architecture, responsive design and how to turn a design into clean, reusable UI.",
    tags: ["React.js", "React Router", "Tailwind CSS"],
  },
  {
    label: "Chapter 03",
    title: "Going full stack",
    sub: "Node · Express · MongoDB",
    detail:
      "Built complete applications with Node.js, Express and MongoDB — JWT authentication, REST APIs, CRUD and Stripe payments in BookStacker and BazarIo.",
    tags: ["Node.js", "Express.js", "MongoDB", "JWT"],
  },
  {
    label: "Chapter 04",
    title: "Typed, modern & secure",
    sub: "Next.js · TypeScript · PostgreSQL",
    detail:
      "Adopted Next.js, TypeScript, PostgreSQL, Prisma and Better Auth — and shipped Shibir, a role-based reporting platform with protected dashboards.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma ORM"],
  },
  {
    label: "Now",
    title: "Learning, every single day",
    sub: "Honours 1st Year · Accounting",
    detail:
      "Studying at Nawabganj Government College while building real-world projects — and looking for a team where I can grow as a professional engineer.",
    tags: [],
  },
];

export const interests: Interest[] = [
  {
    name: "Full Stack Web Development",
    line: "Owning a feature end to end — from the database row to the button that triggers it.",
    icon: TbStack2,
  },
  {
    name: "Frontend Engineering",
    line: "Interfaces that feel fast, accessible and intentional on every screen.",
    icon: TbLayoutBoard,
  },
  {
    name: "Backend Engineering",
    line: "APIs, data models and server logic that stay reliable under real use.",
    icon: TbServer2,
  },
  {
    name: "Modern UI/UX Design",
    line: "Studying how great products look and feel — and why they work.",
    icon: TbPalette,
  },
  {
    name: "Artificial Intelligence",
    line: "Exploring how AI can make web applications smarter and more helpful.",
    icon: TbBrain,
  },
  {
    name: "Web Application Security",
    line: "Auth, permissions and safe data handling — security as a habit, not a patch.",
    icon: TbShieldCheck,
  },
  {
    name: "Database Architecture",
    line: "Schemas and relationships designed to grow with the product.",
    icon: TbDatabase,
  },
  {
    name: "API Development",
    line: "Clean, predictable endpoints that other developers enjoy using.",
    icon: TbApi,
  },
  {
    name: "Interactive Web Applications",
    line: "Motion and interaction that make the web feel alive.",
    icon: TbHandClick,
  },
  {
    name: "Gaming & Interactive Media",
    line: "Where play meets engineering — the most demanding real-time interfaces.",
    icon: TbDeviceGamepad2,
  },
  {
    name: "Emerging Technologies",
    line: "Always trying what's new — and keeping what's genuinely useful.",
    icon: TbRocket,
  },
];

export const socials: Social[] = [
  { label: "GitHub", handle: "@Rahmot15", href: "https://github.com/Rahmot15", icon: SiGithub },
  {
    label: "LinkedIn",
    handle: "in/mdrahmatullah-dev",
    href: "https://www.linkedin.com/in/mdrahmatullah-dev",
    icon: TbBrandLinkedin,
  },
  { label: "X / Twitter", handle: "@MdRahmatul59907", href: "https://x.com/MdRahmatul59907", icon: SiX },
  { label: "WhatsApp", handle: "+880 1616-658465", href: "https://wa.me/8801616658465", icon: SiWhatsapp },
];

export const codeLines = [
  "// app/developer.ts",
  'import type { Dev } from "@/types";',
  "",
  "export const rahmatullah: Dev = {",
  '  role: "Full Stack Developer",',
  '  core: ["Next.js", "TypeScript"],',
  '  api: ["Node", "Express", "REST"],',
  '  db: ["PostgreSQL", "MongoDB"],',
  '  orm: "Prisma",',
  '  auth: ["Better Auth", "JWT"],',
  '  based: "Bangladesh",',
  "  learning: Infinity,",
  "};",
  "",
  "await deploy(rahmatullah); // ✓ live",
];
