import { Meta } from '@storybook/react';

import Carousel from './';

export default {
  title: 'Components / Molecules / Carousel',
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export const SingleTitle = {
  args: {
    titles: ['Single Title'],
    singleTitle: true,
    images: [
      'https://picsum.photos/id/200/1200/501',
      'https://picsum.photos/id/201/1200/502',
      'https://picsum.photos/id/202/1200/503',
    ],
  },
};

export const MultiTitle = {
  args: {
    titles: ['1', '2', '3'],
    images: [
      'https://picsum.photos/id/200/1200/501',
      'https://picsum.photos/id/201/1200/502',
      'https://picsum.photos/id/202/1200/503',
    ],
  },
};
