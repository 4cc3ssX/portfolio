import { FadeIn } from "@/components/ui/animated-text";
import { Section, SectionHeader } from "@/components/ui/section";
import { ExperienceTimeline } from "./experience-timeline";

interface Company {
  name: string;
  uri: string | null;
  image: {
    uri: string;
  } | null;
}

interface Experience {
  id: string;
  position: string;
  company: Company;
  startedAt: string | Date;
  endedAt: string | Date | null;
  isActive: boolean;
  description: string | string[] | null;
}

interface ExperienceContentProps {
  experiences: Experience[];
}

export function ExperienceContent({ experiences }: ExperienceContentProps) {
  return (
    <Section id="experience" className="relative">
      {/* Background accent */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-white/[0.02] to-transparent blur-3xl" />

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
