import MotionWrapper from "@/features/shared/components/motion-wrapper";
import { ProjectCard } from ".";
import { ProjectWithLinkAndTagsWithGithubData } from "@/features/projects/actions/projects";

interface Props {
  projects: ProjectWithLinkAndTagsWithGithubData[];
}

export function ProjectList({ projects }: Props) {
  return (
    <MotionWrapper className="flex-1 md:flex-none flex flex-col gap-y-3 px-5 md:px-6">
      <div className="flex flex-col gap-y-1">
        <h2 className="font-medium text-2xl sm:text-3xl">Projects</h2>
        <p className="text-sm text-hint">
          A curated selection of my open-source contributions and public work.
        </p>
      </div>
      <div className="mt-2 flex-1 flex flex-col gap-5">
        {projects.map((project, index) => {
          return (
            <ProjectCard
              key={`project-${project.name}-${index}`}
              project={project}
            />
          );
        })}
      </div>
    </MotionWrapper>
  );
}
