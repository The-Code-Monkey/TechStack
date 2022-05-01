import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { Default as Thing } from '../stories/Thing.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const root = createRoot(document.createElement('div'));
    root.render(<Thing />);
    root.unmount();
  });
});
