import { MDXContent } from "@/components/shared/mdx-content";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <article
      id="blog-content"
      className="prose prose-neutral dark:prose-invert prose-sm max-w-none
        prose-headings:font-medium prose-headings:tracking-tight
        prose-h2:mt-8 prose-h2:text-lg prose-h2:border-t prose-h2:border-white/[0.06] prose-h2:pt-6
        prose-h3:mt-6 prose-h3:text-base
        prose-p:text-muted-foreground/80 prose-p:leading-relaxed prose-p:text-sm
        prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-a:decoration-muted-foreground/30 hover:prose-a:decoration-foreground/50
        prose-strong:text-foreground prose-strong:font-medium
        prose-code:text-foreground prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
        prose-pre:border prose-pre:border-white/[0.06] prose-pre:bg-white/[0.02] prose-pre:text-[13px]
        prose-blockquote:border-l-white/20 prose-blockquote:text-muted-foreground/70 prose-blockquote:not-italic prose-blockquote:text-sm
        prose-li:text-muted-foreground/80 prose-li:text-sm
        prose-img:rounded prose-img:border prose-img:border-white/[0.06]"
    >
      <MDXContent source={content} />
    </article>
  );
}
