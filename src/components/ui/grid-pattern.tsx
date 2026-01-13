"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";

interface GridPatternProps {
  className?: string;
  cellSize?: number;
  strokeWidth?: number;
  fadeMask?: boolean;
}

export function GridPattern({
  className,
  cellSize = 64,
  strokeWidth = 1,
  fadeMask = true,
}: GridPatternProps) {
  const id = useId();

  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={id}
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeOpacity={0.1}
          />
        </pattern>
        {fadeMask && (
          <radialGradient id={`${id}-fade`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        )}
        {fadeMask && (
          <mask id={`${id}-mask`}>
            <rect width="100%" height="100%" fill={`url(#${id}-fade)`} />
          </mask>
        )}
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${id})`}
        mask={fadeMask ? `url(#${id}-mask)` : undefined}
      />
    </svg>
  );
}
