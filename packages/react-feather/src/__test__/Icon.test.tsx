import { render, waitFor, screen } from '@testing-library/react';

import { Icon } from '../Icon';

describe('<Icon />', () => {
  it('renders correctly', async () => {
    const { asFragment } = render(<Icon name='check' />);

    expect(asFragment()).toMatchSnapshot();

    await waitFor(() => expect(screen.getByTitle('check-icon')), {
      timeout: 2000,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
