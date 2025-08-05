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
      remotes: {
        state: 'http://localhost:3003/assets/remoteEntry.js',
        theme: 'http://localhost:3004/assets/remoteEntry.js',
        routing: 'http://localhost:3002/assets/remoteEntry.js',
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
