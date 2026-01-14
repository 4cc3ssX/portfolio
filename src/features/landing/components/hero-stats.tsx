"use client";

import { motion } from "motion/react";
import { MotionWrapper } from "@/features/shared";

interface Stat {
  value: string;
  label: string;
}

interface HeroStatsProps {
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { value: "5+", label: "Years" },
  { value: "15+", label: "Projects" },
  { value: "20+", label: "Open Source" },
];

export function HeroStats({ stats = defaultStats }: HeroStatsProps) {
  return (
    <MotionWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      className="mt-12 flex items-center justify-center gap-10 sm:gap-16"
    >
      {stats.map((stat, index) => (
        <div key={stat.label} className="text-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {stat.value}
          </motion.p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50">
            {stat.label}
          </p>
        </div>
      ))}
    </MotionWrapper>
  );
}
