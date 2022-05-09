import path from 'path';

import fs from 'fs-extra';

import { PackageJson } from './types.js';

interface CreateEslintConfigArgs {
  pkg: PackageJson;
  rootDir: string;
  writeFile: boolean;
}

export async function createEslintConfig({
  rootDir,
  writeFile,
}: CreateEslintConfigArgs): Promise<object | void> {
  const config = {
    env: {
      browser: true,
      es6: true,
    },
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'prettier',
    ],
    plugins: ['@typescript-eslint', 'prettier', 'react'],
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      allowImportExportEverywhere: true,
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-use-before-define': ['warn'],
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-empty-function': 'warn',
      'import/no-unresolved': 2,
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          pathGroups: [
            {
              pattern: './*.scss',
              group: 'unknown',
              position: 'after',
            },
          ],
          'newlines-between': 'always',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
        },
      ],
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          trailingComma: 'es5',
          semi: true,
          jsxSingleQuote: true,
          singleQuote: true,
          useTabs: false,
          'react/no-typos': false,
          bracketSpacing: true,
          arrowParens: 'avoid',
          endOfLine: 'auto',
        },
      ],
    },
  };
  if (!writeFile) {
    return config;
  }

  const file = path.join(rootDir, '.eslintrc.js');
  // if the path is an abs path(e.g. "/Users/user/my-project/.eslintrc.js"),
  // need to convert a rel path to app root.
  config.extends = config.extends.map(it =>
    /^\//u.test(it) ? path.relative(rootDir, it) : it
  );
  try {
    await fs.writeFile(
      file,
      `module.exports = ${JSON.stringify(config, null, 2)}`,
      { flag: 'wx' }
    );
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'EEXIST') {
      console.error(
        'Error trying to save the Eslint configuration file:',
        `${file} already exists.`
      );
    } else {
      console.error(e);
    }

    return config;
  }
}
