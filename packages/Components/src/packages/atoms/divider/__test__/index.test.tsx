import React from 'react';
import toJson from 'enzyme-to-json';

import { mountWithTheme } from '../../../test-tools';
import Divider from '..';

describe('<Divider />', () => {
  it('renders correctly', () => {
    const wrapper = mountWithTheme(<Divider />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
