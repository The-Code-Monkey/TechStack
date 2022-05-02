import React from 'react';

import { mountWithTheme } from '../../../test-tools';
import Input from '../index';

describe('<Input />', () => {
  it('renders correctly', () => {
    const { asFragment } = mountWithTheme(<Input name='test' />);

    expect(asFragment()).toMatchSnapshot();
  });
});
