import toJson from 'enzyme-to-json';
import React from 'react';

import Icon from '..';
import { mountWithTheme } from '../../../test-tools';

jest.mock('../utils');

describe('<Icon />', () => {
  it('renders correctly', () => {
    const wrapper = mountWithTheme(<Icon name="GitHub" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
