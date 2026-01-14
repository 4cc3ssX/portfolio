"use client";

import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/animated-text";
import { Icon, IconName } from "@/components/svgs";
import { cn } from "@/lib/utils";
import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { LinkType } from "@/features/users/schemas/links";
import { MotionWrapper } from "@/features/shared";

interface ContactSectionProps {
  user: UserWithLinksAndAvatar;
}

export function ContactSection({ user }: ContactSectionProps) {
  const socials = user.links.filter((link) => link.type === LinkType.SOCIAL);

  return (
    <Section id="contact" className="relative overflow-hidden">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 bg-gradient-to-r from-white/20 to-transparent" />
      <div className="pointer-events-none absolute right-1/2 top-0 h-px w-1/2 bg-gradient-to-l from-white/20 to-transparent" />

      {/* Gradient orb  */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white/[0.02] to-transparent blur-xl md:block md:blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <FadeIn>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
            Get in Touch
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="mt-6 text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
              Let&apos;s work together
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground/70">
            Have a project in mind or just want to chat? I&apos;m always open to
            discussing new opportunities and ideas.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-foreground px-8 py-6 text-background transition-all hover:bg-foreground/90"
            >
              <a
                href={`mailto:${user.email}?subject=${encodeURIComponent(
                  "Collaboration Opportunity"
                )}`}
              >
                <Mail className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Send Email
                </span>
                <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-16">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/40">
              Find me on
            </p>
            <div className="flex justify-center gap-2">
              {socials.map((link) => {
                const shouldUseStrokeColor = ["x"].includes(
                  link.name.toLowerCase()
                );

                return (
                  <MotionWrapper
                    key={link.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Link
                      href={link.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={link.name}
                      className="group relative flex h-12 w-12 items-center justify-center border border-white/[0.08] bg-white/[0.02] transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                    >
                      {/* Corner accents - use transform scale for better performance */}
                      <div className="absolute left-0 top-0 h-3 w-px origin-top scale-y-[0.67] bg-white/20 transition-transform duration-300 group-hover:scale-y-100 group-hover:bg-white/40" />
                      <div className="absolute left-0 top-0 h-px w-3 origin-left scale-x-[0.67] bg-white/20 transition-transform duration-300 group-hover:scale-x-100 group-hover:bg-white/40" />

                      <Icon
                        name={link.name.toLowerCase() as IconName}
                        className={cn(
                          "size-5 transition-all duration-300 group-hover:scale-110",
                          shouldUseStrokeColor
                            ? "stroke-foreground/60 group-hover:stroke-foreground"
                            : "fill-foreground/60 group-hover:fill-foreground"
                        )}
                      />
                      <span className="sr-only">{link.name}</span>
                    </Link>
                  </MotionWrapper>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom corner accents - hidden on mobile */}
      <div className="pointer-events-none absolute bottom-6 left-6 hidden h-20 w-px bg-gradient-to-t from-white/10 to-transparent md:block" />
      <div className="pointer-events-none absolute bottom-6 right-6 hidden h-20 w-px bg-gradient-to-t from-white/10 to-transparent md:block" />
    </Section>
  );
}
