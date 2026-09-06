import { configs } from "@/shared/configs/site";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${configs.url}/sitemap.xml`,
    host: configs.url,
  };
}
