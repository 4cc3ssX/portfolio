"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
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
  direction = "left",
  reverse = false,
  duration = 40,
  gap = 16,
  fade = true,
  fadeSize = 100,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  
  // Support both direction prop and legacy reverse prop
  const isReversed = direction === "right" || reverse;

  // Pause animation when not visible for performance
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
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
          className="pointer-events-none absolute left-0 top-0 z-10 h-full bg-linear-to-r from-background to-transparent"
          style={{ width: `${fadeSize}px` }}
        />
      )}
      
      {/* Right fade gradient */}
      {fade && (
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full bg-linear-to-l from-background to-transparent"
          style={{ width: `${fadeSize}px` }}
        />
      )}

      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-(--gap)",
          "animate-marquee",
          isReversed && "[direction:reverse]"
        )}
        style={{
          animationPlayState: isVisible ? "var(--play-state, running)" : "paused",
          animationDuration: "var(--duration)",
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-(--gap)",
          "animate-marquee",
          isReversed && "[direction:reverse]"
        )}
        aria-hidden
        style={{
          animationPlayState: isVisible ? "var(--play-state, running)" : "paused",
          animationDuration: "var(--duration)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
