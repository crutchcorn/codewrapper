// eslint-disable-next-line @typescript-eslint/no-var-requires
const removePreactPragma = require("./config/remove-preact-pragma");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const omitRefProps = require("./config/omit-ref-props");

/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: "src/**",
  dest: "dist",
  targets: ["vue3", "react"],
  options: {
    preact: {
      typescript: true,
      plugins: [removePreactPragma],
    },
    react: {
      typescript: true,
      plugins: [omitRefProps],
    },
    vue3: {
      typescript: true,
    },
    lit: {
      typescript: true,
    },
  },
};
