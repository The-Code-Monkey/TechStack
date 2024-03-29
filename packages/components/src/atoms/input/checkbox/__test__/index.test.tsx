import { waitFor, screen, act } from '@testing-library/react';

import { mountWithTheme } from '../../../../test-tools';
import { Checkbox } from '../index';

describe('<Checkbox />', () => {
  it('renders correctly no icon', () => {
    const { asFragment } = mountWithTheme(<Checkbox />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly checked', async () => {
    const { asFragment } = mountWithTheme(<Checkbox value='checked' />);

    await act(async () => {
      await waitFor(() => expect(screen.findByTestId('check_icon')));
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
