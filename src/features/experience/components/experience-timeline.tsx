import { StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import { ExperienceCard } from "./experience-card";

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

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <StaggerContainer className="relative mt-12" staggerDelay={0.1}>
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent md:left-8" />

      <div className="space-y-2">
        {experiences.map((exp) => (
          <StaggerItem key={exp.id}>
            <ExperienceCard {...exp} />
          </StaggerItem>
        ))}
      </div>
    </StaggerContainer>
  );
}
