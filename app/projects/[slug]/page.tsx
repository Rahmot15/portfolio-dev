import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectClientPage from "@/components/pages/project-client-page";
import { getProject, projects } from "@/data/projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project ? `${project.name} — Case study` : "Project not found",
    description: project?.summary ?? "",
    openGraph: project
      ? {
          type: "article",
          title: `${project.name} — Case study`,
          description: project.summary,
        }
      : undefined,
    twitter: project
      ? {
          card: "summary",
          title: `${project.name} — Case study`,
          description: project.summary,
        }
      : undefined,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectClientPage project={project} />;
}
