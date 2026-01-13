"use client";

import { Section } from "@/components/ui/section";
import { Marquee } from "@/components/ui/marquee";
import { FadeIn } from "@/components/ui/animated-text";
import { cn } from "@/lib/utils";
import { SkillWithTag } from "@/features/skills/types/skills";

interface SkillsSectionProps {
  skills: SkillWithTag[];
}

function SkillBadge({ skill }: { skill: SkillWithTag }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border border-white/[0.08] bg-white/[0.02] px-4 py-2",
        "transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
      )}
    >
      <span className="whitespace-nowrap text-sm text-foreground/70 transition-colors hover:text-foreground">
        {skill.tag.name}
      </span>
    </div>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  // Split skills into two rows for marquee
  const midPoint = Math.ceil(skills.length / 2);
  const firstRow = skills.slice(0, midPoint);
  const secondRow = skills.slice(midPoint);

  return (
    <Section id="skills" container={false} className="overflow-hidden py-20 md:py-24">
      <FadeIn className="mb-10 px-6 text-center md:px-8">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
          Skills
        </p>
        <h2 className="text-2xl font-medium tracking-tight text-foreground/90 md:text-3xl">
          Technologies I work with
        </h2>
      </FadeIn>

      <div className="space-y-3">
        {/* First Row - Left to Right */}
        <Marquee pauseOnHover duration={50} gap={12} fadeSize={120}>
          {firstRow.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} />
          ))}
        </Marquee>

        {/* Second Row - Right to Left */}
        <Marquee pauseOnHover reverse duration={50} gap={12} fadeSize={120}>
          {secondRow.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} />
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
