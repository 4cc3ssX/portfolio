"use client";

import { IProject } from "@/types";
import { openURL } from "@/utils";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { BsBoxArrowUpRight } from "react-icons/bs";

export interface ProjectCardProps {
  project: IProject;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="relative h-full px-4 py-2 flex flex-col sm:flex-row gap-10">
      <div className="absolute -top-2 right-3 sm:inset-auto sm:relative flex-none group w-14 h-14 -z-10 sm:z-10">
        <div className="absolute -top-2.5 -left-3 -rotate-6 group-hover:-rotate-1 group-hover:-left-1 group-hover:-top-1 transition-all duration-300 w-14 h-14 bg-white/20 rounded-xl" />
        <div className="absolute -bottom-2.5 -right-3 rotate-6 group-hover:rotate-1 group-hover:-right-1 group-hover:-bottom-1 transition-all duration-300 w-14 h-14 bg-white/20 rounded-xl" />
        <Image
          alt={project.title}
          src={project.image.url}
          width={56}
          height={56}
          placeholder="blur"
          blurDataURL={project.image.blurhash_url}
          className="rounded-xl"
          style={{
            objectFit: "cover",
            filter: `drop-shadow(0 0 10px ${project.tint_color})`,
          }}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-x-3">
            <div>
              <Link
                href={project.link}
                target="_blank"
                className="font-sans font-medium text-2xl"
              >
                {project.title}
              </Link>
            </div>
            <button
              title={`Visit - ${project.title}`}
              onClick={() => openURL(project.link)}
            >
              <BsBoxArrowUpRight />
            </button>
          </div>
          <div>
            <p className="font-sans text-sm text-hint">
              {dayjs(project.from).format("MMM YYYY")}
              {" - "}
              {project.is_current
                ? "Present"
                : dayjs(project.to).format("MMM YYYY")}
            </p>
          </div>
        </div>
        <div>
          <p className="font-sans text-base leading-7 sm:leading-8 whitespace-pre-line hyphens-auto">
            {project.description}
          </p>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          {project.tags.map((tag, index) => {
            return (
              <div
                key={`project-tag-${tag.title}-${index}`}
                className="px-3 py-0.5 h-6 flex flex-col justify-center items-center rounded-md"
                style={{
                  backgroundColor: tag.background_color,
                }}
              >
                <p
                  className="font-sans text-sm text-center"
                  style={{
                    color: tag.text_color,
                  }}
                >
                  {tag.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
