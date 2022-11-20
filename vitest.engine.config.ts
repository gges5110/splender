import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: "src/setupTests.ts",
    environment: "jsdom",
    include: ["src/engine/**/*.test.tsx"],
    exclude: ["src/components/"],
    coverage: {
      reporter: ["text", "cobertura"],
      include: ["src/engine/**/*.tsx"],
      all: true,
    },
  },
});
