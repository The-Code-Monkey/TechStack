import React from 'react';

import { mountWithTheme } from '../../../test-tools';
import Icon from '../index';

describe('<Icon />', () => {
  it('renders correctly', () => {
    const { asFragment } = mountWithTheme(<Icon name='GitHub' />);
    expect(asFragment()).toMatchSnapshot();
  });
});
