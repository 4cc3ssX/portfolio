import { MotionWrapper } from "@/features/shared";

interface HeroIntroProps {
  nickname: string | null;
  message: string | null;
}

export function HeroIntro({ nickname, message }: HeroIntroProps) {
  return (
    <MotionWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="mt-8 will-change-transform"
    >
      <p className="text-base font-medium tracking-wide text-foreground/80 sm:text-lg">
        {nickname} <span className="text-foreground/30">·</span> Software
        Engineer
      </p>
      {message && (
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground/60 sm:text-base">
          {message}
        </p>
      )}
    </MotionWrapper>
  );
}
