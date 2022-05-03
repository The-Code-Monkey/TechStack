// // import path from 'path';
// import { RollupOptions } from 'rollup';
// import esbuild from 'rollup-plugin-esbuild';
//
// // import { babelPluginTcm } from './babelPluginTcm.js';
// import { paths } from './constants.js';
// // import { extractErrors } from './errors/extractErrors.js';
// // import { isTypesRollupEnabled } from './rollupTypes.js';
// // import { typescriptCompilerOptions } from './tsconfig.js';
// import { TcmOptions, PackageJson } from './types.js';
// import {
//   // safeVariableName,
//   external } from './utils.js';
//
// // const errorCodeOpts = {
// //   errorMapFilePath: paths.appErrorsJson,
// // };
//
// // shebang cache map thing because the transform only gets run once
// // const shebang: any = {};
//
// export async function createRollupConfig(
//   appPackageJson: PackageJson,
//   opts: TcmOptions,
//   outputNum: number
// ): Promise<RollupOptions> {
//   // const findAndRecordErrorCodes = await extractErrors({
//   //   ...errorCodeOpts,
//   //   ...opts,
//   // });
//
//   const shouldMinify = opts.minify;
//
//   const outputSuffix = [opts.format, shouldMinify ? 'min' : '', 'js']
//     .filter(Boolean)
//     .join('.');
//   let entryFileNames = `[name].${outputSuffix}`;
//
//   // if there's only one input, uses the package name instead of the filename
//   const inputKeys = Object.keys(opts.input);
//   if (inputKeys.length === 1) {
//     entryFileNames = `${inputKeys[0]}.${outputSuffix}`;
//   }
//
//   console.log(entryFileNames);
//
//   // const tsCompilerOptions = typescriptCompilerOptions(opts.tsconfig);
//   // const typesRollupEnabled =
//   //   opts.rollupTypes && isTypesRollupEnabled(appPackageJson);
//   // const declarationDir =
//   //   typescriptCompilerOptions(opts.tsconfig).declarationDir ||
//   //   (typesRollupEnabled ? path.join('dist', 'types') : undefined);
//
//   return {
//     // Tell Rollup the entry point to the package
//     input: opts.input,
//     // Tell Rollup which packages to ignore
//     external: (id: string) => {
//       // bundle in polyfills as TCM can't (yet) ensure they're installed as deps
//       if (id.startsWith('regenerator-runtime')) {
//         return false;
//       }
//
//       return external(id);
//     },
//     treeshake: false,
//     // // Rollup has treeshaking by default, but we can optimize it further...
//     // treeshake: {
//     //   // We assume reading a property of an object never has side-effects.
//     //   // This means tcm WILL remove getters and setters defined directly on objects.
//     //   // Any getters or setters defined on classes will not be effected.
//     //   //
//     //   // @example
//     //   //
//     //   // const foo = {
//     //   //  get bar() {
//     //   //    console.log('effect');
//     //   //    return 'bar';
//     //   //  }
//     //   // }
//     //   //
//     //   // const result = foo.bar;
//     //   // const illegalAccess = foo.quux.tooDeep;
//     //   //
//     //   // Punchline....Don't use getters and setters
//     //   propertyReadSideEffects: false,
//     // },
//     // // Establish Rollup output
//     output: {
//       // Set the output directory
//       dir: paths.appDist,
//       // Set filenames of the consumer's package
//       entryFileNames,
//       // Pass through the file format
//       format: opts.format,
//       minifyInternalExports: false,
//     },
//     plugins: [
//       esbuild({
//         splitting: true,
//         // All options are optional
//         include: /\.[jt]sx?$/, // default, inferred from `loaders` option
//         exclude: /node_modules/, // default
//         minify: false,
//         treeShaking: false,
//         keepNames: true,
//         // jsx: 'transform', // default, or 'preserve'
//         jsxFactory: 'React.createElement',
//         jsxFragment: 'React.Fragment',
//         // Like @rollup/plugin-replace
//         define: {
//           __VERSION__: '"x.y.z"',
//         },
//         tsconfig: opts.tsconfig || paths.tsconfigJson, // default
//         // Add extra loaders
//         loaders: {
//           // Add .json files support
//           // require @rollup/plugin-commonjs
//           '.json': 'json',
//           // Enable JSX in .js files too
//           '.js': 'jsx',
//         },
//       }),
//       // !!opts.extractErrors && {
//       //   async transform(source: any) {
//       //     await findAndRecordErrorCodes(source);
//       //     return source;
//       //   },
//       // },
//
//     //   babelPluginTcm({
//     //     exclude: 'node_modules/**',
//     //     extensions: [...DEFAULT_BABEL_EXTENSIONS, 'ts', 'tsx'],
//     //     passPerPreset: true,
//     //     custom: {
//     //       targets: opts.target === 'node' ? { node: '10' } : undefined,
//     //       extractErrors: opts.extractErrors,
//     //       format: opts.format,
//     //     },
//     //     babelHelpers: 'bundled',
//     //   }),
//     ]
//   };
// }
