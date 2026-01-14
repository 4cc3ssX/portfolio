import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { AvailabilityBadge } from "./availability-badge";
import { HeroHeading } from "./hero-heading";
import { HeroIntro } from "./hero-intro";
import { HeroCTAButtons } from "./hero-cta-buttons";
import { HeroStats } from "./hero-stats";
import { ScrollIndicator } from "./scroll-indicator";

interface HeroProps {
  user: UserWithLinksAndAvatar;
}

export function Hero({ user }: HeroProps) {
  const resumeLink = user.links.find((link) => link.name.match(/resume/i));

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden">
      {/* Background grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white/[0.03] to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 bg-gradient-to-tl from-white/[0.02] to-transparent blur-3xl" />

      {/* Top gradient line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <AvailabilityBadge />
        <HeroHeading />
        <HeroIntro nickname={user.nickname} message={user.message} />
        <HeroCTAButtons resumeLink={resumeLink?.uri} />
        <HeroStats />
      </div>

      <ScrollIndicator />

      {/* Corner accents */}
      <div className="pointer-events-none absolute left-6 top-24 h-20 w-px bg-gradient-to-b from-white/10 to-transparent" />
      <div className="pointer-events-none absolute right-6 top-24 h-20 w-px bg-gradient-to-b from-white/10 to-transparent" />
    </section>
  );
}
