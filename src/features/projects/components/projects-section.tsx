"use client"

import Link from "next/link";
import dayjs from "dayjs";
import { ArrowUpRight, Star, GitFork } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import { ProjectWithLinkAndTagsWithGithubData } from "@/features/projects/actions/projects";
import { MotionWrapper } from "@/features/shared";

interface ProjectsSectionProps {
  projects: ProjectWithLinkAndTagsWithGithubData[];
  showAll?: boolean;
}

function ProjectCard({
  project,
  index,
}: {
  project: ProjectWithLinkAndTagsWithGithubData;
  index: number;
}) {
  return (
    <MotionWrapper
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative border border-white/[0.06] bg-white/[0.01] transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.03]"
    >
      {/* Corner accents - use transform scale instead of height/width to avoid layout thrashing */}
      <div className="absolute left-0 top-0 h-6 w-px origin-top scale-y-[0.67] bg-white/20 transition-transform duration-300 group-hover:scale-y-100 group-hover:bg-white/40" />
      <div className="absolute left-0 top-0 h-px w-6 origin-left scale-x-[0.67] bg-white/20 transition-transform duration-300 group-hover:scale-x-100 group-hover:bg-white/40" />
      <div className="absolute bottom-0 right-0 h-6 w-px origin-bottom scale-y-[0.67] bg-white/20 transition-transform duration-300 group-hover:scale-y-100 group-hover:bg-white/40" />
      <div className="absolute bottom-0 right-0 h-px w-6 origin-right scale-x-[0.67] bg-white/20 transition-transform duration-300 group-hover:scale-x-100 group-hover:bg-white/40" />

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Header row with project number and GitHub stats */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          {/* GitHub Stats */}
          {project.github && (
            <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground/50">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {project.github.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-3 w-3" />
                {project.github.forks_count}
              </span>
            </div>
          )}
        </div>

        {/* Project title and status */}
        <div>
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium tracking-tight transition-colors hover:text-muted-foreground"
          >
            {project.name}
            <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
          </Link>
          <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground/60">
            <span>{dayjs(project.startedAt).format("YYYY")}</span>
            {project.isActive && (
              <>
                <span className="text-muted-foreground/30">•</span>
                <span className="border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-emerald-400">
                  Active
                </span>
              </>
            )}
          </p>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground/70">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag, tagIndex) => (
            <span
              key={`${project.id}-tag-${tagIndex}`}
              className="border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/40">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </MotionWrapper>
  );
}

interface ProjectsSectionProps {
  projects: ProjectWithLinkAndTagsWithGithubData[];
  showAll?: boolean;
}

export function ProjectsSection({
  projects,
  showAll = false,
}: ProjectsSectionProps) {
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <Section id="projects" className="relative overflow-hidden">
      {/* Background accent */}
      <div className="pointer-events-none absolute -right-48 top-0 hidden h-96 w-96 bg-gradient-to-bl from-white/[0.02] to-transparent blur-xl md:block md:blur-3xl" />
      
      <FadeIn>
        <div className="flex items-end justify-between">
          <SectionHeader
            label="Projects"
            title="Featured work"
            description="A selection of projects I've built and contributed to."
          />
          {!showAll && projects.length > 4 && (
            <Button
              asChild
              variant="ghost"
              className="mb-12 hidden border border-white/[0.08] bg-transparent transition-all hover:border-white/20 hover:bg-white/[0.02] md:inline-flex"
            >
              <Link href="/projects">
                <span className="text-xs font-medium uppercase tracking-wider">View all</span>
                <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </div>
      </FadeIn>

      <StaggerContainer
        className="grid gap-4 md:grid-cols-2"
        staggerDelay={0.1}
      >
        {displayedProjects.map((project, index) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} index={index} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {!showAll && projects.length > 4 && (
        <FadeIn delay={0.4} className="mt-8 text-center md:hidden">
          <Button asChild variant="outline" className="border-white/[0.08] bg-transparent hover:border-white/20 hover:bg-white/[0.02]">
            <Link href="/projects">
              <span className="text-xs font-medium uppercase tracking-wider">View all projects</span>
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </FadeIn>
      )}
    </Section>
  );
}
