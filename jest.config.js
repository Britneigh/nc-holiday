// jest.config.js
module.exports = {
  preset: 'jest-expo',  // great choice for Expo projects
  transformIgnorePatterns: [
    // Ignore everything in node_modules EXCEPT these packages (those with modern syntax):
    "node_modules/(?!(expo|expo-modules-core|react-native|@react-native|@unimodules)/)"
  ],
  testEnvironment: 'node', // recommended for backend or Jest environment
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // ensure Babel transpiles your TS and JS files
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'], // if using testing-library for React Native
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // standard extensions for React Native/TS projects
};
