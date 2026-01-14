"use client"

import { Section } from "@/components/ui/section";
import { Marquee } from "@/components/ui/marquee";
import { FadeIn } from "@/components/ui/animated-text";
import { cn } from "@/lib/utils";
import { SkillWithTag } from "@/features/skills/types/skills";
import { Icon, IconName, icons } from "@/components/svgs";

interface SkillsSectionProps {
  skills: SkillWithTag[];
}

function SkillBadge({ skill }: { skill: SkillWithTag }) {
  // Check if we have an icon for this skill (using term as key)
  const iconKey = skill.tag.term.toLowerCase() as IconName;
  const hasIcon = iconKey in icons;

  return (
    <div
      className={cn(
        "group flex items-center gap-3 border border-white/[0.06] bg-white/[0.01] px-5 py-3",
        "transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03]"
      )}
    >
      {hasIcon && (
        <div className="flex h-5 w-5 items-center justify-center text-muted-foreground/60 transition-colors duration-300 group-hover:text-foreground/80">
          <Icon name={iconKey} size={20} className="fill-current" />
        </div>
      )}
      <span className="whitespace-nowrap text-sm font-medium text-muted-foreground/70 transition-colors duration-300 group-hover:text-foreground/90">
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
    <Section
      id="skills"
      container={false}
      className="overflow-hidden py-20 md:py-24"
    >
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
        <Marquee
          direction="right"
          pauseOnHover
          duration={50}
          gap={12}
          fadeSize={120}
        >
          <div className="flex gap-3 ml-3">
            {firstRow.map((skill) => (
              <SkillBadge key={skill.id} skill={skill} />
            ))}
          </div>
        </Marquee>

        {/* Second Row - Right to Left */}
        <Marquee
          direction="left"
          pauseOnHover
          duration={50}
          gap={12}
          fadeSize={120}
        >
          <div className="flex gap-3 ml-3">
            {secondRow.map((skill) => (
              <SkillBadge key={skill.id} skill={skill} />
            ))}
          </div>
        </Marquee>
      </div>
    </Section>
  );
}
