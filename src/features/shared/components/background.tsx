"use client";

import dynamic from "next/dynamic";

const BGPattern = dynamic(
  () =>
    import("@/components/ui/bg-pattern").then((m) => ({
      default: m.BGPattern,
    })),
  { ssr: false, loading: () => null }
);

export function Background() {
  return <BGPattern variant="dots" mask="none"  />;
}
