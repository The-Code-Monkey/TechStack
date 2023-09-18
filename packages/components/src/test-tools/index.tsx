import isPropValid from '@emotion/is-prop-valid';
import { render, RenderResult } from '@testing-library/react';
import {ReactElement} from 'react';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { format as prettyFormat, plugins as prettyFormatPlugins, } from "pretty-format";
import { expect } from "bun:test"

import theme from '../theme';
import { ConfigContext } from '../utils';

const config = {
  outputDir: '/src/packages/',
  iconDir: 'feather',
};

const removeProperties = () => {
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

const wrapper = ({ children }) => {
  return (
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <ConfigContext.Provider value={config}>
          <ThemeProvider theme={formattedTheme}>
            {children}
          </ThemeProvider>
        </ConfigContext.Provider>
      </StyleSheetManager>
  )
}

const {
  DOMCollection,
  DOMElement,
  Immutable,
  ReactElement,
  ReactTestComponent,
  AsymmetricMatcher,
} = prettyFormatPlugins;

let PLUGINS = [
  ReactTestComponent,
  ReactElement,
  DOMElement,
  DOMCollection,
  Immutable,
  AsymmetricMatcher,
];

export const mountWithTheme = (children: ReactElement): Omit<RenderResult, "asFragment"> & { asFragment: () => string } => {
  // expect.addSnapshotSerializer(removeProperties());

  const { asFragment: getFragment, ...rest } = render(
      children
  , {
    wrapper
      });

  const asFragment = () => prettyFormat(getFragment(), {
    escapeRegex: true,
    indent: 2,
    plugins: PLUGINS,
    printFunctionName: false
  })

  return {
    asFragment,
    ...rest
  }
};
