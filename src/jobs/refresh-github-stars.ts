import type { TaskConfig } from "payload";
import { getRepositoryInfo } from "@/shared/github/actions";

/**
 * Denormalises star/fork counts onto `projects` once an hour.
 *
 * This replaces an N+1 that ran one uncached, unguarded Octokit request per
 * project on every ISR regeneration — a single rate-limited repo took the
 * whole /projects page down with it.
 */
export const refreshGithubStarsTask: TaskConfig<"refreshGithubStars"> = {
  slug: "refreshGithubStars",
  schedule: [{ cron: "0 * * * *", queue: "nightly" }],
  outputSchema: [
    { name: "updated", type: "number" },
    { name: "failed", type: "number" },
  ],
  handler: async ({ req }) => {
    const { docs } = await req.payload.find({
      collection: "projects",
      where: { githubRepo: { exists: true } },
      limit: 200,
      depth: 0,
      overrideAccess: true,
    });

    let updated = 0;
    let failed = 0;

    for (const project of docs) {
      const [owner, repo] = String(project.githubRepo ?? "").split("/");
      if (!owner || !repo) continue;

      try {
        const info = await getRepositoryInfo(owner, repo);
        if (!info) {
          failed += 1;
          continue;
        }
        await req.payload.update({
          collection: "projects",
          id: project.id,
          data: {
            githubStars: info.stargazers_count,
            githubForks: info.forks_count,
          },
          overrideAccess: true,
          context: { disableRevalidate: true },
        });
        updated += 1;
      } catch (error) {
        // One bad repo must never fail the whole sweep.
        req.payload.logger.error({ err: error, repo: project.githubRepo }, "star sync failed");
        failed += 1;
      }
    }

    return { output: { updated, failed } };
  },
};
