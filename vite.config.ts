import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { summerlynArtApiPlugin } from './server/art/devPlugin'
import { summerlynBundleApiPlugin } from './server/bundle/devPlugin'

export default defineConfig({
  plugins: [react(), summerlynArtApiPlugin(), summerlynBundleApiPlugin()],
  test: {
    environment: 'node',
    include: ['server/**/*.test.ts', 'src/lib/**/*.test.ts'],
  },
})
