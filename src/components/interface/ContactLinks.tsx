"use client";

import { Email, Github, Linkedin } from "@/components/icons";
import { IMe } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props extends IMe {}

export default function ContactLinks({ github, linkedin, email, name }: Props) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 30 }}
      whileHover={{ y: 0 }}
      transition={{
        type: "spring",
        damping: 25, // Determines the strength of the spring
        stiffness: 300, // Determines the speed of the spring
      }}
      className="fixed bottom-0 right-6 md:right-12 flex flex-col justify-end items-center gap-y-2 z-10"
    >
      <Link href={`mailto:${email}`} target="_blank" title={email}>
        <div className="absolute top-0 right-0 flex justify-center items-center h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
        </div>
        <Email />
      </Link>
      <div className="w-0.5 h-1.5 rounded-full bg-bar" />
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
