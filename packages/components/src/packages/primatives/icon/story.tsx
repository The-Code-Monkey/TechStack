import React from 'react';

import Icon from './Icon';

export default {
  title: 'Components / Primatives / Icon',
  component: Icon,
};

export const Story = () => (
  <div>
    <Icon name="GitHub" />
    <Icon name="GitHub" color="red" />
  </div>
);
