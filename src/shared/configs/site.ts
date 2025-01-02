export const configs = {
  url:
    process.env.NODE_ENV === "production"
      ? `https://ryamjs.dev`
      : `http://localhost:3000`,
};
