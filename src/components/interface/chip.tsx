"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

export const Chip = ({ children, className = "" }: ChipProps) => {
  return (
    <div
      className={cn(
        "px-3 py-px h-8 flex flex-col justify-center items-center rounded-md border border-muted",
        className
      )}
    >
      {children}
    </div>
  );
};
