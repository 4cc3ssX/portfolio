"use client";

import { motion } from "framer-motion";

import { UserWithLinks } from "@/shared/db/schema";

interface Props {
  data: UserWithLinks;
}

export default function About({ data }: Props) {
  return (
    <div id="about" className="flex pt-14 min-h-dvh">
      <div className="flex-1 flex flex-col justify-start sm:justify-center items-center">
        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="flex-1 md:flex-none flex flex-col gap-y-3 w-full sm:w-3/4 md:w-4/6 lg:w-7/12 xl:w-1/2 h-auto md:min-h-[75%] px-6"
        >
          <div className="flex flex-col gap-y-1">
            <p className="font-medium text-xl sm:text-2xl">About</p>
          </div>
          <div>
            <p className="text-base whitespace-pre-line hyphens-auto">
              Hi, I&apos;m Ryam! I&apos;m an experienced web and mobile app
              developer specializing in React, React Native, Typescript, and
              Javascript. I have a passion for crafting high-performance apps
              that solve real-world problems and provide a delightful user
              experience.
              
              With years of experience under my belt, I&apos;m
              confident in my ability to bring your ideas to life. And, as
              someone with a keen eye for design, I also have a strong interest
              in UI/UX, ensuring that every app I create is both functional and
              visually appealing.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
