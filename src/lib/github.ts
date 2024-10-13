export const GITHUB_URL_REGEX =
  /(https?:\/\/)?(www\.)?github\.com\/([\w-]+)\/([\w-]+)/;

export const checkGithubURL = (url: string) => {
  return GITHUB_URL_REGEX.test(url);
};

export const extractRepoAndOwner = (url: string) => {
  const match = url.match(GITHUB_URL_REGEX);

  if (!match) {
    return null;
  }

  const [, protocol, www, owner, repo] = match;

  return { owner, repo };
};
