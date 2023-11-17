import { Meta } from '@storybook/react';

import Icon from './Icon';

export default {
  title: 'Components / Primal / Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export const Default = {
  args: {
    name: 'Github',
  },
};

export const Colored = {
  args: {
    name: 'Github',
    color: 'red',
  },
};

export const Filled = {
  args: {
    name: 'Github',
    color: 'red',
    fill: true,
  },
};
