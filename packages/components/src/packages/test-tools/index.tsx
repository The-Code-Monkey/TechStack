import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../theme';
import { ConfigContext } from '../utils';

const config = {
  outputDir: '/src/packages/',
  iconDir: 'feather',
};

const removeProperties = () => {
  const keys = ['theme', 'styledTheme'];
  return {
    test: (val: any) =>
      val &&
      typeof val === 'object' &&
      'props' in val &&
      Object.keys(val.props).some((prop) => keys.some((key) => key === prop)),
    print: (val: any, serialize: any) => {
      keys.forEach((key) => {
        delete val.props[key];
      });
      return serialize(val);
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

export const shallowWithTheme: (children: ReactNode) => ShallowWrapper = (
  children: ReactNode
) =>
  shallow(<ThemeProvider theme={formattedTheme}>{children}</ThemeProvider>)
    .dive()
    .shallow();

export const mountWithTheme: (children: ReactNode) => ReactWrapper = (
  children: ReactNode
) => {
  expect.addSnapshotSerializer(removeProperties());

  return mount(
    <ConfigContext.Provider value={config}>
      <ThemeProvider theme={formattedTheme}>
        <>{children}</>
      </ThemeProvider>
    </ConfigContext.Provider>
  );
};
