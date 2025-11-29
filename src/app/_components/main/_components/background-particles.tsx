"use client";

import dynamic from "next/dynamic";

const Particles = dynamic(
  () => import("@/components/ui/particles").then((m) => ({ default: m.Particles })),
  { ssr: false }
);

export function BackgroundParticles() {
  return (
    <Particles
      className="absolute inset-0"
      quantity={30}
      ease={80}
      size={0.2}
      refresh
    />
  );
}
