const basePreset = require("@mitosis.template/config/eslint-preset.js");

module.exports = {
    ...basePreset,
    plugins: [...(basePreset.plugins || []), '@builder.io/mitosis'],
    extends: [
        ...(basePreset.extends || []),
        'plugin:@builder.io/mitosis/recommended',
    ],
}
