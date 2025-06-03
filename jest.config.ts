import type { Config } from 'jest';

const configuration: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '.',
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '@components': ['<rootDir>/src/components'],
    '@ui': ['<rootDir>/src/components/ui'],
    '@pages': ['<rootDir>/src/pages'],
    '@sharedTypes': ['<rootDir>/src/utils/types'],
    '@api': ['<rootDir>/src/utils/burger-api.ts'],
    '@stateSlices': ['<rootDir>/src/services/slices'],
    '@customHooks': ['<rootDir>/src/hooks'],
    '@storeEntry': ['<rootDir>/src/services/store.ts'],
    '@selectors': ['<rootDir>/src/services/selectors']
  }
};

export default configuration;