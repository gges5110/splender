import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: "src/setupTests.ts",
    environment: "jsdom",
    include: ["src/components/**/*.test.tsx"],
    exclude: ["src/engine/"],
    coverage: {
      reporter: ["text", "cobertura"],
      include: ["src/components/**/*.tsx"],
      provider: "v8",
      all: true,
    },
  },
});
