import React from 'react';
import { mountWithTheme } from '../../../test-tools';
import { Grid, Cell } from '../index';
import { expect, describe, it } from "bun:test";

describe('<Grid />', () => {
  it('renders correctly', () => {
    const { asFragment } = mountWithTheme(
      <Grid columns={['auto', '1fr 1fr', '1fr 1fr 2fr']}>
        <Cell>Cell 1</Cell>
        <Cell>Cell 2</Cell>
        <Cell>Cell 3</Cell>
        <Cell>Cell 4</Cell>
        <Cell>Cell 5</Cell>
      </Grid>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
