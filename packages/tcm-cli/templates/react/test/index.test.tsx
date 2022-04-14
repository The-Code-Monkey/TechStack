import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import { Thing } from '../src';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    createRoot(div).render(<Thing />);
    ReactDOM.unmountComponentAtNode(div);
  });
});
