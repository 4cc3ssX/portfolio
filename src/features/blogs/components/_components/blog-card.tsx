import Link from "next/link";
import Image from "next/image";
import { BlogWithAuthorAndCover } from "../../types/blogs";

interface BlogCardProps {
  blog: BlogWithAuthorAndCover;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block h-full">
      <article className="h-full flex flex-col rounded-3xl border border-border overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
        {blog.cover && (
          <div className="relative w-full h-48 overflow-hidden bg-muted">
            <Image
              src={blog.cover.uri}
              alt={blog.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h2>
          <p className="text-muted-foreground line-clamp-3 mb-4">
            {blog.description}
          </p>
          <time className="text-sm text-muted-foreground">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </article>
    </Link>
  );
}
