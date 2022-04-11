import toJson from 'enzyme-to-json';
import React from 'react';

import Table from '../';
import { mountWithTheme } from '../../../test-tools';

describe('<Table />', () => {
  it('should render correctly', () => {
    const wrapper = mountWithTheme(<Table columns={[]} data={[]} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
