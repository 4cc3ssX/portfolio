"use client";

import { IProject } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { openURL } from "@/utils";
import dayjs from "dayjs";
import { useMemo } from "react";
import { ProjectCard } from "./components";

interface Props {
  data: IProject[];
}

export default function Projects({ data }: Props) {
  const sortedData = useMemo(
    () => data.sort((a, b) => b.from - a.from),
    [data]
  );
  return (
    <div id="projects" className="flex pt-14 min-h-screen">
      <div className="flex-1 flex flex-col justify-start items-center">
        <motion.div
          initial={{ x: 100, opacity: 0.4 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
          className="flex-1 md:flex-none flex flex-col gap-y-3 w-full sm:w-3/4 md:w-3/4 lg:w-7/12 px-6"
        >
          <div className="flex flex-col gap-y-1">
            <div className="flex flex-row items-center gap-2">
              <div>
                <p className="font-sans font-medium text-xl sm:text-2xl">
                  Projects I&apos;ve developed
                </p>
              </div>
              <div className="w-4 h-1 rounded-full bg-primary shadow-primary" />
            </div>
            <div>
              <p className="font-sans text-sm text-hint">
                Internal-use and private projects are ignored.
              </p>
            </div>
          </div>
          <div className="flex-1 mt-6">
            <div className="flex flex-col gap-10 sm:gap-6">
              {sortedData.map((project) => {
                return (
                  <ProjectCard
                    key={`project-${project.title}`}
                    project={project}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
