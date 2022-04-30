/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { Thing } from '../src';

describe('Thing', () => {
  it('renders without crashing', () => {
    const root = createRoot(document.createElement('div'));
    root.render(<Thing />);
    root.unmount();
  });
});
