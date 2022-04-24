import * as fs from 'fs-extra';
import { RollupOptions } from 'rollup';

import { paths } from './constants.js';
import { createRollupConfig } from './createRollupConfig.js';
import logError from './logError.js';
import {
  TcmOptions,
  TcmOptionsInput,
  NormalizedOpts,
  PackageJson,
} from './types.js';
import { interopRequireDefault } from './utils.js';

// check for custom tcm.config.js
let tcmBuildConfig = {
  rollup(config: RollupOptions, _options: TcmOptions): RollupOptions {
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
    tcmBuildConfig = interopRequireDefault(require(paths.appConfigTs)).default;
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
): Promise<Array<RollupOptions>> {
  const allInputs = createAllFormats(opts).map(
    (options: TcmOptions, index: number) => ({
      ...options,
      // We want to know if this is the first run for each entryfile
      // for certain plugins (e.g. css)
      writeMeta: index === 0,
    })
  );

  return await Promise.all(
    allInputs.map(async (options: TcmOptions, index: number) => {
      // pass the full rollup config to tcm-cli.config.js override
      const config = await createRollupConfig(appPackageJson, options, index);
      return tcmBuildConfig.rollup(config, options);
    })
  );
}

function createAllFormats(opts: NormalizedOpts): [TcmOptions, ...TcmOptions[]] {
  const sharedOpts: Omit<TcmOptions, 'format' | 'env'> = {
    ...opts,
    // for multi-entry, we use an input object to specify where to put each
    // file instead of output.file
    input: opts.input.reduce((dict: TcmOptionsInput, input, index) => {
      dict[`${opts.output.file[index]}`] = input;
      return dict;
    }, {}),
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
  ].filter(Boolean) as [TcmOptions, ...TcmOptions[]];
}
