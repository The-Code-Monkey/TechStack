import * as React from 'react';

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

  it('renders icon correctly', () => {
    const { asFragment } = mountWithTheme(
      <Button iconName='GitHub'>Secondary</Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders icon only correctly', () => {
    const { asFragment } = mountWithTheme(<Button iconName='GitHub' />);
    expect(asFragment()).toMatchSnapshot();
  });
});
