import { Config } from '@jest/types';

export type JestConfigOptions = Partial<Config.InitialOptions>;

export function createJestConfig(
  _: (relativePath: string) => void,
  rootDir: string
): JestConfigOptions {
  return {
    transform: {
      '^.+\\.tsx?$': 'ts-jest/legacy',
      '^.+\\.mts?$': 'ts-jest/legacy',
    },
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
      url: 'http://localhost',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.mts'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'mts'],
    collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx,mts}'],
    testMatch: ['<rootDir>/**/*.(spec|test).{ts,tsx,js,jsx,mts}'],
    rootDir,
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
    ],
  };
}
