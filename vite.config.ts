import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { summerlynArtApiPlugin } from './server/art/devPlugin'

export default defineConfig({
  plugins: [react(), summerlynArtApiPlugin()],
  test: {
    environment: 'node',
    include: ['server/**/*.test.ts'],
  },
})
