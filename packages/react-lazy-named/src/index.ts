/* eslint @typescript-eslint/no-explicit-any: 0 */
import { get } from 'lodash';
import * as React from 'react';

const Lazy = (
  thenable: () => Promise<{ [name: string]: any }>,
  name = 'default'
): React.LazyExoticComponent<React.ComponentType<any>> =>
  React.lazy(() =>
    thenable().then(mod => ({
      default: get(mod, name, 'ERROR EXPORT NOT FOUND'),
    }))
  );

export default Lazy;
