import { BuildOptions } from "esbuild";

import { paths } from './constants.js';
import {PackageJson, NormalizedOpts} from './types.js';

const createEsbuildConfig = (
    appPackageJson: PackageJson,
    opts: NormalizedOpts,
    outputNum: number
): BuildOptions => {
    console.log(paths.appDist);

      const shouldMinify = opts.minify;

      console.log(opts);

    return {
        format: "esm",
        entryPoints: ["./src/index"],
        outfile: `./dist/${opts.output.file[0]}.js`,
        minify: shouldMinify,
        // splitting: opts.format === 'esm',
        // // All options are optional
        // minify: false,
        // treeShaking: false,
        // keepNames: true,
        // // jsx: 'transform', // default, or 'preserve'
        // jsxFactory: 'React.createElement',
        // jsxFragment: 'React.Fragment',
        // // Like @rollup/plugin-replace
        // define: {
        //     __VERSION__: '"x.y.z"',
        // },
        tsconfig: opts.tsconfig || paths.tsconfigJson, // default
        logLevel: "debug"
    }
}

export default createEsbuildConfig;