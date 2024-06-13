/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "white-color": "white",
        "background-color": "rgb(45, 196, 182)",
        "grey-color": "rgb(160, 160, 160)",
        "blue-color": "rgb(0, 123, 255)",
        "darkblue-color": "rgb(0, 86, 179)",
        "lightwhite-color": "rgb(249, 249, 249)",
        "lightgrey-color": "rgb(233, 236, 239)",
        "green-color": "rgb(40, 167, 69)",
        "yellow-color": "rgb(255, 193, 7)",
        "red-color": "rgb(220, 53, 69)",
        "etc-color": "rgb(23, 162, 184)",
        "darkred-color": "rgb(204, 0, 0)",
        "darkgrey-color": "rgb(108, 117, 125)",
        "black-color": "rgb(51, 51, 51)",
      },
    },
  },
  plugins: [],
};
