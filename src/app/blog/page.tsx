import { getBlogs } from "@/features/blogs/actions/blogs";
import {
  BlogHeader,
  BlogGrid,
  EmptyBlogs,
} from "@/features/blogs/components";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Read my latest thoughts, tutorials, and insights on software development.",
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="font-sans min-h-screen pt-24 pb-14">
      <div className="container mx-auto px-4">
        <BlogHeader />
        {blogs.length === 0 ? <EmptyBlogs /> : <BlogGrid blogs={blogs} />}
      </div>
    </main>
  );
}
