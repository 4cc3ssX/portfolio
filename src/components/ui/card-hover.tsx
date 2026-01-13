"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

interface CardHoverProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function CardHover({
  children,
  className,
  containerClassName,
}: CardHoverProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn("group relative", containerClassName)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(120, 120, 120, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div
        className={cn(
          "relative rounded-xl border border-border bg-card p-6 transition-colors duration-300",
          "hover:border-muted-foreground/30",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export function GlowCard({ children, className }: GlowCardProps) {
  return (
    <div className={cn("group relative", className)}>
      <div className="absolute -inset-0.5 rounded-xl bg-linear-to-r from-neutral-200 to-neutral-300 opacity-0 blur transition-all duration-500 group-hover:opacity-75 dark:from-neutral-800 dark:to-neutral-700" />
      <div className="relative rounded-xl border border-border bg-card p-6">
        {children}
      </div>
    </div>
  );
}
