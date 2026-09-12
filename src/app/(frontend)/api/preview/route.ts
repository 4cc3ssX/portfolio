import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { getPayloadClient } from "@/lib/payload/client";

/**
 * Entry point for Payload Live Preview and the admin "Preview" button.
 *
 * Requires BOTH a matching shared secret and a valid Payload session, so a
 * leaked preview URL alone cannot expose unpublished drafts.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  const expected = process.env.PAYLOAD_PREVIEW_SECRET;
  if (!expected || secret !== expected) {
    return new Response("Invalid preview secret", { status: 401 });
  }
  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: request.headers });
  if (!user) {
    return new Response("Not authenticated", { status: 403 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(`/blog/${slug}`);
}
