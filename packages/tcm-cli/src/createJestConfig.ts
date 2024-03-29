export function createJestConfig(
  _: (relativePath: string) => void,
  rootDir: string
) {
  return {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
      url: 'http://localhost',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.mts'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
    moduleFileExtensions: [
      'ts',
      'tsx',
      'js',
      'jsx',
      'json',
      'node',
      'mts',
      'mjs',
    ],
    collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx,mts}'],
    testMatch: ['<rootDir>/**/*.(spec|test).{ts,tsx,js,jsx,mts}'],
    rootDir,
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
    ],
  };
}
