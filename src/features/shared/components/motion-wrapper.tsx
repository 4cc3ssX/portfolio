"use client";

import { HTMLMotionProps, motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type AnimationType = "fade" | "slideUp" | "slideDown" | "scale" | "none";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  as?: keyof typeof motion;
}

const animations: Record<AnimationType, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: {},
    visible: {},
  },
};

export default function MotionWrapper({
  children,
  className = "",
  animation = "fade",
  delay = 0,
  duration = 0.4,
  as = "div",
}: MotionWrapperProps) {
  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={animations[animation]}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
