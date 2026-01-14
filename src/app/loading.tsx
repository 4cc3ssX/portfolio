"use client";

import { motion } from "motion/react";
import { MotionWrapper } from "@/features/shared";

export default function Loading() {
  return (
    <MotionWrapper
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Gradient orb */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white/[0.03] to-transparent blur-3xl" />

      <div className="relative flex flex-col items-center gap-8">
        {/* Geometric loader */}
        <div className="relative h-16 w-16">
          {/* Outer square */}
          <motion.div
            className="absolute inset-0 border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Middle square */}
          <motion.div
            className="absolute inset-2 border border-white/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner square with pulse */}
          <motion.div
            className="absolute inset-4 border border-white/40"
            animate={{
              scale: [1, 0.8, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Center dot */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-white"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-3">
          <MotionWrapper
            className="flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {["L", "O", "A", "D", "I", "N", "G"].map((letter, i) => (
              <motion.span
                key={i}
                className="text-[10px] font-medium tracking-[0.3em] text-muted-foreground/60"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </MotionWrapper>

          {/* Progress line */}
          <div className="relative h-px w-24 overflow-hidden bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              animate={{ x: [-32, 96] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="pointer-events-none absolute left-6 top-6 h-12 w-px bg-gradient-to-b from-white/20 to-transparent" />
      <div className="pointer-events-none absolute left-6 top-6 h-px w-12 bg-gradient-to-r from-white/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-12 w-px bg-gradient-to-t from-white/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-px w-12 bg-gradient-to-l from-white/20 to-transparent" />
    </MotionWrapper>
  );
}
