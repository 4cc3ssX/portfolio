import { getBlogBySlug, getBlogs } from "@/features/blogs/actions/blogs";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { BlogShareButton } from "@/features/blogs/components/_components/blog-share-button";

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
      <article className="container mx-auto px-4 max-w-4xl">
          {/* Blog Header */}
          <header className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold flex-1">
                {blog.title}
              </h1>
              <BlogShareButton slug={blog.slug} />
            </div>
            
            {/* Author Info */}
            {blog.author && (
              <div className="flex items-center gap-3 mb-4">
                {blog.author.avatar ? (
                  <Image
                    src={blog.author.avatar.uri}
                    alt={blog.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {blog.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{blog.author.name}</span>
                  <span className="text-xs text-muted-foreground">{blog.author.email}</span>
                </div>
              </div>
            )}
            
            <time className="text-sm text-muted-foreground">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </header>

          {/* Cover Image */}
          {blog.cover && (
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={blog.cover.uri}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXRemote source={blog.content} />
          </div>
        </article>
    </main>
  );
}
