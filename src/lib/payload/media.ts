import type { Media } from "@/payload-types";

export type MediaLike = Media | string | null | undefined;

const isMedia = (value: MediaLike): value is Media =>
  Boolean(value) && typeof value === "object";

/**
 * Resolves the URL to render for a media document.
 *
 * Animated GIFs always resolve to the untouched original: sharp reads only the
 * first frame when generating derivatives, so any `sizes` entry for a GIF is a
 * static still. `legacyUri` covers documents the seed could not download.
 */
export const mediaUrl = (
  value: MediaLike,
  size?: "thumbnail" | "card" | "og"
): string | null => {
  if (!isMedia(value)) return null;
  if (value.legacyUri) return value.legacyUri;
  if (value.mimeType === "image/gif") return value.url ?? null;
  if (size && value.sizes?.[size]?.url) return value.sizes[size].url ?? null;
  return value.url ?? null;
};

/** GIFs must bypass the Next image optimizer or they render as a single frame. */
export const isAnimated = (value: MediaLike): boolean =>
  isMedia(value) && (value.mimeType === "image/gif" || Boolean(value.legacyUri?.endsWith(".gif")));

export const mediaAlt = (value: MediaLike, fallback = ""): string =>
  isMedia(value) ? (value.alt ?? fallback) : fallback;

export const mediaBlur = (value: MediaLike): string | undefined =>
  isMedia(value) && value.blurDataURL ? value.blurDataURL : undefined;

export const mediaDimensions = (value: MediaLike) =>
  isMedia(value) ? { width: value.width ?? undefined, height: value.height ?? undefined } : {};
