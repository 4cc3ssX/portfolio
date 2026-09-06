/**
 * Animated formats must bypass the Next image optimizer: sharp resizes by
 * reading the first frame only, which silently turns an animation into a still.
 */
const ANIMATED_EXTENSIONS = /\.(gif|webp|avif)(\?|#|$)/i;

export const isAnimatedSrc = (src?: string | null): boolean => {
  if (!src) return false;
  // giphy/tenor CDN URLs carry query strings and sometimes no extension at all.
  if (/(^|\.)(giphy|tenor)\.com\//i.test(src)) return true;
  return ANIMATED_EXTENSIONS.test(src);
};
