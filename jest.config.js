import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */

export default {
  preset: 'ts-jest', // important for TypeScript support
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  testMatch: ["**/__tests__/**/*.test.ts"], // tells Jest where to look for test files
  moduleFileExtensions: ["ts", "js", "json", "node"],
  collectCoverage: true, // optional: enables coverage
  coverageDirectory: "coverage", // optional: output directory
};
