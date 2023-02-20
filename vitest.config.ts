import path from 'path'
import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react'

export default defineConfig({
  // @ts-ignore
  plugins: [react()],
  test: {
    environment: 'jsdom',
    passWithNoTests: true,
    exclude: ['**/node_modules/**', '**/dist/**'],
    threads: true,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.md'],
})
