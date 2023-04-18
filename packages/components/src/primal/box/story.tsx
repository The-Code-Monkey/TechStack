import { Meta } from '@storybook/react';

import Box from './Box';

export default {
  title: 'Components / Primal / Box',
  component: Box,
} satisfies Meta<typeof Box>;

export const Default = {
  args: {
    children: 'This is some content',
  },
};

export const BoxWithBorder = {
  args: {
    children: 'This box has a border and padding',
    border: 1,
    borderRadius: 2,
    p: 4,
  },
};

export const BoxWithPseudo = {
  args: {
    children: 'this is a hover box',
    _hover: {
      bg: 'red',
    },
  },
};
