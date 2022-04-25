import path from 'path';

import { DEFAULT_EXTENSIONS as DEFAULT_BABEL_EXTENSIONS } from '@babel/core';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve, {
  DEFAULTS as RESOLVE_DEFAULTS,
} from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { RollupOptions } from 'rollup';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import ts from 'typescript';

import { babelPluginTcm } from './babelPluginTcm.js';
import { paths } from './constants.js';
import { isTypesRollupEnabled } from './rollupTypes.js';
import { typescriptCompilerOptions } from './tsconfig.js';
import { TcmOptions, PackageJson } from './types.js';
import { safeVariableName, external } from './utils.js';

export async function createRollupConfig(
  appPackageJson: PackageJson,
  opts: TcmOptions,
  outputNum: number
): Promise<RollupOptions> {
  const shouldMinify =
    opts.minify !== undefined ? opts.minify : opts.env === 'production';

  const outputSuffix = [opts.format, opts.env, shouldMinify ? 'min' : '', 'js']
    .filter(Boolean)
    .join('.');
  let entryFileNames = `[name].${outputSuffix}`;

  // if there's only one input, uses the package name instead of the filename
  const inputKeys = Object.keys(opts.input);
  if (inputKeys.length === 1) {
    entryFileNames = `${inputKeys[0]}.${outputSuffix}`;
  }

  const tsCompilerOptions = typescriptCompilerOptions(opts.tsconfig);
  const typesRollupEnabled =
    opts.rollupTypes && isTypesRollupEnabled(appPackageJson);
  const declarationDir =
    typescriptCompilerOptions(opts.tsconfig).declarationDir ||
    (typesRollupEnabled ? path.join('dist', 'types') : undefined);

  return {
    // Tell Rollup the entry point to the package
    input: opts.input,
    // Tell Rollup which packages to ignore
    external: (id: string) => {
      // bundle in polyfills as TCM can't (yet) ensure they're installed as deps
      if (id.startsWith('regenerator-runtime')) {
        return false;
      }

      return external(id);
    },
    // Rollup has treeshaking by default, but we can optimize it further...
    treeshake: {
      // We assume reading a property of an object never has side-effects.
      // This means tcm WILL remove getters and setters defined directly on objects.
      // Any getters or setters defined on classes will not be effected.
      //
      // @example
      //
      // const foo = {
      //  get bar() {
      //    console.log('effect');
      //    return 'bar';
      //  }
      // }
      //
      // const result = foo.bar;
      // const illegalAccess = foo.quux.tooDeep;
      //
      // Punchline....Don't use getters and setters
      propertyReadSideEffects: false,
    },
    // Establish Rollup output
    output: {
      // Set the output directory
      dir: paths.appDist,
      // Set filenames of the consumer's package
      entryFileNames,
      // Pass through the file format
      format: opts.format,
      // Do not let Rollup call Object.freeze() on namespace import objects
      // (i.e. import * as namespaceImportObject from...) that are accessed dynamically.
      freeze: false,
      // Respect tsconfig esModuleInterop when setting __esModule.
      esModule: Boolean(tsCompilerOptions?.esModuleInterop),
      name: opts.name || safeVariableName(opts.name),
      sourcemap: true,
      globals: { react: 'React', 'react-native': 'ReactNative' },
      exports: 'named',
    },
    plugins: [
      resolve({
        mainFields: [
          'module',
          'main',
          opts.target !== 'node' ? 'browser' : undefined,
        ].filter(Boolean) as string[],
        extensions: [...RESOLVE_DEFAULTS.extensions, '.jsx'],
      }),
      // all bundled external modules need to be converted from CJS to ESM
      commonjs({
        // use a regex to make sure to include eventual hoisted packages
        include:
          opts.format === 'umd'
            ? /\/node_modules\//
            : /\/regenerator-runtime\//,
      }),
      json(),
      typescript({
        typescript: ts,
        tsconfig: opts.tsconfig,
        tsconfigDefaults: {
          exclude: [
            // all TS test files, regardless whether co-located or in test/ etc
            '**/*.spec.ts',
            '**/*.test.ts',
            '**/*.spec.tsx',
            '**/*.test.tsx',
            // TS defaults below
            'node_modules',
            'bower_components',
            'jspm_packages',
            paths.appDist,
          ],
          compilerOptions: {
            sourceMap: true,
            declaration: true,
            jsx: 'react',
          },
        },
        tsconfigOverride: {
          compilerOptions: {
            // TS -> esnext, then leave the rest to babel-preset-env
            target: 'esnext',
            ...(Boolean(declarationDir) ? { declarationDir } : {}),
            // don't output declarations more than once
            ...(outputNum > 0
              ? { declaration: false, declarationMap: false }
              : {}),
          },
        },
        check: !opts.transpileOnly && outputNum === 0,
        useTsconfigDeclarationDir: Boolean(declarationDir),
      }),
      babelPluginTcm({
        exclude: 'node_modules/**',
        extensions: [...DEFAULT_BABEL_EXTENSIONS, 'ts', 'tsx'],
        babelHelpers: 'bundled',
      }),
      opts.env !== undefined &&
        replace({
          'process.env.NODE_ENV': JSON.stringify(opts.env),
          preventAssignment: true,
        }),
      sourceMaps(),
      shouldMinify &&
        terser({
          output: { comments: false },
          compress: {
            keep_infinity: true,
            pure_getters: true,
            passes: 10,
          },
          ecma: 5,
          toplevel: opts.format === 'cjs'
        }),
    ],
  };
}
