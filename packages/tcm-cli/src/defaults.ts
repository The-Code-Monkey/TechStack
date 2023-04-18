import { NormalizedTcmConfig } from './types';

export const configDefaults: NormalizedTcmConfig = Object.freeze({
  rollup: (config: any) => config,
});
