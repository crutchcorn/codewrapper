import { defineConfig, mergeConfig } from 'vite'
import { tanstackViteConfig } from '@tanstack/vite-config'
import vue from '@vitejs/plugin-vue'

const config = defineConfig({
  plugins: [vue()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
})

export default mergeConfig(
  config,
  tanstackViteConfig({
    entry: './src/index.ts',
    srcDir: './src',
  }),
)