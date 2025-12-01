import { BlogCard } from "./blog-card";
import { BlogWithAuthorAndCover } from "../../types/blogs";

interface BlogGridProps {
  blogs: BlogWithAuthorAndCover[];
}

export function BlogGrid({ blogs }: BlogGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.slug} blog={blog} />
      ))}
    </div>
  );
}
