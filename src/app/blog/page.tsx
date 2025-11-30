import { getBlogs } from "@/features/blogs/actions/blogs";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { FileText } from "lucide-react";
import Image from "next/image";
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
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Blog</h1>

        {blogs.length === 0 ? (
          <Empty className="bg-muted/30">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileText />
              </EmptyMedia>
              <EmptyTitle>No Blog Posts Yet</EmptyTitle>
              <EmptyDescription>
                There are no published blog posts at the moment. Check back soon
                for new articles and insights!
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <BlurFade key={blog.id} delay={0.1 + index * 0.05}>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="group block h-full"
                >
                  <article className="h-full flex flex-col rounded-lg border border-border overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
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
              </BlurFade>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
