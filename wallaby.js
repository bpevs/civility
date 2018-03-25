module.exports = function () {
  return {
    env: {
      type: "node",
      runner: "node"
    },
    files: [
      "tsconfig.json",
      "jestsetup.js",
      "source/**/*.ts",
      "source/**/*.tsx",
      "!source/**/*.test.ts",
      "!source/**/*.test.tsx"
    ],
    testFramework: "jest",
    tests: [
      "source/**/*.test.js",
      "source/**/*.test.jsx"
    ],
  };
};
