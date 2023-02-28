import { ComponentMeta, ComponentStory } from '@storybook/react';

import Carousel from './';

export default {
  title: 'Components / Molecules / Carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = args => (
  <Carousel {...args} />
);

export const SingleTitle = Template.bind({});

SingleTitle.args = {
  titles: ['Single Title'],
  singleTitle: true,
  images: [
    'https://picsum.photos/id/200/1200/501',
    'https://picsum.photos/id/201/1200/502',
    'https://picsum.photos/id/202/1200/503',
  ],
};

export const MultiTitle = Template.bind({});

MultiTitle.args = {
  titles: ['1', '2', '3'],
  images: [
    'https://picsum.photos/id/200/1200/501',
    'https://picsum.photos/id/201/1200/502',
    'https://picsum.photos/id/202/1200/503',
  ],
};
