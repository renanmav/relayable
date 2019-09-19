/* eslint-disable */
const pack = require('./package')

module.exports = {
  displayName: pack.name,
  name: pack.name,
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testEnvironment: '<rootDir>/test/environment/mongodb.js',
  setupFilesAfterEnv: ['<rootDir>/test/setupAfterEnv.js'],
  transform: {
    '.(js|ts)': '@sucrase/jest-plugin',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'js'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'Relayable GraphQL Server Tests',
        outputDirectory: './test-results/jest',
        outputName: 'results.xml',
      },
    ],
  ],
}
