import { ComponentMeta, ComponentStory } from '@storybook/react';

import Box from './Box';

export default {
  title: 'Components / Primal / Box',
  component: Box,
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = args => <Box {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'This is some content',
};

export const BoxWithBorder = Template.bind({});

BoxWithBorder.args = {
  children: 'This box has a border and padding',
  border: 1,
  borderRadius: 2,
  p: 4,
};

export const BoxWithPseudo = Template.bind({});

BoxWithPseudo.args = {
  children: 'this is a hover box',
  _hover: {
    bg: 'red',
  },
};

BoxWithPseudo.parameters = {
  pseudo: { hover: true },
};
