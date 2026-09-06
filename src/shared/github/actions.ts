import { getOctokit } from "./octokit";

export interface RepositoryStats {
  stargazers_count: number;
  forks_count: number;
}

/**
 * Returns null rather than throwing when the token is missing or GitHub is
 * unhappy (404, 403, rate limit) — one bad repo must never take down a render
 * or a sweep of every project.
 */
export const getRepositoryInfo = async (
  owner: string,
  repo: string
): Promise<RepositoryStats | null> => {
  const octokit = getOctokit();
  if (!octokit) return null;

  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}", { owner, repo });
    return {
      stargazers_count: response.data.stargazers_count,
      forks_count: response.data.forks_count,
    };
  } catch (error) {
    console.error(`[github] failed to fetch ${owner}/${repo}`, error);
    return null;
  }
};
