const { fontFamily, colors } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        background: "rgba(var(--background-color), 1)",
        color: "rgba(var(--foreground-color), 1)",

        primary: "rgba(var(--primary-color), 1)",
        primary50: "rgba(var(--primary-color), 0.05)",
        primary200: "rgba(var(--primary-color), 0.2)",

        secondary: "rgba(var(--secondary-color), 1)",

        hint: "rgba(var(--hint-color), 1)",
        bar: "rgba(var(--bar-color), 1)",
      },
      backgroundImage: {
        main: "url('/assets/svg/background-vector.svg')",
        header:
          "linear-gradient(180deg, rgba(60, 60, 60, 0.15) 0%, rgba(60, 60, 60, 0) 100%)",
      },
      fontFamily: {
        sans: ["var(--font-Poppins)", ...fontFamily.sans],
      },
      boxShadow: {
        primary: "0 0 10px rgba(var(--primary-color), 0.4)",
        secondary: "0 0 10px rgba(var(--secondary-color), 0.2)",
      },
      borderColor: {
        primary200: "rgba(var(--primary-color), 0.2)",
        primary400: "rgba(var(--primary-color), 0.4)",
      },
    },
  },
  plugins: [],
};
