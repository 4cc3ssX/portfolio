import type { Access, FieldAccess } from "payload";

/** Anyone may read. Used for content with no draft concept. */
export const anyone: Access = () => true;

/** Any authenticated user may write. Single-author site: logged in == trusted. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user);

/** Same rule, but typed for slots that accept only a boolean (e.g. admin.access). */
export const isAuthenticated = ({ req: { user } }: { req: { user: unknown } }): boolean =>
  Boolean(user);

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
 * Delete access for the soft-delete collections.
 *
 * Payload's docs suggest gating permanent deletion on `data.deletedAt`, but
 * `deleteByID` calls access with only `{ id, req }` — `data` is always
 * undefined, so that check silently denies every non-admin delete, including
 * the soft delete it was meant to allow. Any authenticated user may delete;
 * the trash view is what makes it recoverable.
 */
export const canDelete: Access = ({ req: { user } }) => Boolean(user);

export const adminFieldAccess: FieldAccess = ({ req: { user } }) =>
  Boolean(user?.roles?.includes("admin"));
