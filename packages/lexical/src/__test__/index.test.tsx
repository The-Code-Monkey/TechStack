import { render } from '@testing-library/react';

import Editor from '../';

describe('<Editor />', () => {
  it('renders text correctly', () => {
    const { asFragment } = render(
      <Editor name={'test'} value={''} onChange={jest.fn()} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
