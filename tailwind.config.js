module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/assets/stylesheets/**/*.css",
    "./app/javascript/**/*.js",
    "./app/javascript/**/*.ts",
    "./app/javascript/**/*.tsx",
    "./app/javascript/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#37a9af",
        canvas: "#f4f4f0",
        pink: "rgb(255 144 232)",
      },
    },
  },
};
