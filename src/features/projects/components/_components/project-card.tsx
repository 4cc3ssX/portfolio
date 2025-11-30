import { ProjectWithLinkAndTagsWithGithubData } from "@/features/projects/actions/projects";
import { Chip, ParallaxCard } from "@/components/interface";
import dayjs from "dayjs";
import { ExternalLink, GitFork, Star } from "lucide-react";
import Link from "next/link";

export interface ProjectCardProps {
  project: ProjectWithLinkAndTagsWithGithubData;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <ParallaxCard>
      <div className="flex flex-col gap-y-2 rounded-xl bg-linear-to-br from-secondary to-background p-4 sm:p-5">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3">
          <div className="flex-1 flex flex-row items-center gap-x-2">
            <Link
              href={project.link}
              target="_blank"
              className="font-medium text-xl hover:underline underline-offset-2"
            >
              {project.name}
              <span className="sr-only">Open {project.name} in new tab</span>
            </Link>
            <ExternalLink size={18} />
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
        {project.github ? (
          <div className="my-0.5 flex flex-row items-center gap-x-2">
            <div className="flex flex-row items-center gap-x-1">
              <Star size={18} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {project.github.stargazers_count}
              </p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <GitFork size={18} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {project.github.forks_count}
              </p>
            </div>
          </div>
        ) : null}
        <div className="mt-1 flex flex-row items-center flex-wrap gap-x-2 gap-y-1.5">
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
