import "server-only";

import configPromise from "@payload-config";
import { getPayload } from "payload";

/**
 * Shared Payload Local API handle. `getPayload` memoises internally, so this
 * is a cheap call — no pooling concerns like the old module-level pg.Pool.
 */
export const getPayloadClient = () => getPayload({ config: configPromise });
