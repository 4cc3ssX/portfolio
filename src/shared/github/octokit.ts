import { Octokit } from "@octokit/rest";

let client: Octokit | null | undefined;

/**
 * Lazily constructed so a missing GITHUB_TOKEN degrades to "no star counts"
 * instead of throwing at module load — which used to break `next build` in any
 * environment without the token, and blocks the Payload CLI from loading the
 * config at all.
 *
 * Returns null when unconfigured; callers must handle it.
 */
export const getOctokit = (): Octokit | null => {
  if (client !== undefined) return client;

  const token = process.env.GITHUB_TOKEN;
  client = token ? new Octokit({ auth: token }) : null;

  if (!client) {
    console.warn("[github] GITHUB_TOKEN is not set; repository stats are disabled");
  }

  return client;
};
