import { render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';

import { Icon } from '../Icon';

describe('<Icon />', () => {
  it('renders correctly', async () => {
    const { asFragment } = render(<Icon name="check" />);
    await waitFor(() => expect(screen.findByTitle('check-icon')));

    expect(asFragment()).toMatchSnapshot();
  });
});
