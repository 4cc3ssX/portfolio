import type { MetadataRoute } from "next";
import { getBlogs, getNavigation } from "@/lib/content";
import { configs } from "@/shared/configs/site";

/**
 * Static entries come from the navigation global rather than a hardcoded list,
 * which is what previously advertised /skills — a route that does not exist and
 * returned 404 to every crawler that followed it.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, navigation] = await Promise.all([getBlogs(), getNavigation()]);

  const navUrls = (navigation.header ?? [])
    .filter((item) => item.includeInSitemap && item.href?.startsWith("/"))
    .map((item) => ({
      url: `${configs.url}${item.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: item.priority ?? 0.8,
    }));

  const blogUrls = blogs.map((blog) => ({
    url: `${configs.url}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: configs.url,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...navUrls,
    ...blogUrls,
  ];
}
