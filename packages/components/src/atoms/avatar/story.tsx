import { Meta } from '@storybook/react';

import { Avatar } from './Avatar';

export default {
  title: 'Components / Atoms / Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export const Children = {
  args: {
    children: 'Test Name',
    fontSize: 20,
  },
};

export const Img = {
  args: {
    url: 'https://picsum.photos/id/237/200',
  },
};

export const Icon = {
  args: {
    iconName: 'github',
  },
};

export const ImgAndChildren = {
  args: {
    url: 'https://picsum.photos/id/237/200',
    children: 'Test Name',
    size: 18,
    color: 'white',
    typography: {
      fontSize: '10rem',
    },
  },
};
