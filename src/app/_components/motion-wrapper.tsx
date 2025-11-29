"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function MotionWrapper({
  children,
  className = "",
}: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
