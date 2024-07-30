module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules", "src"],
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|axios-mock-adapter)/)"
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Add this line
};
