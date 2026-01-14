"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type AnimationType = "fade" | "slideUp" | "slideDown" | "scale" | "none";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
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
  as = "div",
  ...motionProps
}: MotionWrapperProps) {
  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent
      variants={animations[animation]}
      className={cn("will-change-transform", className)}
      {...motionProps}
    >
      {children}
    </MotionComponent>
  );
}
