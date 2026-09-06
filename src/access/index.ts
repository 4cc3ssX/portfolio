import type { Access, FieldAccess } from "payload";

/** Anyone may read. Used for content with no draft concept. */
export const anyone: Access = () => true;

/** Any authenticated user may write. Single-author site: logged in == trusted. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user);

/**
 * Public callers only ever see published documents; authenticated editors see
 * everything. Returning a `where` clause (rather than false) is what lets the
 * admin list view and the public API share one collection.
 */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: "published" } };
};

/**
 * Soft delete is allowed for any authenticated user; permanently destroying a
 * document (i.e. deleting one that is not already trashed) is admin-only.
 */
export const trashOrAdminDestroy: Access = ({ req: { user }, data }) => {
  if (!user) return false;
  if (user.roles?.includes("admin")) return true;
  return Boolean(data?.deletedAt);
};

export const adminFieldAccess: FieldAccess = ({ req: { user } }) =>
  Boolean(user?.roles?.includes("admin"));
