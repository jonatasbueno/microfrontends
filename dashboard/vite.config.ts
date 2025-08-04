import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./Dashboard": "./src/components/business/Dashboard.tsx",
      },
      remotes: {
        state: "http://localhost:3003/remoteEntry.js",
        routing: "http://localhost:3002/assets/remoteEntry.js",
        theme: "http://localhost:3004/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-redux", "styled-components"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
