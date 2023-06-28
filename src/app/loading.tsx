"use client";

import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  style: "normal",
  variable: "--font-Poppins",
});

export default function Loading() {
  return (
    <div
      className={`${poppins.className} w-screen h-screen flex flex-col justify-center items-center`}
    >
      <div className="flex flex-col items-center gap-2">
        <motion.p
          className="font-sans text-base text-white"
          animate={{
            opacity: [0.2, 0.4, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
        >
          Loading...
        </motion.p>
        <div className="relative w-40 h-1 rounded-full bg-bar overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 right-0 bg-primary"
            initial={{
              width: "0%",
            }}
            animate={{
              width: ["0%", "75%", "100%"],
              x: ["0%", "45%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
