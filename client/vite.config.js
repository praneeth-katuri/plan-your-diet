import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: "dist/report.html",
      open: false,
      template: "treemap",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  server: {
    port: 5174,
    proxy: {
      "/api": {
        target: "http://localhost:5050",
        changeOrigin: true,
      },
    },
    fs: {
      // 👇 to get shared folder in the root - vite workaround
      allow: [".."],
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        // 🔥 Manual chunk splitting for better caching and perf
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .replace("@", ""); // e.g., @hookform → hookform
          }
        },
      },
    },
  },
});
