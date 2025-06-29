import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/widget-loader.jsx",  // entrypoint for your widget custom element
      name: "ChatbotWidget",
      fileName: "widget-loader",
      formats: ["iife"],               // immediately-invoked function expression for browsers
    },
    rollupOptions: {
      // externalize dependencies if any, or bundle all
    },
    outDir: "dist",
  },
});
