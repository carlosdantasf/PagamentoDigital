import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
