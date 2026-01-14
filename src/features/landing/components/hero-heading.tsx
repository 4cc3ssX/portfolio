import { MotionWrapper } from "@/features/shared";

export function HeroHeading() {
  return (
    <MotionWrapper
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="mt-8"
    >
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        <span className="block text-foreground">Building software</span>
        <span className="block text-foreground/50">that scales</span>
      </h1>
    </MotionWrapper>
  );
}
