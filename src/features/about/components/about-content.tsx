import { FadeIn } from "@/components/ui/animated-text";
import { Section, SectionHeader } from "@/components/ui/section";
import { AboutSocialLinks } from "./about-social-links";
import { AboutHighlights } from "./about-highlights";

interface SocialLink {
  id: string;
  name: string;
  uri: string;
}

interface AboutContentProps {
  socials: SocialLink[];
}

export function AboutContent({ socials }: AboutContentProps) {
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
              title="Building the future, one line at a time"
              description="I'm a passionate software engineer who loves turning complex problems into elegant solutions."
              className="mb-8!"
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-4 leading-relaxed text-muted-foreground/80">
              <p>
                With over 5 years of experience in software development, I
                specialize in building scalable, event-driven systems using
                modern technologies. My expertise spans across the full stack,
                from crafting pixel-perfect UIs to architecting robust backend
                services.
              </p>
              <p>
                I&apos;m particularly passionate about clean architecture,
                developer experience, and creating systems that not only work
                but are a joy to maintain and scale. When I&apos;m not coding,
                you&apos;ll find me contributing to open source or exploring new
                technologies.
              </p>
            </div>
          </FadeIn>

          <AboutSocialLinks links={socials} />
        </div>

        {/* Right Column - Bento Grid */}
        <AboutHighlights />
      </div>
    </Section>
  );
}
