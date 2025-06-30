import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inject from "@rollup/plugin-inject";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "./src/main.jsx",
      name: "ChatbotWidget",
      fileName: "chatbot-widget",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
      plugins: [
        inject({
          process: 'process',
        }),
      ],
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});
