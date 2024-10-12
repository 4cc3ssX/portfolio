"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./_components";
import { ProjectWithLinkAndTags } from "@/shared/db/schema";

interface Props {
  data: ProjectWithLinkAndTags[];
}

export default function Projects({ data }: Props) {
  return (
    <div id="projects" className="flex pt-14 min-h-dvh">
      <div className="flex-1 flex flex-col justify-start md:justify-center items-center">
        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0)" }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="flex-1 md:flex-none flex flex-col gap-y-3 w-full sm:w-3/4 md:w-4/6 lg:w-7/12 xl:w-1/2 px-6"
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
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
