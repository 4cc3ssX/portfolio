"use client";

import { motion } from "framer-motion";

import { IAboutMe } from "@/types";
import { useMemo } from "react";
import { sanitizeHTML } from "@/lib";

interface Props extends IAboutMe {}

export default function About({ description, skills, want_to_try }: Props) {
  const sanitizedHTML = useMemo(
    () => sanitizeHTML(description),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div id="about" className="flex pt-14 min-h-screen">
      <div className="flex-1 flex flex-col justify-start sm:justify-center items-center">
        <motion.div
          initial={{ x: 100, opacity: 0.4 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
          className="flex-1 sm:flex-none flex flex-col gap-y-3 w-full sm:w-3/4 md:w-3/4 lg:w-7/12 px-6"
        >
          <div className="flex flex-row items-center gap-2">
            <div>
              <p className="font-sans font-medium text-2xl">
                About Me
              </p>
            </div>
            <div className="w-4 h-1 rounded-full bg-primary shadow-primary" />
          </div>
          <div>
            <p
              className="font-sans text-base leading-7 sm:leading-8 whitespace-pre-line hyphens-auto"
              dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />
          </div>
          <div className="mt-1 flex flex-col justify-start gap-2">
            <div>
              <p className="font-sans font-medium text-lg sm:text-xl">
                Things that I used to.
              </p>
            </div>
            <div className="flex flex-row items-center flex-wrap gap-3">
              {skills.map((skill) => {
                return (
                  <div
                    key={skill}
                    className="px-4 py-1 bg-primary50 border border-primary200 rounded-md"
                  >
                    <p className="font-sans text-sm text-primary">
                      {skill}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col justify-start gap-2">
            <div>
              <p className="font-sans font-medium text-lg sm:text-xl">
                Things I&apos;d love to try.
              </p>
            </div>
            <div className="flex flex-row items-center flex-wrap gap-3">
              {want_to_try.map((wantToTry) => {
                return (
                  <div
                    key={wantToTry}
                    className="px-4 py-1 bg-secondary rounded-md"
                  >
                    <p className="font-sans text-sm text-white">
                      {wantToTry}
                    </p>
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
