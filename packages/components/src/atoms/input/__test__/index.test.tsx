import toJson from 'enzyme-to-json';
import React from 'react';

import { mountWithTheme } from '../../../test-tools';
import Input from '../index';

describe('<Input />', () => {
  it('renders correctly', () => {
    const wrapper = mountWithTheme(<Input name='test' />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
