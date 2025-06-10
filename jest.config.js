module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: ["/node_modules/(?!firebase|@firebase)/"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/jest.setup.js"], // add this line
};
