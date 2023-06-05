import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [svgrPlugin(), react()],
  base: "/splender/",
  appType: "spa",
});
