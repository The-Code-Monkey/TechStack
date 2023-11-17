import { Meta } from '@storybook/react';

import Icon from './Icon';

export default {
  title: 'Components / Primal / Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export const Default = {
  args: {
    name: 'GitHub',
  },
};

export const Colored = {
  args: {
    name: 'GitHub',
    color: 'red',
  },
};

export const Filled = {
  args: {
    name: 'GitHub',
    color: 'red',
    fill: true,
  },
};
