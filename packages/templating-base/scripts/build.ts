import { build, InlineConfig, LibraryFormats, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import _dts from "vite-plugin-dts";
import { resolve } from "path";

const commonFormats = ["es", "cjs"] as LibraryFormats[];

const baseOutDir = "./dist";

const dts = _dts as unknown as (
  ...props: Parameters<typeof _dts>
) => PluginOption;

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

const libraries: Array<InlineConfig> = [
  {
    plugins: [
      react({
        jsxImportSource: "react",
      }),
      dts({
        tsConfigFilePath: resolve(__dirname, "../tsconfig.react.json"),
        entryRoot: resolve(__dirname, "../dist/react/src"),
      }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, "../dist/react/src/index.ts"),
        name: "MitosisTemplateTemplateBase",
        fileName: (format, _entryName) => getFileName("react", format),
        formats: commonFormats,
      },
      outDir: resolve(__dirname, "..", baseOutDir, "react"),
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
  },
  {
    plugins: [
      vue(),
      dts({
        tsConfigFilePath: resolve(__dirname, "../tsconfig.compiled.json"),
        entryRoot: resolve(__dirname, "../dist/vue/src"),
      }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, "../dist/vue/src/index.ts"),
        name: "MitosisTemplateTemplateBase",
        fileName: (format, _entryName) => getFileName("vue", format),
        formats: commonFormats,
      },
      outDir: resolve(__dirname, "..", baseOutDir, "vue"),
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
        },
      },
    },
  },
];

Promise.all(
  libraries.map(async (lib) => {
    return await build(lib);
  }),
).then(() => {
  console.log("Compiling to bundled code finished!");
});
