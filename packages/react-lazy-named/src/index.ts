/**
 * Improvement on top of React.lazy() that allows lazy rendering of named imports
 * Usage:
 *
 *  -- alternative to import { primary } from './Button'
 *  const PrimaryButton = lazier(() => import('./Button'), 'primary');
 *
 *  -- get the default import
 *  lazier(() => import('./Button'), 'default');
 *
 *  -- or
 *  lazier(() => import('./Button'));
 *
 */
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
