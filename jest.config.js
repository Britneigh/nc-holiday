module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: ["/node_modules/(?!firebase|@firebase)/"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  testEnvironment: "node", // <-- Use node instead of jsdom
  setupFiles: ["<rootDir>/jest.setup.js"],
};
