import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    // `npm run test:coverage` (also run by CI). Only the pure logic and the
    // server are measured: the React views are covered by the end-to-end
    // tests, where a line-coverage number would say little. The thresholds sit
    // just below today's values, so a change that drops tests fails the build.
    coverage: {
      provider: "v8",
      include: [
        "src/quiz.ts",
        "src/remediation.ts",
        "src/storage.ts",
        "src/localizedData.ts",
        "src/progressBackup.ts",
        "src/questionObjectives.ts",
        "server/**/*.ts",
      ],
      reporter: ["text-summary", "text"],
      thresholds: { statements: 92, branches: 78, functions: 90, lines: 93 },
    },
  },
});
