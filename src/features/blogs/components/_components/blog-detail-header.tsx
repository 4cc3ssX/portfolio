import { BlogMenu } from "./blog-menu";
import { BlogAuthorInfo } from "./blog-author-info";
import type { BlogWithAuthorAndCover } from "../../types/blogs";

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
    <header className="mb-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <BlogAuthorInfo author={blog.author} />
          <span className="text-muted-foreground">
            {blog.readingTime}min read
          </span>
          <span className="size-0.5 bg-muted-foreground rounded-full" />
          <time className="text-muted-foreground">{formattedDate}</time>
        </div>
        <BlogMenu blog={blog} />
      </div>
    </header>
  );
}
