/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: {
          100: "#FFFFFF",
          200: "#FDFDFD ",
        },
        gray: {
          100: "#F4F4F4",
          200: "#DADADA",
          300: "#9C9C9C",
          400: "#595959",
        },
        black: {
          100: "#161616",
        },
        accent: {
          100: "#22A0BC",
        },
      },
      screens: {
        xs: "440px",
      },
    },
  },
  plugins: [],
};
