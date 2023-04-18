import chalk from 'chalk';
import fs from 'fs-extra';
import { OutputOptions, RollupOptions } from 'rollup';

import { paths } from './constants.js';
import { createRollupConfig } from './createRollupConfig.js';
import { configDefaults } from './defaults.js';
import logError from './logError.js';
import {
  TcmConfig,
  TcmOptions,
  TcmOptionsInput,
  NormalizedTcmConfig,
  NormalizedOpts,
  PackageJson,
} from './types.js';
import { interopRequireDefault } from './utils.js';

export async function createBuildConfigs(
  opts: NormalizedOpts,
  appPackageJson: PackageJson
): Promise<Array<RollupOptions & { output: OutputOptions }>> {
  const allInputs = createAllFormats(opts).map(
    (options: TcmOptions, index: number) => ({
      ...options,
      // We want to know if this is the first run for each entryfile
      // for certain plugins (e.g. css)
      writeMeta: index === 0,
    })
  );

  // check for custom tcm.config.ts/tcm.config.js
  const tcmBuildConfig: NormalizedTcmConfig = getNormalizedTcmConfig();

  return await Promise.all(
    allInputs.map(async (options: TcmOptions, index: number) => {
      // pass the full rollup config to tcm-cli.config.js override
      const config = await createRollupConfig(appPackageJson, options, index);
      return tcmBuildConfig.rollup(config, options) as RollupOptions & {
        output: OutputOptions;
      };
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
    }, {}) as unknown as Array<string> | string,
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

function getNormalizedTcmConfig(): NormalizedTcmConfig {
  const tcmConfig = getTcmConfig();

  if (!tcmConfig.rollup) {
    console.log(
      chalk.yellow(
        'rollup configuration not provided. Using default no-op configuration.'
      )
    );
  }

  return {
    ...tcmConfig,
    rollup: tcmConfig.rollup ?? configDefaults.rollup,
  };
}

function getTcmConfig(): TcmConfig {
  // check for custom tcm.config.js
  let tcmConfig: any = configDefaults;

  if (fs.existsSync(paths.appConfigTs)) {
    tcmConfig = loadTcmConfigTs();
  } else if (fs.existsSync(paths.appConfigJs)) {
    tcmConfig = loadTcmConfigJs();
  } else if (fs.existsSync(paths.appConfigCjs)) {
    tcmConfig = loadTcmConfigCjs();
  }

  return isTcmConfig(tcmConfig) ? tcmConfig : configDefaults;
}

// This can return undefined if they don't export anything in
// tcm.config.ts
function loadTcmConfigTs(): TcmConfig | undefined {
  try {
    require('ts-node').register({
      compilerOptions: {
        module: 'CommonJS',
      },
      transpileOnly: true, // skip type checking
    });
    return (interopRequireDefault(require(paths.appConfigTs)) as any).default;
  } catch (error) {
    logError(error);
    process.exit(1);
  }
}

// This can return undefined if they don't export anything in
// tcm.config.js
function loadTcmConfigJs(): TcmConfig | undefined {
  // babel-node could easily be injected here if so desired.
  return require(paths.appConfigJs);
}

function loadTcmConfigCjs(): TcmConfig | undefined {
  return require(paths.appConfigCjs);
}

function isTcmConfig(required: any): required is TcmConfig {
  return isDefined(required) && isDefined(required);
}

function isDefined<T>(required: T | undefined | null): required is T {
  return required !== null && required !== undefined;
}
