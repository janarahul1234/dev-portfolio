import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projectOrder, type ProjectKey } from "@/lib/projects";
import { CaseStudyPage } from "@/components/case-study-page";

export function generateStaticParams() {
  return projectOrder.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug as ProjectKey);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} Case Study`,
    description: project.shortDescription,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug as ProjectKey);
  if (!project) notFound();
  return <CaseStudyPage project={project} />;
}
