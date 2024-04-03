import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    dts({
      entryRoot: resolve(__dirname, "./src"),
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MitosisTemplateCore",
      fileName: "mitosis-template-core",
    },
    rollupOptions: {
      external: ["@codemirror/state", "@codemirror/view"],
    },
  },
});
