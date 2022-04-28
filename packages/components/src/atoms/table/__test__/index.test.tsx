import toJson from 'enzyme-to-json';
import React from 'react';

import { mountWithTheme } from '../../../test-tools';
import Table from '../index';

describe('<Table />', () => {
  it('should render correctly', () => {
    const wrapper = mountWithTheme(<Table columns={[]} data={[]} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
