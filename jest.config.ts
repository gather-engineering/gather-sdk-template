module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/mediators/serviceWorker/worker\\?worker&inline$': '<rootDir>/src/tests/mocks/worker.ts',
    '^@/(.*)\\.(png|svg)$': '<rootDir>/src/tests/mocks/image.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    dexie: require.resolve('dexie'),
  },
  setupFilesAfterEnv: ['<rootDir>/jestSetup.ts', 'jest-expect-message'],
  modulePathIgnorePatterns: ['<rootDir>/src/.*/__mocks__'],
};
