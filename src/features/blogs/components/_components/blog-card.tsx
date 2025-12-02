import Link from "next/link";
import Image from "next/image";
import { BlogWithAuthorAndCover } from "../../types/blogs";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
        day: "numeric",
      })}
    </p>
  );
}

function BlogLink({ href, title }: BlogLinkProps) {
  return (
    <Link
      href={href}
      className="text-foreground group-hover:text-foreground/80 transition-colors"
    >
      {title}
    </Link>
  );
}

function BlogAuthor({ author }: BlogAuthorProps) {
  if (!author) return null;

  return (
    <div className="flex items-center gap-2 pt-2">
      {author.avatar && (
        <div className="relative w-6 h-6 rounded-full overflow-hidden">
          <Image
            src={author.avatar.uri}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
      )}
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
              className="object-cover"
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
    <div className="group flex-1 snap-start max-w-3xl">
      <div className="flex flex-row items-center gap-4">
        {blog.publishedAt && <BlogDate date={blog.publishedAt} />}
        <div className="flex-1 flex flex-row items-center gap-2.5">
          <HoverCard openDelay={300}>
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
