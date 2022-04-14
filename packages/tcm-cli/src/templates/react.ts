import { PackageJson } from 'type-fest';

import basicTemplate from './basic';
import { Template } from './template';

const reactTemplate: Template = {
  name: 'react',
  dependencies: [
    ...basicTemplate.dependencies,
    '@types/react',
    '@types/react-dom',
    'react',
    'react-dom',
    '@tsconfig/create-react-app',
  ],
  packageJson: {
    ...basicTemplate.packageJson,
    peerDependencies: {
      react: '>=16',
    },
    scripts: {
      ...basicTemplate.packageJson.scripts,
      test: 'tcm test --passWithNoTests',
    } as PackageJson['scripts'],
    jest: {
      testEnvironment: 'jsdom',
    },
  },
};

export default reactTemplate;
