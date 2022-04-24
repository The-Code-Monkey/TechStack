import fs from 'fs-extra';
import progressEstimator from 'progress-estimator';

import { paths } from './constants.js';

export async function createProgressEstimator() {
  await fs.ensureDir(paths.progressEstimatorCache);
  return progressEstimator({
    // All configuration keys are optional, but it's recommended to specify a storage location.
    storagePath: paths.progressEstimatorCache,
  });
}
