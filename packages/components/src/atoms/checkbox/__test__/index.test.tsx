import { fireEvent, screen } from '@testing-library/react';
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

    const { getByTitle } = mountWithTheme(<Checkbox onClick={handleClick} />);

    expect(async () => await getByTitle('minus-icon'));

    fireEvent.click(screen.getByTitle('minus-icon'));

    expect(handleClick).toHaveBeenCalled();
  });
});
