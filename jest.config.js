// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 15000,

  setupFiles: ['<rootDir>/jest.setup.js'],

  // Configuration to handle ES Modules
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },

  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|firebase|@firebase)',
  ],

  moduleNameMapper: {
    '^expo-constants$': '<rootDir>/firestoreService/__tests__/mocks/expo-constants.js',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  testMatch: ['**/__tests__/**/*.test.ts'],
  
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
};