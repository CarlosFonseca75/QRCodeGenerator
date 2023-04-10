const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testPathIgnorePatterns: ["./.next/", "./node_modules/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
};

module.exports = createJestConfig(customJestConfig);
