import * as React from "react";

import Icon from './Icon';

export default {
  title: 'Components / Primatives / Icon',
  component: Icon,
};

export const Story = () => (
  <div>
    <Icon name='github' />
    <Icon name='github' color='red' />
  </div>
);
