import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getBlogBySlug, getBlogs, getSeriesSiblings, getSiteSettings } from "@/lib/content";
import { configs } from "@/shared/configs/site";
import { RefreshRouteOnSave } from "@/components/shared/refresh-route-on-save";
import { SeriesNav } from "@/features/blogs/components/series-nav";
import { TableOfContents } from "@/features/blogs/components/table-of-contents";
import { extractHeadings } from "@/utils/markdown";

const BlogDetailHeader = dynamic(() =>
  import("@/features/blogs/components/blog-detail-header").then(
    (mod) => mod.BlogDetailHeader
  )
);
const BlogContent = dynamic(() =>
  import("@/features/blogs/components/blog-content").then((mod) => mod.BlogContent)
);

export const revalidate = 1800;

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return { title: "Blog Not Found" };

  const url = `${configs.url}/blog/${blog.slug}`;
  const title = blog.title;
  const description = blog.description;
  const images = blog.cover ? [{ url: blog.cover.uri, alt: blog.cover.name }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images,
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      authors: blog.author?.name ? [blog.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.cover ? [blog.cover.uri] : undefined,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const [blog, settings, { isEnabled: isDraft }] = await Promise.all([
    getBlogBySlug(slug),
    getSiteSettings(),
    draftMode(),
  ]);

  if (!blog) notFound();

  const siblings = blog.series ? await getSeriesSiblings(blog.series.id) : [];
  const headings = extractHeadings(blog.content);

  // Structured data is rendered server-side so crawlers get it in the initial
  // HTML rather than after hydration.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: blog.cover ? [blog.cover.uri] : undefined,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: {
      "@type": "Person",
      name: blog.author?.name ?? settings.profile.name,
      url: configs.url,
    },
    publisher: {
      "@type": "Person",
      name: settings.profile.name,
      url: configs.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${configs.url}/blog/${blog.slug}` },
    wordCount: blog.content.split(/\s+/).length,
    timeRequired: `PT${blog.readingTime}M`,
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Only mounted in draft mode, so public HTML ships no preview client code. */}
      {isDraft && <RefreshRouteOnSave />}

      <div className="relative border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-2xl px-6 pb-10 pt-28 md:px-8">
          <BlogDetailHeader blog={blog} />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-10 md:px-8">
        <TableOfContents headings={headings} />
        <BlogContent content={blog.content} />
        {blog.series && siblings.length > 1 && (
          <SeriesNav
            seriesName={blog.series.name}
            posts={siblings}
            currentSlug={blog.slug}
          />
        )}
      </div>
    </main>
  );
}
