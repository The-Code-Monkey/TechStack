import {waitFor, screen} from "@testing-library/react";
import * as React from 'react';

import { mountWithTheme } from '../../../test-tools';
import Checkbox from '../index';

describe('<Checkbox />', () => {
  it('renders correctly no icon', () => {
    const { asFragment } = mountWithTheme(<Checkbox />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly checked', async () => {
    const { asFragment } = mountWithTheme(<Checkbox checked />);

    await waitFor(() => expect(screen.getByTitle('check-icon')));

    expect(asFragment()).toMatchSnapshot();
  });
  //
  // it('renders correctly indeterminate', () => {
  //   const { asFragment } = mountWithTheme(<Checkbox indeterminate />);
  //   expect(asFragment()).toMatchSnapshot();
  // });
  //
  // it('calls onClick function', async () => {
  //   const {asFragment} = mountWithTheme(<Checkbox />);
  //
  //   expect(asFragment()).toMatchSnapshot()
  //
  //   // await waitFor(() => expect(screen.getByTitle('minus-icon')));
  //
  //   // fireEvent.click(screen.getByTitle('minus-icon'));
  //
  //   expect(asFragment()).toMatchSnapshot()
  //
  //   // await waitFor(() => expect(screen.getByTitle('check-icon')));
  //
  //   expect(asFragment()).toMatchSnapshot()
  // });
});
