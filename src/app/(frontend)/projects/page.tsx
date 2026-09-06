import dynamic from "next/dynamic";
import { Metadata } from "next";
import { getProjects } from "@/features/projects/actions/projects";
import { getMe } from "@/features/users/actions/users";
import { Footer } from "@/components/layout";

const ProjectsSection = dynamic(() =>
  import("@/features/projects/components/projects-section").then(
    (mod) => mod.ProjectsSection
  )
);

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated selection of my open-source contributions and public work.",
};

export const revalidate = 600;

export default async function ProjectsPage() {
  const [projects, me] = await Promise.all([getProjects(), getMe()]);

  return (
    <main className="relative min-h-screen pt-20">
      <ProjectsSection projects={projects} showAll />
      <Footer user={me} />
    </main>
  );
}
