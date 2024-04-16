import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    dts({
      entryRoot: resolve(__dirname, "./lib"),
    }),
  ],
});
