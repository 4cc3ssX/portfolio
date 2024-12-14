"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./_components";
import { ProjectWithLinkAndTagsWithGithubData } from "@/actions/projects";
import { AnalyticsEvent, sendEvent } from "@/shared/firebase";
import { openURL } from "@/utils";

interface Props {
  data: ProjectWithLinkAndTagsWithGithubData[];
}

export default function Projects({ data }: Props) {
  const handleProjectClick = (
    project: ProjectWithLinkAndTagsWithGithubData
  ) => {
    openURL(project.link, true);

    sendEvent(AnalyticsEvent.PROJECT_CLICK, {
      name: project.name,
    });
  };
  return (
    <div id="projects" className="flex pt-14 min-h-dvh">
      <div className="flex-1 flex flex-col justify-start md:justify-center items-center">
        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="flex-1 md:flex-none flex flex-col gap-y-3 w-full sm:w-3/4 md:w-4/6 lg:w-7/12 xl:w-1/2 px-5 md:px-6"
        >
          <div className="flex flex-col gap-y-1">
            <p className="font-medium text-2xl sm:text-3xl">Projects</p>
            <p className="text-sm text-hint">
              Internal-use and private projects are ignored.
            </p>
          </div>
          <div className="mt-2 flex-1 flex flex-col gap-5">
            {data.map((project, index) => {
              return (
                <ProjectCard
                  key={`project-${project.name}-${index}`}
                  project={project}
                  onClick={handleProjectClick}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
