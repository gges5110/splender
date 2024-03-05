import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import { join, parse, resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    rollupOptions: {
      input: entryPoints("index.html", "404.html"),
    },
  },
  plugins: [svgrPlugin(), react()],
  base: "/splender/",
  appType: "spa",
  resolve: {
    alias: {
      src: "/src",
    },
  },
});

function entryPoints(...paths: any[]) {
  const entries = paths.map(parse).map((entry) => {
    const { dir, base, name, ext } = entry;
    const key = join(dir, name);
    const path = resolve(__dirname, dir, base);
    return [key, path];
  });

  const config = Object.fromEntries(entries);
  return config;
}
