import { screen, waitFor, act } from '@testing-library/react';
import { ReactNode } from 'react';

import { mountWithTheme } from '../../../test-tools';
import { Icon } from '../index';

describe('<Icon />', () => {
  it('renders correctly', async () => {
    const { asFragment } = mountWithTheme(
      (<Icon name='Github' />) as ReactNode
    );
    await act(async () => {
      await waitFor(() => expect(screen.findByTestId('github_icon')));
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
