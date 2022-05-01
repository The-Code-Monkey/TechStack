import toJson from 'enzyme-to-json';
import React from 'react';

import { mountWithTheme } from '../../../test-tools';
import Icon from '../index';

jest.mock('../utils');

describe('<Icon />', () => {
  it('renders correctly', () => {
    const { asFragment } = mountWithTheme(<Icon name='GitHub' />);
    expect(asFragment()).toMatchSnapshot();
  });
});
