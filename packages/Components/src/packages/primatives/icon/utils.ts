import lazy from 'react-lazy-named';

export const getIcon = (
  config: import('../../utils').Context | null,
  name: string
) => {
  if (config?.iconDir) {
    switch (config.iconDir) {
      default:
        return lazy(() => import('react-feather'), name);
    }
  }

  throw new Error('Unknown icon lib');
};
