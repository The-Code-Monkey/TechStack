
import { render } from "@testing-library/react";
import * as React from 'react';

import {Icon} from '../Icon';

describe('<Icon />', () => {
  it('renders correctly', () => {
    const wrapper = render(<Icon name="check" />);
    expect(wrapper).toMatchSnapshot();
  });
});
