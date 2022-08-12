import type { Template } from './template.js';

const basicTemplate: Template = {
  name: 'basic',
  dependencies: [
    'husky',
    'tcm-cli',
    'tslib',
    'typescript',
    'size-limit',
    '@size-limit/preset-small-lib',
    '@tsconfig/recommended',
  ],
  packageJson: {
    // name: safeName,
    version: '0.1.0',
    license: 'MIT',
    // author: author,
    main: 'dist/index.js',
    // module: `dist/${safeName}.esm.js`,
    typings: `dist/index.d.ts`,
    files: ['dist', 'src'],
    engines: {
      node: '>=12',
    },
    scripts: {
      start: 'tcm watch',
      build: 'dts build',
      test: 'tcm test',
      lint: 'tcm lint',
      prepare: 'dts build',
      size: 'size-limit',
      analyze: 'size-limit --why',
    },
    peerDependencies: {},
    prettier: {
      printWidth: 80,
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
    },
    jest: {
      testEnvironment: 'node',
    },
  },
};

export default basicTemplate;
