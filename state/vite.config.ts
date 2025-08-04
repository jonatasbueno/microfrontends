import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'state',
      filename: 'remoteEntry.js',
      exposes: {
        './store': './src/store/store.ts',
      },
      shared: ['react', 'react-dom', 'redux', 'react-redux', '@reduxjs/toolkit'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
