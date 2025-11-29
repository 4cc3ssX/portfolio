"use client";

import MotionWrapper from "@/app/_components/motion-wrapper";
import { ProjectCard } from ".";
import { ProjectWithLinkAndTagsWithGithubData } from "@/actions/projects";
import { AnalyticsEvent, sendEvent } from "@/shared/firebase";
import { openURL } from "@/utils";

interface Props {
  projects: ProjectWithLinkAndTagsWithGithubData[];
}

export function ProjectList({ projects }: Props) {
  const handleProjectClick = (
    project: ProjectWithLinkAndTagsWithGithubData
  ) => {
    openURL(project.link, true);

    sendEvent(AnalyticsEvent.PROJECT_CLICK, {
      name: project.name,
    });
  };

  return (
    <MotionWrapper className="flex-1 md:flex-none flex flex-col gap-y-3 w-full sm:w-3/4 md:w-4/6 lg:w-7/12 xl:w-1/2 px-5 md:px-6">
      <div className="flex flex-col gap-y-1">
        <h2 className="font-medium text-2xl sm:text-3xl">Projects</h2>
        <p className="text-sm text-hint">
          Internal-use and freelance projects are ignored.
        </p>
      </div>
      <div className="mt-2 flex-1 flex flex-col gap-5">
        {projects.map((project, index) => {
          return (
            <ProjectCard
              key={`project-${project.name}-${index}`}
              project={project}
              onClick={handleProjectClick}
            />
          );
        })}
      </div>
    </MotionWrapper>
  );
}
