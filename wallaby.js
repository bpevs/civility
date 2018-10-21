module.exports = function () {
  return {
    env: {
      type: "node",
      runner: "node",
    },
    files: [
      "tsconfig.json",
      "jestsetup.js",
      "packages/**/*.ts",
      "packages/**/*.tsx",
      "!packages/**/*.test.ts",
      "!packages/**/*.test.tsx"
    ],
    testFramework: "jest",
    tests: [
      "packages/**/*.test.js",
      "packages/**/*.test.jsx",
    ],
  }
}
