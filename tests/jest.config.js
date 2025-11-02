export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleDirectories: ["node_modules", "../"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  collectCoverageFrom: ["backend/**/*.js", "!backend/server.js", "!backend/config/**"],
  testMatch: ["**/tests/**/*.test.js"],
};