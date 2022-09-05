const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  rootDir: './tests-visual-regression',
  bail: 0,
  testTimeout: 30000,
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    ...tsjPreset.transform,
  },
  preset: 'jest-puppeteer',
};
