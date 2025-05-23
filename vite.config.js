import { defineConfig } from "vite";
import htmlMinify from "vite-plugin-html-minify";

export default defineConfig({
  base: "./",
  plugins: [
    htmlMinify({
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      minifyJS: true,
      minifyCSS: true,
    }),
  ],
});
