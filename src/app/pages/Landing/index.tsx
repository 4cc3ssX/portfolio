"use client";

import { motion } from "framer-motion";
import { IMe } from "@/types";
import { Ref, forwardRef } from "react";
import { handleNavigate } from "@/utils";
import { links } from "@/data";

interface Props extends IMe {}

const Landing = ({ name, nickname, message }: Props, ref: Ref<any>) => {
  return (
    <div id="landing" className="snap-start relative flex pt-14 h-screen">
      <motion.div
        initial={{ backgroundSize: "120%" }}
        animate={{ backgroundSize: "100%" }}
        transition={{
          type: "spring",
          damping: 35,
          stiffness: 300,
        }}
        className="absolute inset-0 sm:bg-main bg-contain bg-no-repeat -z-10"
      />
      <div className="flex flex-1 flex-col justify-center items-center">
        <motion.div
          ref={ref}
          initial={{ x: 150, opacity: 0.4 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-y-3 w-full md:w-1/2 lg:w-2/5 px-6"
        >
          <div>
            <motion.p
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.5 }}
              className="font-sans text-xs md:text-sm"
            >
              Hi there! I&apos;m
            </motion.p>
            <div className="flex flex-row justify-start items-baseline">
              <motion.p
                initial={{ x: 15 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.4 }}
                className="font-sans font-medium text-2xl md:text-3xl"
              >
                {name}{" "}
                <span className="font-sans text-color text-xs md:text-sm">
                  /
                </span>
                <span className="font-sans text-primary text-xs md:text-sm pl-2">
                  {nickname}
                </span>
              </motion.p>
            </div>
          </div>
          <div>
            <p className="font-sans text-sm md:text-base leading-8">
              {message}
            </p>
          </div>
          <div>
            <button
              type="button"
              className="px-6 py-2 font-sans text-white text-sm md:text-base rounded-md bg-secondary shadow-none transition-shadow ease-in-out duration-500 hover:shadow-secondary"
              onClick={() => handleNavigate(links.at(0)?.path as string)}
            >
              Let&apos;s Started 👋🏻
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default forwardRef(Landing);