import { MDXContent } from "@/components/shared/mdx-content";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <MDXContent source={content} />
    </div>
  );
}
