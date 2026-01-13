"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
  duration?: number;
  gap?: number;
  fade?: boolean;
  fadeSize?: number;
}

export function Marquee({
  children,
  className,
  pauseOnHover = false,
  reverse = false,
  duration = 40,
  gap = 16,
  fade = true,
  fadeSize = 100,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        pauseOnHover && "[--play-state:running] hover:[--play-state:paused]",
        className
      )}
      style={{
        ["--duration" as string]: `${duration}s`,
        ["--gap" as string]: `${gap}px`,
      }}
    >
      {/* Left fade gradient */}
      {fade && (
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full bg-gradient-to-r from-background to-transparent"
          style={{ width: `${fadeSize}px` }}
        />
      )}
      
      {/* Right fade gradient */}
      {fade && (
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full bg-gradient-to-l from-background to-transparent"
          style={{ width: `${fadeSize}px` }}
        />
      )}

      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-[var(--gap)]",
          "animate-marquee",
          reverse && "[animation-direction:reverse]"
        )}
        style={{
          animationPlayState: "var(--play-state, running)",
          animationDuration: "var(--duration)",
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-[var(--gap)]",
          "animate-marquee",
          reverse && "[animation-direction:reverse]"
        )}
        aria-hidden
        style={{
          animationPlayState: "var(--play-state, running)",
          animationDuration: "var(--duration)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
