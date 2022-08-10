import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Avatar } from './Avatar';

export default {
  title: 'Components / Atoms / Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = args => <Avatar {...args} />;

export const Children = Template.bind({});

Children.args = {
  children: 'Test Name',
  fontSize: 20,
};

export const Img = Template.bind({});

Img.args = {
  url: 'https://picsum.photos/id/237/200',
};

export const Icon = Template.bind({});

Icon.args = {
  iconName: 'github',
};

export const ImgAndChildren = Template.bind({});

ImgAndChildren.args = {
  url: 'https://picsum.photos/id/237/200',
  children: 'Test Name',
  size: 18,
  color: 'white',
  typography: {
    fontSize: '10rem',
  },
};
