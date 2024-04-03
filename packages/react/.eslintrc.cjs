// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  root: true,
  ...require("@mitosis.template/config/eslint-preset.js"),
  parserOptions: {
    project: path.resolve(__dirname, "./tsconfig.lint.json"),
    tsconfigRootDir: __dirname,
  },
};
