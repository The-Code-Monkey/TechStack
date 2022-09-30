import { screen, waitFor, act } from '@testing-library/react';

import { mountWithTheme } from '../../../test-tools';
import Icon from '../index';

describe('<Icon />', () => {
  it('renders correctly', async () => {
    const { asFragment } = mountWithTheme(<Icon name='github' />);
    await act(async () => {
      await waitFor(() => expect(screen.findByTestId('github_icon')));
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
