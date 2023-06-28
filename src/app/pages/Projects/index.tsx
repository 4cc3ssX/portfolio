"use client";

import { IProject } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { openURL } from "@/utils";
import dayjs from "dayjs";
import { useMemo } from "react";

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
          <div className="flex flex-row items-center gap-2">
            <div>
              <p className="font-sans font-medium text-xl sm:text-2xl">
                Projects I&apos;ve developed
              </p>
            </div>
            <div className="w-4 h-1 rounded-full bg-primary shadow-primary" />
          </div>
          <div className="flex-1 mt-6">
            <div className="flex flex-col gap-10 sm:gap-6">
              {sortedData.map((project) => {
                return (
                  <div
                    key={`project-${project.title}`}
                    className="relative h-full px-4 py-2 flex flex-col sm:flex-row gap-10"
                  >
                    <div className="absolute -top-2 right-3 sm:inset-auto sm:relative flex-none group w-14 h-14 -z-10">
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
                          objectFit: 'cover',
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
                          <button onClick={() => openURL(project.link)}>
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
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
