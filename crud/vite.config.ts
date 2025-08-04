import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'crud',
      filename: 'remoteEntry.js',
      exposes: {
        './CrudApp': './src/App.tsx',
      },
      shared: ['react', 'react-dom', 'react-redux', 'react-hook-form', 'styled-components'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
