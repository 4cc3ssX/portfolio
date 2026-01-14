"use client";

import { MotionWrapper } from "@/features/shared";

export function AvailabilityBadge() {
  return (
    <MotionWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="will-change-transform"
    >
      <span className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 bg-emerald-500" />
        </span>
        Available for work
      </span>
    </MotionWrapper>
  );
}
