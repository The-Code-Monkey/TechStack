import { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import createTheme from './create-theme';
import { ThemeModeEnum } from './enum';
import { ITheme } from './types';

interface Props<V> {
  children: ReactNode;
  theme?: ITheme<V>;
  mode?: ThemeModeEnum;
}

export const ThemeProvider = <V extends object>({
  children,
  theme,
  mode,
}: Props<V>) => (
  <StyledThemeProvider theme={createTheme(theme, mode)}>
    {children}
  </StyledThemeProvider>
);
