import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Thing } from '../.';

const App = () => {
  return (
    <div>
      <Thing />
    </div>
  );
};
createRoot(document.getElementById('root') as HTMLElement).render(<App />);
