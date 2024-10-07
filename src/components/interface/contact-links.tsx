"use client";

import { Email, Github, Linkedin } from "@/components/icons";
import { LinkType, UserWithLinks } from "@/shared/db/schema";
import { motion } from "framer-motion";
import Link from "next/link";
import { Fragment } from "react";

interface Props {
  data: UserWithLinks;
}

const icons = {
  linkedin: Linkedin,
  github: Github,
};

export function ContactLinks({ data }: Props) {
  const socials = data.links.filter((link) => link.type === LinkType.SOCIAL);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 300,
      }}
      className="fixed bottom-0 right-6 md:right-12 flex flex-col justify-end items-center gap-y-2 z-10"
    >
      <Link href={`mailto:${data.email}`} title={data.email}>
        <div className="absolute -top-1 -right-1 flex justify-center items-center h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
        </div>
        <Email />
      </Link>
      <div className="w-0.5 h-1.5 rounded-full bg-muted" />
      {socials.map((link, index) => {
        const Icon = icons[link.name.toLowerCase() as keyof typeof icons];

        if (!Icon) {
          return null;
        }

        return (
          <Fragment key={link.id}>
            <Link
              key={link.name}
              href={link.uri}
              target="_blank"
              title={link.name}
            >
              <Icon />
            </Link>
            {index !== socials.length - 1 && (
              <div className="w-0.5 h-1.5 rounded-full bg-muted" />
            )}
          </Fragment>
        );
      })}
      <div className="w-0.5 h-12 rounded-full bg-muted" />
    </motion.div>
  );
}
