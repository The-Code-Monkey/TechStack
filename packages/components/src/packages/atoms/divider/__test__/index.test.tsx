import toJson from 'enzyme-to-json';
import React from 'react';

import Divider from '..';
import { mountWithTheme } from '../../../test-tools';

describe('<Divider />', () => {
  it('renders correctly', () => {
    const wrapper = mountWithTheme(<Divider />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
