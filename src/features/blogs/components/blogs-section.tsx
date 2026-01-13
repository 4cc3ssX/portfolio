"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, User } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import { BlogWithAuthorAndCover } from "@/features/blogs/types/blogs";
import { cn } from "@/lib/utils";

interface BlogsSectionProps {
  blogs: BlogWithAuthorAndCover[];
  showAll?: boolean;
}

function BlogCard({
  blog,
  featured = false,
  index,
}: {
  blog: BlogWithAuthorAndCover;
  featured?: boolean;
  index: number;
}) {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex h-full flex-col border border-white/[0.06] bg-white/[0.01] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03]",
        featured && "md:col-span-2"
      )}
    >
      {/* Corner accents */}
      <div className="absolute left-0 top-0 h-4 w-px bg-white/20 transition-all duration-300 group-hover:h-6 group-hover:bg-white/40" />
      <div className="absolute left-0 top-0 h-px w-4 bg-white/20 transition-all duration-300 group-hover:w-6 group-hover:bg-white/40" />
      <div className="absolute bottom-0 right-0 h-4 w-px bg-white/20 transition-all duration-300 group-hover:h-6 group-hover:bg-white/40" />
      <div className="absolute bottom-0 right-0 h-px w-4 bg-white/20 transition-all duration-300 group-hover:w-6 group-hover:bg-white/40" />

      {/* Article number */}
      <div className="absolute right-4 top-4 z-10 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/40">
        {String(index + 1).padStart(2, "0")}
      </div>

      <Link href={`/blog/${blog.slug}`} className="flex h-full flex-col">
        {/* Cover Image */}
        {blog.cover?.uri && (
          <div className="relative aspect-[2/1] overflow-hidden bg-white/[0.02]">
            <Image
              src={blog.cover.uri}
              alt={blog.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Title */}
          <h3
            className={cn(
              "line-clamp-2 font-medium tracking-tight transition-colors group-hover:text-muted-foreground",
              featured ? "text-xl md:text-2xl" : "text-lg"
            )}
          >
            {blog.title}
          </h3>

          {/* Description */}
          {blog.description && (
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground/70">
              {blog.description}
            </p>
          )}

          {/* Meta */}
          <div className="mt-auto pt-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
            {blog.author && (
              <>
                <span className="text-muted-foreground/30">•</span>
                <span className="flex items-center gap-1.5">
                  <User className="h-3 w-3" />
                  {blog.author.name}
                </span>
              </>
            )}
          </div>

          {/* Read more indicator */}
          <div className="mt-5 flex items-center gap-1 text-xs font-medium text-muted-foreground/60 transition-colors group-hover:text-foreground">
            <span className="uppercase tracking-wider">Read</span>
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function BlogsSection({ blogs, showAll = false }: BlogsSectionProps) {
  const displayedBlogs = showAll ? blogs : blogs.slice(0, 3);

  return (
    <Section id="blog" className="relative">
      {/* Background accent */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-white/[0.02] to-transparent blur-3xl" />
      
      <FadeIn>
        <div className="flex items-end justify-between">
          <SectionHeader
            label="Blog"
            title="Latest articles"
            description="Thoughts, tutorials, and insights on software development."
          />
          {!showAll && blogs.length > 3 && (
            <Link
              href="/blog"
              className="mb-12 hidden items-center gap-1 border border-white/[0.08] bg-transparent px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:border-white/20 hover:bg-white/[0.02] hover:text-foreground md:inline-flex"
            >
              View all
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </FadeIn>

      <StaggerContainer
        className="grid gap-4 md:grid-cols-2"
        staggerDelay={0.1}
      >
        {displayedBlogs.map((blog, index) => (
          <StaggerItem key={blog.slug}>
            <BlogCard blog={blog} featured={index === 0 && !showAll} index={index} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {!showAll && blogs.length > 3 && (
        <FadeIn delay={0.4} className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 border border-white/[0.08] bg-transparent px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:border-white/20 hover:bg-white/[0.02] hover:text-foreground"
          >
            View all posts
            <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </FadeIn>
      )}
    </Section>
  );
}
