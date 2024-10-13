import "server-only";

import { octokit } from "./octokit";

export const getRepositoryInfo = async (owner: string, repo: string) => {
  const response = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
  });

  return response.data;
};
