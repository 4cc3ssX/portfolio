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
