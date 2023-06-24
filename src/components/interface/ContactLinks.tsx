"use client";

import { Email, Github, Linkedin } from "@/components/icons";
import { IMe } from "@/types";
import { AnimatePresence, Variants, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props extends IMe {
  isLandingInView: boolean;
}

const emailVariants: Variants = {
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.2,
    },
  },
};

export default function ContactLinks({
  github,
  linkedin,
  email,
  name,
  isLandingInView: isInView = true,
}: Props) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // wait for `isInView` state change
    setTimeout(() => {
      setIsReady(true);
    }, 100);
  }, []);
  return (
    <motion.div
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        damping: 25, // Determines the strength of the spring
        stiffness: 300, // Determines the speed of the spring
      }}
      className="fixed bottom-0 right-6 md:right-12 flex flex-col justify-end items-center gap-y-2 z-10"
    >
      <AnimatePresence initial={false} mode="wait">
        {isReady && !isInView ? (
          <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={emailVariants}
            className="flex flex-col justify-end items-center gap-y-2"
          >
            <Link href={`mailto:${email}`} target="_blank" title={email}>
              <div className="absolute top-0 right-0 flex justify-center items-center h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </div>

              <Email />
            </Link>
            <div className="w-0.5 h-1.5 rounded-full bg-bar" />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <Link href={github} target="_blank" title={github.split("/").at(-1)}>
        <Github />
      </Link>
      <div className="w-0.5 h-1.5 rounded-full bg-bar" />
      <Link href={linkedin} target="_blank" title={name}>
        <Linkedin />
      </Link>
      <div className="w-0.5 h-12 rounded-full bg-bar" />
    </motion.div>
  );
}
