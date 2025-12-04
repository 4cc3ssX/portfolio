export const handleNavigate = (path: string) => {
  window.location.href = path;
};

export const openURL = (url: string, external: boolean = false) => {
  if (external) {
    window.open(url, "_blank");
  } else {
    window.location.href = url;
  }
};

export const isUrl = (str?: string) => {
  if (!str) return false;
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};
