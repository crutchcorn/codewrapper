import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFileName = (prefix: string, format: string) => {
  switch (format) {
    case "es":
    case "esm":
    case "module":
      return `${prefix}.mjs`;
    case "cjs":
    case "commonjs":
    default:
      return `${prefix}.cjs`;
  }
};

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: resolve(__dirname, "./src"),
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MitosisTemplateVue",
      fileName: (format, _entryName) =>
        getFileName("mitosis-template-vue", format),
    },
    rollupOptions: {
      external: ["vue", "rxjs"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
