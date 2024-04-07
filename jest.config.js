/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    "react-responsive-carousel",
    "node_modules/(?!(react-responsive-carousel)/)"
  ],
};