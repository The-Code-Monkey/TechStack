import { PackageJson } from 'type-fest';

import reactTemplate from './react.js';
import { Template } from './template.js';

const storybookTemplate: Template = {
  dependencies: [
    ...reactTemplate.dependencies,
    '@babel/core',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-info',
    '@storybook/addons',
    '@storybook/react',
    'react-is',
    'babel-loader',
    '@tsconfig/create-react-app',
  ],
  name: 'react-with-storybook',
  packageJson: {
    ...reactTemplate.packageJson,
    scripts: {
      ...reactTemplate.packageJson.scripts,
      storybook: 'start-storybook -p 6006',
      'build-storybook': 'build-storybook',
    } as PackageJson['scripts'],
    jest: {
      testEnvironment: 'jsdom',
    },
  },
};

export default storybookTemplate;
