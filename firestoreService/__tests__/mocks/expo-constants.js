// This is a fake version of the expo-constants module for our Jest tests.
// It provides a structure that mimics the real module so our firebaseConfig.ts doesn't crash.
const constants = {
  expoConfig: {
    extra: {
      // These values don't matter because our tests get the real values from process.env,
      // which is populated by jest.setup.js loading .env.test.
      // This is just here to prevent "cannot read property 'extra' of undefined" errors.
      FIREBASE_API_KEY: 'mock-api-key',
      FIREBASE_PROJECT_ID: 'mock-project-id',
    },
  },
};

// Use module.exports because this is a plain .js file being used by Jest's Node environment.
module.exports = constants;