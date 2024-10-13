"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      className="fixed inset-0 bg-background/70 flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center gap-2">
        <motion.p
          className="text-base"
          animate={{ opacity: [0.4, 0.7, 1] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          Getting ready...
        </motion.p>
        <div className="relative w-48 h-0.5 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 right-0 bg-foreground rounded-full"
            initial={{ width: "0%" }}
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
    </motion.div>
  );
}
