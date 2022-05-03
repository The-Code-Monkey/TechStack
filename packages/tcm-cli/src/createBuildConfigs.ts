import {BuildOptions} from "esbuild";
import fs from 'fs-extra';
import { RollupOptions } from 'rollup';

import { paths } from './constants.js';
// import { createRollupConfig } from './createRollupConfig.js';
import createEsbuildConfig from "./createEsbuildConfig.js";
import logError from './logError.js';
import {
  TcmOptions,
  NormalizedOpts,
  PackageJson,
} from './types.js';
import { interopRequireDefault } from './utils.js';

// check for custom tcm.config.js
let tcmBuildConfig: unknown = {
  build(config: RollupOptions, _options: TcmOptions): RollupOptions {
    return config;
  },
};

if (fs.pathExistsSync(paths.appConfigTs)) {
  try {
    require('ts-node').register({
      compilerOptions: {
        module: 'CommonJS',
      },
    });
    tcmBuildConfig = (
      interopRequireDefault(require(paths.appConfigTs)) as { default: unknown }
    ).default;
  } catch (error) {
    logError(error);
    process.exit(1);
  }
} else if (fs.pathExistsSync(paths.appConfigJs)) {
  tcmBuildConfig = require(paths.appConfigJs);
}

export async function createBuildConfigs(
  opts: NormalizedOpts,
  appPackageJson: PackageJson
): Promise<Array<BuildOptions>> {
  const allInputs = createAllFormats(opts).map(
    (options: NormalizedOpts, index: number) => ({
      ...options,
      // We want to know if this is the first run for each entryfile
      // for certain plugins (e.g. css)
      writeMeta: index === 0,
    })
  );

  return await Promise.all(
    allInputs.map(async (options: NormalizedOpts, index: number) => {
      // pass the full rollup config to tcm-cli.config.js override
      const config = await createEsbuildConfig(appPackageJson, options, index);

      console.log(config);
      return (
        tcmBuildConfig as {
          build: (config: BuildOptions, options: NormalizedOpts) => BuildOptions;
        }
      ).build(config, options);
    })
  );
}

function createAllFormats(opts: NormalizedOpts): [NormalizedOpts, ...NormalizedOpts[]] {
  const sharedOpts: NormalizedOpts = {
    ...opts,
    // multiple UMD names aren't currently supported for multi-entry
    // (can't code-split UMD anyway)
    name: Array.isArray(opts.name) ? opts.name[0] : opts.name,
  };

  return [
    opts.format.includes('cjs') && {
      ...sharedOpts,
      format: 'cjs',
      env: 'development',
    },
    opts.format.includes('cjs') && {
      ...sharedOpts,
      format: 'cjs',
      env: 'production',
    },
    opts.format.includes('esm') && { ...sharedOpts, format: 'esm' },
    opts.format.includes('umd') && {
      ...sharedOpts,
      format: 'umd',
      env: 'development',
    },
    opts.format.includes('umd') && {
      ...sharedOpts,
      format: 'umd',
      env: 'production',
    },
    opts.format.includes('system') && {
      ...sharedOpts,
      format: 'system',
      env: 'development',
    },
    opts.format.includes('system') && {
      ...sharedOpts,
      format: 'system',
      env: 'production',
    },
  ].filter(Boolean) as [NormalizedOpts, ...NormalizedOpts[]];
}
