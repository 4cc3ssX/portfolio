"use client";

import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

/**
 * Re-renders the route when the admin saves, so Live Preview shows the real
 * page rather than a second, drifting renderer.
 *
 * Only mounted when draft mode is on — public pages ship none of this.
 */
export const RefreshRouteOnSave = () => {
  const router = useRouter();

  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL ?? ""}
    />
  );
};
