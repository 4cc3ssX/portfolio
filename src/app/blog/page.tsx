import { getBlogs } from "@/features/blogs/actions/blogs";
import {
  BlogHeader,
  BlogList,
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
    <main className="font-sans min-h-screen pt-30 pb-14">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <BlogHeader />
          {blogs.length === 0 ? <EmptyBlogs /> : <BlogList blogs={blogs} />}
        </div>
      </div>
    </main>
  );
}
