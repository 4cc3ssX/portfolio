import { getBlogBySlug, getBlogs } from "@/features/blogs/actions/blogs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogDetailHeader, BlogContent } from "@/features/blogs/components";

export const revalidate = 1800;

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: blog.cover
      ? {
          images: [blog.cover.uri],
        }
      : undefined,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero section with title */}
      <div className="relative border-b border-white/[0.06]">
        {/* Subtle gradient background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-2xl px-6 pb-10 pt-28 md:px-8">
          <BlogDetailHeader blog={blog} />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-6 py-10 md:px-8">
        <BlogContent content={blog.content} />
      </div>
    </main>
  );
}
