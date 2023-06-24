export const handleNavigate = (
  path: string,
  callback?: (path: string) => void
) => {
  window.location.href = path;
  if (callback) {
    callback(path);
  }
};
