import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: "src/setupTests.ts",
    environment: "jsdom",
    include: ["src/components/**/*.test.tsx"],
    exclude: ["src/engine/"],
    coverage: {
      reporter: ["text", "cobertura"],
      include: ["src/components/**/*.tsx"],
      all: true,
    },
  },
});
