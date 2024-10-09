"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";

export interface ParallaxCardProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  backgroundClassName?: string;
  perspective?: number;
  gradientSize?: number;
  rotationSensitivity?: number;
  transitionDuration?: number;
  gradientColor?: string;
}

export const ParallaxCard = ({
  children,
  onClick,
  className = "",
  backgroundClassName = "",
  perspective = 800,
  gradientSize = 200,
  rotationSensitivity = 80,
  transitionDuration = 0.2,
  gradientColor = "hsl(var(--secondary) / 50%)",
}: ParallaxCardProps) => {
  const motionRotateX = useMotionValue(0);
  const motionRotateY = useMotionValue(0);
  const motionGradientX = useMotionValue(0);
  const motionGradientY = useMotionValue(0);

  const transform = useMotionTemplate`perspective(${perspective}px) rotateX(${motionRotateX}deg) rotateY(${motionRotateY}deg)`;
  const background = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${motionGradientX}px ${motionGradientY}px, ${gradientColor}, transparent 100%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const midWidth = width / 2;
    const midHeight = height / 2;

    const cursPosX = e.clientX - left;
    const cursPosY = e.clientY - top;
    const cursCenterX = midWidth - cursPosX;
    const cursCenterY = midHeight - cursPosY;

    motionRotateX.set(cursCenterY / rotationSensitivity);
    motionRotateY.set(-cursCenterX / rotationSensitivity);

    motionGradientX.set(cursPosX);
    motionGradientY.set(cursPosY);
  };

  const onMouseLeave = () => {
    motionRotateX.set(0);
    motionRotateY.set(0);

    motionGradientX.set(0);
    motionGradientY.set(0);
  };

  return (
    <motion.div
      style={{ transform, transformStyle: "preserve-3d" }}
      transition={{
        duration: transitionDuration,
        ease: "easeInOut",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("relative group rounded-xl cursor-pointer p-px", className)}
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br from-neutral-600/70 to-background -z-10 ${backgroundClassName}`}
      />
      {children}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background,
        }}
      />
    </motion.div>
  );
};
