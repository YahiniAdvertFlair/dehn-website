/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "rgb(var(--background) / <alpha-value>)",
          foreground: "rgb(var(--foreground) / <alpha-value>)",
          "dehn-red": "rgb(var(--dehn-red) / <alpha-value>)",
          "dehn-realwhite": "rgb(var(--dehn-realwhite) / <alpha-value>)",
          "dehn-offwhite": "rgb(var(--dehn-offwhite) / <alpha-value>)",
          "dehn-textgrey": "rgb(var(--dehn-textgrey) / <alpha-value>)",
          "dehn-eerieblack": "rgb(var(--dehn-eerieblack) / <alpha-value>)",
          "dehn-gainsboro": "rgb(var(--dehn-gainsboro) / <alpha-value>)",
          "dehn-eagle": "rgb(var(--dehn-eagle) / <alpha-value>)",
          "dehn-anthrazit": "rgb(var(--dehn-anthrazit) / <alpha-value>)",
          "dehn-selectyellow": "rgb(var(--dehn-selectyellow) / <alpha-value>)",
          "dehn-heatwave": "rgb(var(--dehn-heatwave) / <alpha-value>)",
          "dehn-successgreen": "rgb(var(--dehn-successgreen) / <alpha-value>)",
          "dehn-dangerred": "rgb(var(--dehn-dangerred) / <alpha-value>)",
          "dehn-infoblue": "rgb(var(--dehn-infoblue) / <alpha-value>)",
        },
      },
    },
    plugins: [],
  };
  