import path from 'path';

import { DEFAULT_EXTENSIONS as DEFAULT_BABEL_EXTENSIONS } from '@babel/core';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve, {
  DEFAULTS as RESOLVE_DEFAULTS,
} from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import { RollupOptions } from 'rollup';
// import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import ts from 'typescript';

import { babelPluginTcm } from './babelPluginTcm.js';
import { paths } from './constants.js';
import { extractErrors } from './errors/extractErrors.js';
import { isTypesRollupEnabled } from './rollupTypes.js';
import { typescriptCompilerOptions } from './tsconfig.js';
import { TcmOptions, PackageJson } from './types.js';
import { safeVariableName, external } from './utils.js';

const errorCodeOpts = {
  errorMapFilePath: paths.appErrorsJson,
};

// shebang cache map thing because the transform only gets run once
const shebang: any = {};

export async function createRollupConfig(
  appPackageJson: PackageJson,
  opts: TcmOptions,
  outputNum: number
): Promise<RollupOptions> {
  const findAndRecordErrorCodes = await extractErrors({
    ...errorCodeOpts,
    ...opts,
  });

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
      // bundle in polyfills as DTS can't (yet) ensure they're installed as deps
      if (id.startsWith('regenerator-runtime')) {
        return false;
      }

      return external(id);
    },
    // Rollup has treeshaking by default, but we can optimize it further...
    treeshake: {
      // We assume reading a property of an object never has side-effects.
      // This means dts WILL remove getters and setters defined directly on objects.
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
      !!opts.extractErrors && {
        name: 'error-extractor',
        async transform(source: any) {
          await findAndRecordErrorCodes(source);
          return source;
        },
      },
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
      {
        name: 'shebang',
        // Custom plugin that removes shebang from code because newer
        // versions of bublé bundle their own private version of `acorn`
        // and I don't know a way to patch in the option `allowHashBang`
        // to acorn. Taken from microbundle.
        // See: https://github.com/Rich-Harris/buble/pull/165
        transform(code: string) {
          const reg = /^#!(.*)/;
          const match = code.match(reg);

          shebang[opts.name] = match ? '#!' + match[1] : '';

          code = code.replace(reg, '');

          return {
            code,
            map: null,
          };
        },
      },
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
        passPerPreset: true,
        custom: {
          targets: opts.target === 'node' ? { node: '10' } : undefined,
          extractErrors: opts.extractErrors,
          format: opts.format,
        },
        babelHelpers: 'bundled',
      }),
      opts.env !== undefined &&
        replace({
          'process.env.NODE_ENV': JSON.stringify(opts.env),
          preventAssignment: true,
        }),
      // removed as it does not support rollup v3 yet.
      // TODO: we could move to babel's inputSourceMap option(as it is supported in its readme)
      // sourceMaps(),
      shouldMinify &&
        terser({
          output: { comments: false },
          compress: {
            keep_infinity: true,
            pure_getters: true,
            passes: 10,
          },
          ecma: 5,
          toplevel: opts.format === 'cjs',
        }),
    ],
  };
}
