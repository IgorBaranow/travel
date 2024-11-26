import path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@config": path.resolve(__dirname, "./src/app/config"),
      "@store": path.resolve(__dirname, "./src/app/store"),
      "@services": path.resolve(__dirname, "./src/app/services"),
    },
  },
  plugins: [react()],
});
