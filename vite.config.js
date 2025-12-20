import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Enable minification
    minify: "esbuild",
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          "react-vendor": ["react", "react-dom"],
          "motion-vendor": ["framer-motion"],
          "form-vendor": ["react-hook-form"],
        },
      },
    },
    // Increase chunk size warning limit (optional)
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion", "react-hook-form"],
  },
});
