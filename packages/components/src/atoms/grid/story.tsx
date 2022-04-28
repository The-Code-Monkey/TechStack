import React from 'react';

import Grid, { Cell } from './index';

export default {
  title: 'Components / Atoms / Grid',
  component: Grid,
};

export const Story = () => (
  <Grid columns={['auto', '1fr 1fr', '1fr 1fr 2fr']}>
    <Cell>Cell 1</Cell>
    <Cell>Cell 2</Cell>
    <Cell>Cell 3</Cell>
    <Cell>Cell 4</Cell>
    <Cell>Cell 5</Cell>
  </Grid>
);
