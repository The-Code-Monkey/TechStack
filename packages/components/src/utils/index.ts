import { DefaultTheme } from 'styled-components';

export { generateAutomationId } from './automation';
export { ConfigContext } from './context/config';
export type { Context } from './context/config';
export { shouldForwardProp } from './shouldForwardProp';
export { ThemeProvider } from './theme-provider';

export type DefaultThemeWithDefaultStyles = DefaultTheme & {
  defaultStyles?: Record<string, Record<string, unknown>>;
};
