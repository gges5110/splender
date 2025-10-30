import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: "src/setupTests.ts",
    environment: "jsdom",
    include: ["src/**/*.test.tsx"],
    coverage: {
      reporter: ["text", "cobertura"],
      include: ["src/**/*.tsx"],
      provider: "v8",
      all: true,
    },
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
});
