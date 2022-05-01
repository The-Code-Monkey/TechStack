import toJson from 'enzyme-to-json';
import React from 'react';

import { mountWithTheme } from '../../../test-tools';
import Checkbox from '../index';

describe('<Checkbox />', () => {
  it('renders correctly no icon', () => {
    const { asFragment } = mountWithTheme(<Checkbox />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly checked', () => {
    const { asFragment } = mountWithTheme(<Checkbox checked />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly indeterminate', () => {
    const { asFragment } = mountWithTheme(<Checkbox indeterminate />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls onClick function', () => {
    const handleClick = jest.fn();

    const { asFragment } = mountWithTheme(<Checkbox onClick={handleClick} />);

    wrapper.find('div').simulate('click');

    expect(handleClick).toHaveBeenCalled();
  });
});
