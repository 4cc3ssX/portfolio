"use client";

import { Chip, ParallaxCard } from "@/components/interface";
import { ProjectWithLinkAndTags } from "@/shared/db/schema";
import { openURL } from "@/utils";
import dayjs from "dayjs";
import { BsBoxArrowUpRight } from "react-icons/bs";

export interface ProjectCardProps {
  project: ProjectWithLinkAndTags;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  console.log(project)
  return (
    <ParallaxCard onClick={() => openURL(project.link, true)}>
      <div className="flex flex-col gap-y-2 rounded-xl bg-gradient-to-br from-secondary to-background px-5 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3">
          <div className="flex-1 flex flex-row items-center gap-x-2">
            <p className="font-medium text-xl hover:underline underline-offset-2">
              {project.name}
            </p>
            <BsBoxArrowUpRight />
          </div>
          <p className="text-sm text-muted-foreground text-left">
            {dayjs(project.startedAt).format("MMM YYYY")}
            {" - "}
            <span
              className={`${
                project.isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {project.isActive
                ? "Present"
                : dayjs(project.endedAt).format("MMM YYYY")}
            </span>
          </p>
        </div>
        <p className="text-sm md:text-base whitespace-pre-line hyphens-auto">
          {project.description}
        </p>
        <div className="mt-2 flex flex-row items-center flex-wrap gap-x-2 gap-y-1.5">
          {project.tags.map((tag, index) => {
            return (
              <Chip
                key={`project-tag-${tag}-${index}`}
                className="bg-secondary/20"
              >
                <p className="text-sm text-center text-foreground line-clamp-1">
                  {tag}
                </p>
              </Chip>
            );
          })}
        </div>
      </div>
    </ParallaxCard>
  );
};

export default ProjectCard;
