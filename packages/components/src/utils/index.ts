import { DefaultTheme } from 'styled-components';

export * from './automation';
export * from './context/config';
export * from './shouldForwardProp';
export * from './theme-provider';

export type DefaultThemeWithDefaultStyles = DefaultTheme & {
  defaultStyles?: Record<string, Record<string, unknown>>;
};
