import Link from "next/link";
import type { SeriesLinkView } from "@/types/content";

interface SeriesNavProps {
  seriesName: string;
  posts: SeriesLinkView[];
  currentSlug: string;
}

/**
 * Series navigation, generated from the `series` relationship.
 *
 * This replaces the hand-maintained "Catch the Full … Series" link list that
 * used to be pasted at the bottom of every post body — adding a part meant
 * editing every sibling.
 *
 * Server component: the links are in the initial HTML for crawlers.
 */
export function SeriesNav({ seriesName, posts, currentSlug }: SeriesNavProps) {
  return (
    <nav aria-label={`${seriesName} series`} className="mt-12 border-t border-white/[0.06] pt-6">
      <h2 className="text-xs uppercase tracking-widest text-muted-foreground/60">
        {seriesName}
      </h2>
      <ol className="mt-4 space-y-2">
        {posts.map((post) => {
          const isCurrent = post.slug === currentSlug;
          return (
            <li key={post.id} className="flex gap-3 text-sm">
              <span className="tabular-nums text-muted-foreground/40">
                {String(post.partNumber ?? 0).padStart(2, "0")}
              </span>
              {isCurrent ? (
                <span aria-current="page" className="text-foreground">
                  {post.title}
                </span>
              ) : (
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-muted-foreground/80 underline underline-offset-4 decoration-muted-foreground/30 transition-colors hover:text-foreground"
                >
                  {post.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
