import { resolveApp } from './utils.js';

export const paths = {
  appPackageJson: resolveApp('package.json'),
  tsconfigJson: resolveApp('tsconfig.json'),
  testsSetup: resolveApp('test/setupTests.ts'),
  appRoot: resolveApp('.'),
  appSrc: resolveApp('src'),
  appErrorsJson: resolveApp('errors/codes.json'),
  appErrors: resolveApp('errors'),
  appDist: resolveApp('dist'),
  appConfigJs: resolveApp('tcm.config.js'),
  appConfigTs: resolveApp('tcm.config.ts'),
  jestConfig: resolveApp('jest.config.js'),
  progressEstimatorCache: resolveApp('node_modules/.cache/.progress-estimator'),
};
