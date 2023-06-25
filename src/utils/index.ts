export const handleNavigate = (
  path: string,
  callback?: (_path: string) => void
) => {
  window.location.href = path;
  if (callback) {
    callback(path);
  }
};
