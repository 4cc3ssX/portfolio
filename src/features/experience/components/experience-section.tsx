"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import { ExperienceWithCompany } from "@/features/experience/types/experiences";

interface ExperienceSectionProps {
  experiences: ExperienceWithCompany[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
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

      <StaggerContainer className="relative mt-12" staggerDelay={0.1}>
        {/* Timeline Line */}
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent md:left-8" />

        <div className="space-y-2">
          {experiences.map((exp, index) => (
            <StaggerItem key={exp.id}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-6 z-10 h-2 w-2 -translate-x-1/2 border border-white/40 bg-background transition-colors duration-300 group-hover:border-white/80 group-hover:bg-white/20 md:left-8" />

                {/* Content Card */}
                <div className="ml-6 md:ml-16">
                  <div className="border border-white/[0.06] bg-white/[0.01] p-6 transition-all duration-300 group-hover:border-white/[0.12] group-hover:bg-white/[0.03]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {exp.company.image?.uri && (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/[0.08] bg-white/[0.02]">
                            <Image
                              src={exp.company.image.uri}
                              alt={exp.company.name}
                              width={24}
                              height={24}
                              className="h-6 w-6 object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-medium tracking-tight">{exp.position}</h3>
                            {exp.isActive && (
                              <span className="inline-flex items-center border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-emerald-400">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <Link
                              href={exp.company.uri || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                              {exp.company.name}
                              <ArrowUpRight className="h-3 w-3 opacity-50" />
                            </Link>
                            <span className="text-muted-foreground/30">•</span>
                            <span className="text-xs text-muted-foreground/60">
                              {dayjs(exp.startedAt).format("MMM YYYY")} —{" "}
                              {exp.isActive
                                ? "Present"
                                : dayjs(exp.endedAt).format("MMM YYYY")}
                            </span>
                          </div>
                          {exp.description && (
                            <p className="mt-4 text-sm leading-relaxed text-muted-foreground/70 line-clamp-3">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </Section>
  );
}
