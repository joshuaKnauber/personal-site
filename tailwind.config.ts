import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          500: "#090909",
        },
      },
      fontFamily: {
        serif: ["var(--font-zodiak)"],
      },
    },
  },
  plugins: [],
};
export default config;
