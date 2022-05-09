import { ComponentMeta, ComponentStory } from '@storybook/react';

import Interactable from './Interactable';

export default {
  title: 'Components / Primal / Interactable',
  component: Interactable,
} as ComponentMeta<typeof Interactable>;

const Template: ComponentStory<typeof Interactable> = args => (
  <Interactable {...args} />
);

export const Default = Template.bind({});

Default.args = {
  children: 'CLICK ME!',
  onClick: () => window.alert('You clicked me'),
};

export const DoubleClick = Template.bind({});

DoubleClick.args = {
  children: 'Double Click Me!',
  onDoubleClick: () => window.alert('You double clicked me'),
};

export const SingleAndDoubleClick = Template.bind({});

SingleAndDoubleClick.args = {
  children: 'Click or Double Click',
  onClick: () => window.alert('You clicked me'),
  onDoubleClick: () => window.alert('You double clicked me'),
};
