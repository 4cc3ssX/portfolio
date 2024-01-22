export const handleNavigate = (
  path: string,
  callback?: (_path: string) => void
) => {
  window.location.href = path;
  if (callback) {
    callback(path);
  }
};

export const openURL = (url: string, external: boolean = false) => {
  if (external) {
    window.open(url, "_blank");
  } else {
    window.location.href = url;
  }
};
