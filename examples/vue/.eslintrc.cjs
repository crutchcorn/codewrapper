// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  root: true,
  ...require("@codewrapper/config/eslint-preset.js"),
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: path.resolve(__dirname, "./tsconfig.lint.json"),
      tsconfigRootDir: __dirname,
    },
  },
};
