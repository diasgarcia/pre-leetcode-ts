import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["src/util/**/*.ts"],
      reporter: ["text", "html"],
      reportsDirectory: "coverage",
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    include: ["test/**/*.test.ts"],
  },
});
