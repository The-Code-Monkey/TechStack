import { Meta } from '@storybook/react';

import Interactable from './Interactable';

export default {
  title: 'Components / Primal / Interactable',
  component: Interactable,
} satisfies Meta<typeof Interactable>;

export const Default = {
  args: {
    children: 'CLICK ME!',
    onClick: () => window.alert('You clicked me'),
  },
};

export const DoubleClick = {
  args: {
    children: 'Double Click Me!',
    onDoubleClick: () => window.alert('You double clicked me'),
  },
};

export const SingleAndDoubleClick = {
  args: {
    children: 'Click or Double Click',
    onClick: () => window.alert('You clicked me'),
    onDoubleClick: () => window.alert('You double clicked me'),
  },
};
