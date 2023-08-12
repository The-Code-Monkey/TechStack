import { RollupOptions } from 'rollup';

import { NormalizedTcmConfig } from './types';

export const configDefaults: TcmConfig = Object.freeze({
  rollup: (config: RollupOptions) => config,
});
