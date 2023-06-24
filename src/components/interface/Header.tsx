"use client";

import { links } from "@/data";
import { handleNavigate } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    const initialPath = "/" + window.location.hash;
    if (initialPath !== "/") {
      handleNavigate(initialPath, setPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <motion.div
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 30, // Determines the strength of the spring
        stiffness: 250, // Determines the speed of the spring
      }}
      className="h-14 fixed top-0 inset-x-0 bg-header backdrop-blur-[10px] flex flex-row justify-end items-center px-10 z-10"
    >
      <div className="flex flex-row items-center md:gap-x-8 lg:gap-x-12">
        {links.map((link) => {
          const isActive = link.path === path;
          return (
            <div
              key={link.name}
              className="relative flex flex-col items-center"
            >
              <Link
                href={link.path}
                className="font-sans text-white text-sm lg:text-base"
                scroll={false}
                onClick={() => handleNavigate(link.path, setPath)}
              >
                {link.name}
              </Link>
              <AnimatePresence initial={false} mode="wait">
                {isActive ? (
                  <motion.div
                    layoutId="indicator"
                    className="w-6 h-0.5 rounded-full bg-primary shadow-primary absolute -bottom-0.5"
                  />
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
        <button
          type="button"
          className="px-4 py-1 h-8 font-sans text-white text-sm rounded-md bg-primary shadow-primary"
        >
          Resume
        </button>
      </div>
    </motion.div>
  );
};

export default Header;
