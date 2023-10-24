/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5c55c9",
        destructive: "#dd3359",
      },
      transitionProperty: {
        width: "width",
        border: "border,border-radius,box-shadow,background-color",
      },
    },
  },
  plugins: [],
};
