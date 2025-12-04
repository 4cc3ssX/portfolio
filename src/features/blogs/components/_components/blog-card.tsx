import Link from "next/link";
import Image from "next/image";
import { BlogWithAuthorAndCover } from "../../types/blogs";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MDXContent } from "@/components/shared/mdx-content";

interface BlogCardProps {
  blog: BlogWithAuthorAndCover;
  latest?: boolean;
}

interface BlogLinkProps {
  href: string;
  title: string;
}

interface BlogHoverCardProps {
  blog: BlogWithAuthorAndCover;
}

interface BlogAuthorProps {
  author: BlogWithAuthorAndCover["author"];
}

function BlogDate({ date }: { date: Date }) {
  return (
    <p className="text-muted-foreground">
      {new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })}
    </p>
  );
}

function BlogLink({ href, title }: BlogLinkProps) {
  return (
    <Link
      href={href}
      className="w-fit font-medium text-foreground group-hover:text-foreground/80 transition-colors"
    >
      {title}
    </Link>
  );
}

function BlogAuthor({ author }: BlogAuthorProps) {
  if (!author) return null;

  return (
    <div className="flex items-center gap-2 pt-2">
      <Avatar className="w-6 h-6">
        <AvatarImage src={author.avatar?.uri} alt={author.name} asChild>
          <Image
            src={author.avatar?.uri || ""}
            alt={author.name}
            width={24}
            height={24}
            className="aspect-square h-full w-full rounded-full object-cover"
          />
        </AvatarImage>
        <AvatarFallback className="text-xs">
          {author.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <p className="text-xs text-muted-foreground">{author.name}</p>
    </div>
  );
}

function BlogHoverCard({ blog }: BlogHoverCardProps) {
  return (
    <HoverCardContent className="w-70">
      <div className="flex flex-col gap-4">
        {blog.cover && (
          <div className="relative w-full h-30 rounded-md overflow-hidden">
            <Image
              src={blog.cover.uri}
              alt={blog.title}
              fill
              sizes="280px"
              priority
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="space-y-2">
          <h4 className="text-md font-semibold">{blog.title}</h4>
          <div className="text-muted-foreground line-clamp-3 *:text-sm *:leading-snug *:my-0">
            <MDXContent source={blog.description} />
          </div>
          <BlogAuthor author={blog.author} />
        </div>
      </div>
    </HoverCardContent>
  );
}

export function BlogCard({ blog, latest }: BlogCardProps) {
  return (
    <div className="group flex-1 snap-start">
      <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
        {blog.publishedAt && <BlogDate date={blog.publishedAt} />}
        <div className="hidden sm:block w-4 h-0.5 bg-border mt-[0.5lh]" />
        <div className="flex-1 flex flex-col sm:flex-row items-start flex-wrap gap-1 lg:gap-2">
          <HoverCard openDelay={500}>
            <HoverCardTrigger asChild>
              <BlogLink href={`/blog/${blog.slug}`} title={blog.title} />
            </HoverCardTrigger>
            <BlogHoverCard blog={blog} />
          </HoverCard>
          {latest && <Badge variant="outline">Latest 🔥</Badge>}
        </div>
      </div>
    </div>
  );
}
