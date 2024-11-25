import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/"],
  collectCoverageFrom: [
    "<rootDir>/**/*.ts",
    "!<rootDir>/**/*.spec.ts"
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  preset: '@shelf/jest-mongodb',
};

export default config;
