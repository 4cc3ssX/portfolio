import { BlogCard } from "./blog-card";
import { BlogWithAuthorAndCover } from "../../types/blogs";

interface BlogListProps {
  blogs: BlogWithAuthorAndCover[];
}

export function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="flex flex-col gap-6 sm:gap-4 overflow-y-auto pb-4 snap-y snap-mandatory scrollbar-hide">
      {blogs.map((blog, index) => (
        <BlogCard key={blog.slug} blog={blog} latest={index === 0} />
      ))}
    </div>
  );
}
