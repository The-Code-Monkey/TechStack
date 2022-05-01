import { Config } from '@jest/types';

export type JestConfigOptions = Partial<Config.InitialOptions>;

export function createJestConfig(
  _: (relativePath: string) => void,
  rootDir: string
): JestConfigOptions {
  return {
    transform: {
      '^.+\\.tsx?$': 'ts-jest/legacy',
    },
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
      url: 'http://localhost',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
    testMatch: ['<rootDir>/**/*.(spec|test).{ts,tsx,js,jsx}'],
    rootDir,
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
    ],
  };
}
