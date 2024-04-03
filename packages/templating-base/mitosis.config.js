// eslint-disable-next-line @typescript-eslint/no-var-requires
const omitRefProps = require("./config/omit-ref-props");

/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: "src/**",
  dest: "dist",
  targets: ["vue", "react"],
  options: {
    react: {
      typescript: true,
      plugins: [omitRefProps],
    },
    vue: {
      typescript: true,
    },
  },
};
