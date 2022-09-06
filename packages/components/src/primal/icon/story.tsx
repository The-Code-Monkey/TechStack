import { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon from './Icon';

export default {
  title: 'Components / Primal / Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = args => <Icon {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: 'github',
};

export const Colored = Template.bind({});

Colored.args = {
  name: 'github',
  color: 'red',
};

export const Filled = Template.bind({});

Filled.args = {
  name: 'github',
  color: 'red',
  fill: true,
};
