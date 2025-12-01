import { getBlogBySlug, getBlogs } from "@/features/blogs/actions/blogs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  BlogDetailHeader,
  BlogCoverImage,
  BlogContent,
} from "@/features/blogs/components";

export const revalidate = 60;

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
    <main className="font-sans min-h-screen pt-24 pb-14">
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto">
          <BlogDetailHeader blog={blog} />
          {blog.cover && <BlogCoverImage cover={blog.cover} title={blog.title} />}
          <BlogContent content={blog.content} />
        </article>
      </div>
    </main>
  );
}
