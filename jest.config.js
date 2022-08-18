module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  collectCoverageFrom: ["<rootDir>/src/components/**/*.tsx"],
  testMatch: ["<rootDir>/src/components/**/*.test.tsx"],
  testPathIgnorePatterns: ["<rootDir>/src/engine/"],
  testEnvironment: "jest-environment-jsdom",
};
