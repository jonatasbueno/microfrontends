import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'design-system',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/ui/Button.tsx',
        './theme': './src/styles/theme.ts',
      },
      shared: ['react', 'react-dom', 'styled-components'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
