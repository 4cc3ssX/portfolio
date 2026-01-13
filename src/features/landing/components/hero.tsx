"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserWithLinksAndAvatar } from "@/features/users/types/users";

interface HeroProps {
  user: UserWithLinksAndAvatar;
}

export function Hero({ user }: HeroProps) {
  const resumeLink = user.links.find((link) => link.name.match(/resume/i));

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden">
      {/* Background grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white/[0.03] to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 bg-gradient-to-tl from-white/[0.02] to-transparent blur-3xl" />

      {/* Top gradient line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-emerald-500" />
            </span>
            Available for work
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-foreground">
              Building software
            </span>
            <span className="block text-foreground/50">
              that scales
            </span>
          </h1>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <p className="text-base font-medium tracking-wide text-foreground/80 sm:text-lg">
            {user.nickname} <span className="text-foreground/30">·</span> Software Engineer
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground/60 sm:text-base">
            {user.message}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden bg-foreground px-8 py-6 text-background transition-all hover:bg-foreground/90"
          >
            <Link href="/projects">
              <span className="relative z-10 flex items-center gap-2 text-sm font-medium uppercase tracking-wider">
                View Work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Button>
          {resumeLink && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group border-white/[0.1] bg-transparent px-8 py-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.02]"
            >
              <Link href={resumeLink.uri} target="_blank" rel="noopener noreferrer">
                <span className="text-sm font-medium uppercase tracking-wider">
                  Resume
                </span>
              </Link>
            </Button>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex items-center justify-center gap-10 sm:gap-16"
        >
          {[
            { value: "5+", label: "Years" },
            { value: "15+", label: "Projects" },
            { value: "20+", label: "Open Source" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              >
                {stat.value}
              </motion.p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground/40">
            Scroll
          </span>
          <div className="h-6 w-px bg-gradient-to-b from-muted-foreground/40 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Corner accents */}
      <div className="pointer-events-none absolute left-6 top-24 h-20 w-px bg-gradient-to-b from-white/10 to-transparent" />
      <div className="pointer-events-none absolute right-6 top-24 h-20 w-px bg-gradient-to-b from-white/10 to-transparent" />
    </section>
  );
}
