import React from 'react';

import Checkbox from './';

export default {
  title: 'Components / Atoms / Checkbox',
  component: Checkbox,
};

export const story = () => <Checkbox checked />;

export const Indeterminate = () => <Checkbox indeterminate />;
