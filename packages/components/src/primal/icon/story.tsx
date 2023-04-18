import { Meta } from '@storybook/react';

import Icon from './Icon';

export default {
  title: 'Components / Primal / Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export const Default = {
  args: {
    name: 'github',
  },
};

export const Colored = {
  args: {
    name: 'github',
    color: 'red',
  },
};

export const Filled = {
  args: {
    name: 'github',
    color: 'red',
    fill: true,
  },
};
