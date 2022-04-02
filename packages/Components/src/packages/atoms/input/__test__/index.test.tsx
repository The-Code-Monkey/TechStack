import React from 'react';
import toJson from 'enzyme-to-json';

import { mountWithTheme } from '../../../test-tools';
import Input from '..';

describe('<Input />', () => {
  it('renders correctly', () => {
    const wrapper = mountWithTheme(<Input name="test" />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
