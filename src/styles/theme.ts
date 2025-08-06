// theme.ts
import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: "#E8F0F7" },
          100: { value: "#C5D9ED" },
          200: { value: "#A0C2E3" },
          300: { value: "#7BAAD9" },
          400: { value: "#5692CF" },
          500: { value: "#347BC5" },
          600: { value: "#2C63A0" },
          700: { value: "#234B7B" },
          800: { value: "#1A3456" },
          900: { value: "#111D30" },
        },
        secondary: {
          50: { value: "#EBF5FB" },
          100: { value: "#CDE4F5" },
          200: { value: "#ACD3EF" },
          300: { value: "#8BC2E9" },
          400: { value: "#6AAFE3" },
          500: { value: "#4A9CDD" },
          600: { value: "#3A7CB0" },
          700: { value: "#2B5C83" },
          800: { value: "#1B3D56" },
          900: { value: "#0C1E2A" },
        },
        background: { value: "#F0F2F5" },
        surface: { value: "#FFFFFF" },
      },
    },
  },
});

export const systemTheme = createSystem(defaultConfig, config);
