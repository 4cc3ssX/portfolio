"use client";

import { links } from "@/data";
import { IMe, INavLink } from "@/types";
import { handleNavigate, openURL } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";

interface Props extends IMe {}

const Header = ({ resume_link }: Props) => {
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
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 30, // Determines the strength of the spring
        stiffness: 250, // Determines the speed of the spring
      }}
      className={`${
        isOpen ? "h-screen" : "h-14"
      } md:h-14 fixed top-0 inset-x-0 bg-header backdrop-blur-[18px] md:backdrop-blur-[10px] flex flex-col md:flex-row justify-start md:justify-end items-center px-6 md:px-10 py-3 z-10 transition-all duration-200 ease-out`}
    >
      <button
        type="button"
        className="md:hidden w-12 h-8 flex flex-col justify-center items-center bg-primary active:bg-primary200 rounded-md self-end"
        title="Open Menu"
        onClick={() => setOpen(!isOpen)}
      >
        <AnimatePresence initial={false} mode="wait">
          {isOpen ? (
            <IoCloseOutline
              size={20}
              className="text-white active:text-primary"
            />
          ) : (
            <IoMenuOutline
              size={20}
              className="text-white active:text-primary"
            />
          )}
        </AnimatePresence>
      </button>

      <div
        className={`${
          isOpen
            ? "flex-1 md:flex-none flex flex-col justify-center self-stretch"
            : "hidden"
        } md:block`}
        onClick={() => setOpen(false)}
      >
        <div className="flex flex-col md:flex-row items-center md:gap-x-8 lg:gap-x-12 gap-y-4">
          {links.map((link) => {
            const isActive = link.path === path;
            return (
              <div
                key={link.name}
                className="relative flex flex-col items-center"
              >
                <Link
                  href={link.path}
                  className="font-sans font-normal text-white text-xl sm:text-base"
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
                      className="w-6 h-0.5 rounded-full bg-primary shadow-primary absolute -bottom-0.5"
                    />
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
          <div className="block sm:hidden w-2/3 h-px bg-bar rounded-full" />
          <button
            type="button"
            className="px-5 py-1.5 font-sans text-white text-base sm:text-sm rounded-md bg-primary shadow-primary"
            onClick={() => openURL(resume_link, true)}
          >
            Resume
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
