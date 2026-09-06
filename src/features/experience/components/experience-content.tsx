import { FadeIn } from "@/components/ui/animated-text";
import { Section, SectionHeader } from "@/components/ui/section";
import { ExperienceTimeline } from "./experience-timeline";
import type { ExperienceView } from "@/types/content";

interface ExperienceContentProps {
  experiences: ExperienceView[];
}

export function ExperienceContent({ experiences }: ExperienceContentProps) {
  return (
    <Section id="experience" className="relative">
      {/* Background accent */}
      <div className="pointer-events-none absolute left-0 top-1/2 hidden h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-white/[0.02] to-transparent blur-xl md:block md:blur-3xl" />

      <FadeIn>
        <SectionHeader
          label="Experience"
          title="Where I've worked"
          description="My professional journey through the tech industry."
        />
      </FadeIn>

      <ExperienceTimeline experiences={experiences} />
    </Section>
  );
}
