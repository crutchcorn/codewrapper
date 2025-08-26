import codewrapperPreset from "@codewrapper/config/eslint-preset.js";
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  ...codewrapperPreset,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
]
