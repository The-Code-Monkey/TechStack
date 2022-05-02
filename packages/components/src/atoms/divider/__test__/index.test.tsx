import React from 'react';

import { mountWithTheme } from '../../../test-tools';
import Divider from '../index';

describe('<Divider />', () => {
  it('renders correctly', () => {
    const { asFragment } = mountWithTheme(<Divider />);

    expect(asFragment()).toMatchSnapshot();
  });
});
