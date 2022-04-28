import toJson from 'enzyme-to-json';
import React from 'react';
import { mount } from 'enzyme';

import Icon from '../Icon';

describe('<Icon />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Icon name="check" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
