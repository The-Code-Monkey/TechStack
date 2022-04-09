import React from 'react';

import { Button } from '../../atoms';

import ButtonGroup from './';

export default {
  title: 'Components / Molecules / ButtonGroup',
  component: ButtonGroup,
};

export const Default = () => (
  <ButtonGroup>
    <Button>button1</Button>
    <Button>button2</Button>
    <Button>button3</Button>
  </ButtonGroup>
);
