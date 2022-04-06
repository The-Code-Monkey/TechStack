import toJson from 'enzyme-to-json';
import React from 'react';

import Input from '..';
import { mountWithTheme } from '../../../test-tools';

describe('<Input />', () => {
  it('renders correctly', () => {
    const wrapper = mountWithTheme(<Input name="test" />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
