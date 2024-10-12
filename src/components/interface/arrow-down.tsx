"use client";

import { motion } from "framer-motion";

export const ArrowDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-move-down"
    >
      <motion.path
        d="M8 18L12 22L16 18"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M12 2V22"
        initial={{ y: -50 }}
        animate={{ y: [0, -20, 0, -10, 0] }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
};
