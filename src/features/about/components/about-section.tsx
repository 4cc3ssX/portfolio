"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar, Code2, Coffee } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import { Icon, IconName } from "@/components/svgs";
import { cn } from "@/lib/utils";
import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { LinkType } from "@/features/users/schemas/links";

interface AboutSectionProps {
  user: UserWithLinksAndAvatar;
}

export function AboutSection({ user }: AboutSectionProps) {
  const socials = user.links.filter((link) => link.type === LinkType.SOCIAL);

  const highlights = [
    {
      icon: MapPin,
      label: "Based in",
      value: "Bangkok, Thailand",
    },
    {
      icon: Calendar,
      label: "Experience",
      value: "5+ Years",
    },
    {
      icon: Code2,
      label: "Focus",
      value: "Full Stack",
    },
    {
      icon: Coffee,
      label: "Fuel",
      value: "Coffee & Curiosity",
    },
  ];

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
            <div className="space-y-4 text-muted-foreground/80 leading-relaxed">
              <p>
                With over 5 years of experience in software development, I specialize
                in building scalable, event-driven systems using modern technologies.
                My expertise spans across the full stack, from crafting pixel-perfect
                UIs to architecting robust backend services.
              </p>
              <p>
                I&apos;m particularly passionate about clean architecture, developer
                experience, and creating systems that not only work but are a joy
                to maintain and scale. When I&apos;m not coding, you&apos;ll find me
                contributing to open source or exploring new technologies.
              </p>
            </div>
          </FadeIn>

          {/* Social Links */}
          <FadeIn delay={0.2}>
            <div className="mt-10">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">Connect</p>
              <div className="flex gap-2">
                {socials.map((link) => {
                  const shouldUseStrokeColor = ["x"].includes(
                    link.name.toLowerCase()
                  );

                  return (
                    <Link
                      key={link.id}
                      href={link.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={link.name}
                      className="group relative flex h-10 w-10 items-center justify-center border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                    >
                      <Icon
                        name={link.name.toLowerCase() as IconName}
                        className={cn(
                          "size-4 transition-transform duration-300 group-hover:scale-110",
                          shouldUseStrokeColor
                            ? "stroke-foreground/70 group-hover:stroke-foreground"
                            : "fill-foreground/70 group-hover:fill-foreground"
                        )}
                      />
                      <span className="sr-only">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Column - Bento Grid */}
        <StaggerContainer className="grid grid-cols-2 gap-3" staggerDelay={0.1}>
          {highlights.map((item, index) => (
            <StaggerItem key={item.label}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
              >
                {/* Corner accents */}
                <div className="absolute left-0 top-0 h-3 w-px bg-white/20 transition-all duration-300 group-hover:h-5 group-hover:bg-white/40" />
                <div className="absolute left-0 top-0 h-px w-3 bg-white/20 transition-all duration-300 group-hover:w-5 group-hover:bg-white/40" />
                <div className="absolute bottom-0 right-0 h-3 w-px bg-white/20 transition-all duration-300 group-hover:h-5 group-hover:bg-white/40" />
                <div className="absolute bottom-0 right-0 h-px w-3 bg-white/20 transition-all duration-300 group-hover:w-5 group-hover:bg-white/40" />
                
                <item.icon className="h-4 w-4 text-muted-foreground/60 transition-colors duration-300 group-hover:text-foreground/80" />
                <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground/60">{item.label}</p>
                <p className="mt-1 font-medium tracking-tight">{item.value}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}
