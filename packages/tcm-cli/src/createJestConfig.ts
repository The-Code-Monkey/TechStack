import { Config } from '@jest/types';

export type JestConfigOptions = Partial<Config.InitialOptions>;

export function createJestConfig(
  _: (relativePath: string) => void,
  rootDir: string
): JestConfigOptions {
  const config: JestConfigOptions = {
    transform: {
      '.(ts|tsx)$': 'ts-jest/dist',
      '.(js|jsx)$': 'babel-jest', // jest's default
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
    testMatch: ['<rootDir>/**/*.(spec|test).{ts,tsx,js,jsx}'],
    testURL: 'http://localhost',
    rootDir,
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
    ],
  };

  return config;
}
