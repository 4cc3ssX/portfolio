"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="w-screen h-dvh flex flex-col justify-center items-center font-sans">
      <div className="flex flex-col items-center gap-2">
        <motion.p
          className="text-base"
          animate={{
            opacity: [0.4, 0.7, 1],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          Getting ready...
        </motion.p>
        <div className="relative w-48 h-0.5 rounded-ful bg-secondary overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 right-0 bg-foreground rounded-full"
            initial={{
              width: "0%",
            }}
            animate={{
              width: ["0%", "70%", "100%"],
              x: ["0%", "45%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 1.2,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
