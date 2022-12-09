import { act, screen, waitFor } from '@testing-library/react';

import { mountWithTheme } from '../../../test-tools';
import { Avatar } from '../Avatar';

describe('<Avatar />', () => {
  it('renders text correctly', () => {
    const { asFragment } = mountWithTheme(<Avatar>Test Text</Avatar>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders icon correctly', async () => {
    const { asFragment } = mountWithTheme(<Avatar iconName='github' />);

    await act(async () => {
      await waitFor(() => expect(screen.findByTestId('github_icon')));
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders img correctly', () => {
    const { asFragment } = mountWithTheme(
      <Avatar url='https://picsum.photos/id/237/200' />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render initials if provided', () => {
    const name = 'John Doe';
    const { container } = mountWithTheme(
      <Avatar data-testid='avatar'>{name}</Avatar>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should change size based on size prop', () => {
    const { container } = mountWithTheme(
      <Avatar size={20} data-testid='avatar' />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should apply typography styles if provided', () => {
    const { container } = mountWithTheme(
      <Avatar
        typography={{ fontSize: 16, fontWeight: 'bold' }}
        data-testid='avatar'
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
