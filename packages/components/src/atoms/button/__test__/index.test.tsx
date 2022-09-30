import { act, screen, waitFor } from '@testing-library/react';

import { mountWithTheme } from '../../../test-tools';
import Button from '../index';

describe('<Button />', () => {
  it('renders default correctly', () => {
    const { asFragment } = mountWithTheme(<Button>Default</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders primary correctly', () => {
    const { asFragment } = mountWithTheme(
      <Button variant='primary'>Primary</Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders secondary correctly', () => {
    const { asFragment } = mountWithTheme(
      <Button variant='secondary'>Secondary</Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders icon correctly', async () => {
    const { asFragment } = mountWithTheme(
      <Button iconName='github'>Secondary</Button>
    );

    await act(async () => {
      await waitFor(() => expect(screen.findByTestId('github_icon')));
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders icon only correctly', async () => {
    const { asFragment } = mountWithTheme(<Button iconName='github' />);

    await act(async () => {
      await waitFor(() => expect(screen.findByTestId('github_icon')));
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
