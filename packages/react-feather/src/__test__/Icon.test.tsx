import {render} from '@testing-library/react';
import * as React from 'react';

import { Icon } from '../Icon';

describe('<Icon />', () => {
  it('renders correctly', async () => {
    const {
      asFragment
    } = render(<Icon name="check"/>);
    expect(asFragment()).toMatchSnapshot();
  });
});
