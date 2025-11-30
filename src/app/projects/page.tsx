import { getProjects } from "@/features/projects/actions/projects";
import { ProjectList } from "@/features/projects/components/_components/project-list";

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="font-sans min-h-screen pt-24 pb-14">
      <div className="container mx-auto px-4">
        <ProjectList projects={projects} />
      </div>
    </main>
  );
}
