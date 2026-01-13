"use client";

import { cn } from "@/lib/utils";

interface NoiseProps {
  className?: string;
  opacity?: number;
}

export function Noise({ className, opacity = 0.03 }: NoiseProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-50",
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity,
      }}
    />
  );
}

interface GrainProps {
  className?: string;
}

export function Grain({ className }: GrainProps) {
  return (
    <svg className={cn("pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.02]", className)}>
      <filter id="grain">
        <feTurbulence type="turbulence" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
