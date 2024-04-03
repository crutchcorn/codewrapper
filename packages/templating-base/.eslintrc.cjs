// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const basePreset = require("@mitosis.template/config/eslint-preset.js");

module.exports = {
    root: true,
    ...basePreset,
    plugins: [...(basePreset.plugins || []), '@builder.io/mitosis'],
    extends: [
        ...(basePreset.extends || []),
        'plugin:@builder.io/mitosis/recommended',
    ],
    parserOptions: {
        project: path.resolve(__dirname, "./tsconfig.lint.json"),
        tsconfigRootDir: __dirname,
    },
}
