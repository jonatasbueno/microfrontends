import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'providers',
      filename: 'remoteEntry.js',
      exposes: {
        './Providers': './src/providers/Providers.tsx',
      },
      shared: ['react', 'react-dom', 'redux', 'react-redux', '@reduxjs/toolkit', '@tanstack/react-query', 'styled-components', 'react-hook-form'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
