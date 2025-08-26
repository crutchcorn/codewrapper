import codewrapperPreset from "@codewrapper/config/eslint-preset.js";

export default [
  ...codewrapperPreset,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]
