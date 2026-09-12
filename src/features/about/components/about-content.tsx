import { FadeIn } from "@/components/ui/animated-text";
import { Section, SectionHeader } from "@/components/ui/section";
import { AboutSocialLinks } from "./about-social-links";
import { AboutHighlights } from "./about-highlights";
import type { FactView } from "@/types/content";

interface SocialLink {
  id: string;
  name: string;
  uri: string;
}

interface AboutContentProps {
  socials: SocialLink[];
  heading: string;
  body: string;
  slogan: string;
  quickFacts: FactView[];
}

export function AboutContent({
  socials,
  heading,
  body,
  slogan,
  quickFacts,
}: AboutContentProps) {
  return (
    <Section id="about" className="relative">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 translate-x-1/2 bg-gradient-to-l from-white/[0.02] to-transparent blur-3xl" />

      <div className="relative grid gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Left Column */}
        <div>
          <FadeIn>
            <SectionHeader
              label="About"
              title={heading}
              description={slogan}
              className="mb-8!"
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-4 leading-relaxed text-muted-foreground/80">
              {body.split(/\n{2,}/).map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>

          <AboutSocialLinks links={socials} />
        </div>

        {/* Right Column - Bento Grid */}
        <AboutHighlights highlights={quickFacts} />
      </div>
    </Section>
  );
}
