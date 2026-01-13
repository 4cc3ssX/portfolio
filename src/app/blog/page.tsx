import dynamic from "next/dynamic";
import { getBlogs } from "@/features/blogs/actions/blogs";
import { getMe } from "@/features/users/actions/users";
import { Footer } from "@/components/layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/animated-text";
import type { Metadata } from "next";

const BlogsSection = dynamic(() =>
  import("@/features/blogs/components/blogs-section").then(
    (mod) => mod.BlogsSection
  )
);

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read my latest thoughts, tutorials, and insights on software development.",
};

export default async function BlogsPage() {
  const [blogs, me] = await Promise.all([getBlogs(), getMe()]);

  return (
    <main className="relative min-h-screen pt-20">
      {blogs.length === 0 ? (
        <Section>
          <FadeIn>
            <SectionHeader
              label="Blog"
              title="Coming soon"
              description="I'm working on some great content. Check back soon!"
            />
          </FadeIn>
          <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-border">
            <p className="text-muted-foreground">No posts yet</p>
          </div>
        </Section>
      ) : (
        <BlogsSection blogs={blogs} showAll />
      )}
      <Footer user={me} />
    </main>
  );
}
