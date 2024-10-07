"use client";

import { INavLink, navLinks } from "@/data/nav-links";
import { UserWithLinks } from "@/shared/db/schema";
import { handleNavigate } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [path, setPath] = useState<string>("");

  const onClickLink = (link: INavLink) => {
    handleNavigate(link.path, (path) => {
      setOpen(false);
      setPath(path);
    });
  };

  useEffect(() => {
    const initialPath = "/" + window.location.hash;
    if (initialPath !== "/") {
      handleNavigate(initialPath, setPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ y: -64, top: 0, opacity: 0 }}
      animate={{ y: 0, top: 12, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeIn",
        top: {
          delay: 0.8,
        },
      }}
      className={`fixed inset-x-0 flex flex-col items-center justify-center z-10`}
    >
      <motion.div
        initial={{ borderColor: "transparent" }}
        animate={{
          borderColor: "hsl(var(--border))",
        }}
        transition={{
          duration: 0.5,
          ease: "easeIn",
          delay: 0.8,
        }}
        className={`${
          isOpen ? "h-screen" : "h-12"
        } md:h-10 border border-muted rounded-full bg-background/50 backdrop-blur-lg md:backdrop-blur-sm flex flex-col md:flex-row justify-center items-center px-4 md:px-10 py-3 transition-all duration-200 ease-out`}
      >
        <div
          className={`${
            isOpen
              ? "flex-1 md:flex-none flex flex-col justify-center self-stretch"
              : "hidden"
          } md:block`}
          onClick={() => setOpen(false)}
        >
          <div className="flex flex-col md:flex-row items-center md:gap-x-8 lg:gap-x-12 gap-y-4">
            {navLinks.map((link) => {
              const isActive = link.path === path;
              return (
                <div
                  key={link.name}
                  className="relative flex flex-col items-center"
                >
                  <Link
                    href={link.path}
                    className="font-normal text-white text-xl sm:text-sm"
                    scroll={false}
                    onClick={() => onClickLink(link)}
                  >
                    {link.name}
                  </Link>
                  <AnimatePresence initial={false} mode="wait">
                    {isActive ? (
                      <motion.div
                        // to prevent layout animation in mobile devices
                        layoutId={isOpen ? "" : "indicator"}
                        className="w-5 h-0.5 rounded-full bg-primary shadow-primary absolute -bottom-0.5"
                      />
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
