import { RollupOptions } from 'rollup';

import { NormalizedTcmConfig } from './types';


export const configDefaults: NormalizedTcmConfig = Object.freeze({
  rollup: (config: RollupOptions) => config,
});
