export const configs = {
  url:
    process.env.NODE_ENV === "production"
      ? `https://ryam.me`
      : `http://localhost:3000`,
};
