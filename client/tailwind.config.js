/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fcb941",
        secondary: "#f5f6f9",
        black: "#333333",
        white: "#fff",
        "custom-blue": "##479BFE",
        "custom-green": "#A6C76C",
        "custom-red": "#F2837B",
        "primary--shade__1": "#ca9434",
        "primary--shade__2": "#976f27",

        // For text
        "secondary--shade__0": "#acacae",
        "secondary--shade__1": "#7b7b7d",
        "secondary--shade__2": "#494a4b",
        "secondary--shade__3": "#313132",

        "secondary--tint__1": "#f7f8fa",
      },
      screens: {
        xxxs: "375px",
        xxs: "435px",
        xs: "528px",
        upperMd: "900px",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
