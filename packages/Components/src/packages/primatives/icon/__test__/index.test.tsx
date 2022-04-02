import React from 'react';
import toJson from 'enzyme-to-json';

import { mountWithTheme } from '../../../test-tools';
import Icon from '..';

jest.mock('../utils');

describe('<Icon />', () => {
  it('renders correctly', () => {
    const wrapper = mountWithTheme(<Icon name="test" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
