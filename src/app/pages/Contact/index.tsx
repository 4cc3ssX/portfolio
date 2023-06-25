"use client";

import { IContact, IMe } from "@/types";
import { openURL } from "@/utils";
import { motion } from "framer-motion";
import { useCallback } from "react";

interface Props extends IContact {
  data: IMe;
}

export default function Contact({ message, data }: Props) {
  const sayHi = useCallback(() => {
    openURL(
      `mailto:${data.email}?subject=${encodeURIComponent(
        "Collaboration Opportunity: Let's Create Something Amazing!"
      )}`
    );
  }, [data.email]);
  return (
    <div
      id="contact"
      className="relative snap-start flex pt-14 w-screen h-screen"
    >
      <div className="absolute left-0 right-0 bottom-8">
        <p className="font-sans text-xs text-hint text-center">
          Designed & Built by {data.nickname}
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-center items-center">
        <motion.div
          initial={{ x: 100, opacity: 0.4 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
          className="flex-1 flex flex-col gap-y-3 w-full sm:w-3/4 md:w-3/4 lg:w-7/12 px-6 justify-center"
        >
          <div className="flex flex-col items-center gap-1.5">
            <div>
              <p className="font-sans font-medium text-center text-xl sm:text-2xl">
                What&apos;s Next?
              </p>
            </div>
            <div className="w-12 h-1 rounded-full bg-primary shadow-primary" />
          </div>
          <div className="flex-none flex flex-col items-center">
            <p className="font-sans text-base leading-8 tracking-wide hyphens-auto text-center">
              {message}
            </p>
          </div>
          <div className="h-72 flex flex-col justify-center items-center">
            <button
              type="button"
              className="w-40 h-10 font-sans text-sm md:text-base rounded-md hover:bg-primary border border-primary500 text-primary hover:text-white"
              title={data.email}
              onClick={sayHi}
            >
              Say Hi!
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
