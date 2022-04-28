import toJson from 'enzyme-to-json';
import React from 'react';

import { mountWithTheme } from '../../../test-tools';
import Checkbox from '../index';

describe('<Checkbox />', () => {
  it('renders correctly no icon', () => {
    const wrapper = mountWithTheme(<Checkbox />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly checked', () => {
    const wrapper = mountWithTheme(<Checkbox checked />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly indeterminate', () => {
    const wrapper = mountWithTheme(<Checkbox indeterminate />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('calls onClick function', () => {
    const handleClick = jest.fn();

    const wrapper = mountWithTheme(<Checkbox onClick={handleClick} />);

    wrapper.find('div').simulate('click');

    expect(handleClick).toHaveBeenCalled();
  });
});
