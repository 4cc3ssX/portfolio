import { MDXContent } from "@/components/shared/mdx-content";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div id="blog-content" className="prose prose-lg dark:prose-invert max-w-none scroll-smooth snap-y">
      <MDXContent source={content} />
    </div>
  );
}
