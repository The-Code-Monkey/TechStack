import { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { ThemeModeEnum } from '../../theme/enum';
import { ITheme } from '../../theme/utils';

import createTheme from './create-theme';

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
