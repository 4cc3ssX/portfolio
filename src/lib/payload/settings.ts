import "server-only";

import { cache } from "react";
import type { Navigation, SiteSetting } from "@/payload-types";
import { getPayloadClient } from "./client";

export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "site-settings", depth: 2 });
});

export const getNavigation = cache(async (): Promise<Navigation> => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "navigation", depth: 0 });
});
