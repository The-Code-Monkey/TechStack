import React from 'react';

import Button from './index';

export default {
  title: 'Components / Atoms / Button',
  component: Button,
};

export const Default = () => <Button>Default Button</Button>;

export const Primary = () => <Button variant='primary'>Primary Button</Button>;

export const Secondary = () => (
  <Button variant='secondary'>Secondary Button</Button>
);

export const IconButtons = () => (
  <>
    <Button iconName='GitHub'>left</Button>
    <Button iconName='GitHub' iconPosition='top'>
      top
    </Button>
    <Button iconName='GitHub' iconPosition='right'>
      right
    </Button>
    <Button iconName='GitHub' iconPosition='bottom'>
      bottom
    </Button>
  </>
);

export const IconOnly = () => <Button iconName='GitHub' />;
