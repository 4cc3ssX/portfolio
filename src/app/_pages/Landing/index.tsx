"use client";

import { motion } from "framer-motion";
import { handleNavigate, openURL } from "@/utils";
import { UserWithLinks } from "@/shared/db/schema";
import { Button } from "@/components/ui/button";

interface Props {
  data: UserWithLinks;
}

const Landing = ({ data }: Props) => {
  const resumeLink = data.links.find((link) => link.name.match(/resume/i));
  return (
    <div id="landing" className="relative flex pt-14 min-h-dvh">
      <div className="flex flex-1 flex-col justify-center items-center">
        <motion.div
          initial={{
            y: 20,
            filter: "blur(8px)",
            opacity: 0,
          }}
          animate={{
            y: 0,
            filter: "blur(0px)",
            opacity: 1,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col gap-y-4 w-full md:w-4/6 lg:w-7/12 px-6 will-change-auto"
        >
          <div className="flex flex-col gap-y-3">
            <p className="text-sm md:text-base">Hi, I&apos;m {data.nickname}!</p>
            <p className="font-bold text-4xl md:text-5xl">{data.slogan}</p>
            <p className="text-sm md:text-base">
              I&apos;m a full-stack software engineer based in{" "}
              <span className="text-blue-500 cursor-pointer after:content-['_↗']">Bangkok</span>, who
              loves at breaking things, building cutting-edge, accessible and
              well-optimized apps.
            </p>
          </div>
          <div className="mt-6 sm:mt-1 flex flex-row gap-x-2">
            <Button
              className="rounded-full"
              onClick={() => handleNavigate("#about")}
            >
              Let&apos;s Get Started 👋🏻
            </Button>
            {resumeLink ? (
              <Button
                variant="link"
                onClick={() => openURL(resumeLink.uri, true)}
              >
                Download Resume
              </Button>
            ) : null}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
