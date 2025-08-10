// jest.config.js
module.exports = {
  // ...other config...
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"]
};
module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
// jest.config.js
