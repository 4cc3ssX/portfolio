"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { BlogWithAuthorAndCover } from "../types/blogs";

interface BlogDetailHeaderProps {
  blog: BlogWithAuthorAndCover;
}

export function BlogDetailHeader({ blog }: BlogDetailHeaderProps) {
  const formattedDate = new Date(
    blog.publishedAt || blog.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <header>
      {/* Meta info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground/50"
      >
        <time>{formattedDate}</time>
        <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/30" />
        <span>{blog.readingTime} min read</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        {blog.title}
      </motion.h1>

      {/* Description */}
      {blog.description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-4 text-sm leading-relaxed text-muted-foreground/70"
        >
          {blog.description}
        </motion.p>
      )}

      {/* Author */}
      {blog.author && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-6 flex items-center gap-3"
        >
          {blog.author.avatar?.uri && (
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/[0.08]">
              <Image
                src={blog.author.avatar.uri}
                alt={blog.author.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground/90">
              {blog.author.name}
            </span>
            {blog.author.title && (
              <span className="text-xs text-muted-foreground/50">
                {blog.author.title}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}
