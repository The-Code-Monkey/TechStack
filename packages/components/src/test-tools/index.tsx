import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../theme';
import { ConfigContext } from '../utils';

const config = {
  outputDir: '/src/packages/',
  iconDir: 'feather',
};

type SnapshotSerializerPlugin = import('pretty-format').Plugin;

const removeProperties = (): SnapshotSerializerPlugin => {
  const keys = ['theme', 'styledTheme'];
  return {
    test: (val: { props: unknown }) =>
      val &&
      typeof val === 'object' &&
      'props' in val &&
      Object.keys(val.props).some(prop => keys.some(key => key === prop)),
    serialize: (val, config, indentation, depth, refs, printer) => {
      keys.forEach(key => {
        delete val.props[key];
      });
      return printer(val, config, indentation, depth, refs);
    },
  };
};

const formattedTheme = {
  ...theme,
  colors: {
    common: theme.colors?.common,
    modes: theme.colors?.modes,
    ...theme.colors?.modes.light,
  },
};

export const mountWithTheme = (children: ReactNode) => {
  expect.addSnapshotSerializer(removeProperties());

  return render(
    <ConfigContext.Provider value={config}>
      <ThemeProvider theme={formattedTheme}>
        <>{children}</>
      </ThemeProvider>
    </ConfigContext.Provider>
  );
};
