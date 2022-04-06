import toJson from 'enzyme-to-json';
import React from 'react';

import Button from '..';
import { mountWithTheme } from '../../../test-tools';

describe('<Button />', () => {
  it('renders default correctly', () => {
    const wrapper = mountWithTheme(<Button>Default</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders primary correctly', () => {
    const wrapper = mountWithTheme(<Button variant="primary">Primary</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders secondary correctly', () => {
    const wrapper = mountWithTheme(
      <Button variant="secondary">Secondary</Button>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders icon correctly', () => {
    const wrapper = mountWithTheme(
      <Button iconName="GitHub">Secondary</Button>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders icon only correctly', () => {
    const wrapper = mountWithTheme(<Button iconName="GitHub" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
