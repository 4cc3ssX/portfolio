"use client";

import { cn } from "@/lib/utils";
import { motion, Easing } from "framer-motion";

interface GradientBlurProps {
  className?: string;
  variant?: "primary" | "secondary" | "accent";
  animate?: boolean;
}

export function GradientBlur({
  className,
  variant = "primary",
  animate = true,
}: GradientBlurProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-neutral-200/30 via-neutral-300/20 to-neutral-200/30 dark:from-neutral-800/40 dark:via-neutral-700/30 dark:to-neutral-800/40",
    secondary:
      "bg-gradient-to-br from-neutral-300/20 to-transparent dark:from-neutral-700/20 dark:to-transparent",
    accent:
      "bg-gradient-to-tr from-neutral-400/10 via-transparent to-neutral-400/10 dark:from-neutral-600/10 dark:via-transparent dark:to-neutral-600/10",
  };

  if (animate) {
    return (
      <motion.div
        className={cn(
          "pointer-events-none absolute rounded-full blur-3xl",
          variants[variant],
          className
        )}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut" as Easing,
        }}
      />
    );
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        variants[variant],
        className
      )}
    />
  );
}
