import { getBlogBySlug, getBlogs } from "@/features/blogs/actions/blogs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogDetailHeader, BlogContent, BlogToc } from "@/features/blogs/components";

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
    <main className="font-sans min-h-screen pt-30 pb-14">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            <article className="max-w-4xl">
              <BlogDetailHeader blog={blog} />
              <BlogContent content={blog.content} />
            </article>
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <h2 className="text-sm font-semibold mb-4">On this page</h2>
                <BlogToc content={blog.content} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
