import { getProjects } from "@/features/projects/actions/projects";
import { ProjectList } from "@/features/projects/components/project-list";

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="font-sans min-h-screen pt-30 pb-14">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <ProjectList projects={projects} />
        </div>
      </div>
    </main>
  );
}
