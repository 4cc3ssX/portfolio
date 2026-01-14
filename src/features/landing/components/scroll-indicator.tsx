import { MotionWrapper } from "@/features/shared";

export function ScrollIndicator() {
  return (
    <MotionWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2"
    >
      <MotionWrapper
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-1.5 will-change-transform"
      >
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground/40">
          Scroll
        </span>
        <div className="h-6 w-px bg-gradient-to-b from-muted-foreground/40 to-transparent" />
      </MotionWrapper>
    </MotionWrapper>
  );
}
