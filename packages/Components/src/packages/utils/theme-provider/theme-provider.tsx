import React, { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import createTheme, { ThemeType } from './create-theme';
import { ThemeModeEnum } from './enum';
import { StyledDiv } from './styled';

interface Props {
  children: ReactNode;
  theme?: ThemeType;
  mode?: ThemeModeEnum;
  direction?: 'row' | 'column';
}

export const ThemeProvider = ({
  children,
  theme,
  mode,
  direction = 'column',
}: Props) => (
  <StyledThemeProvider theme={createTheme(theme, mode)}>
    <StyledDiv direction={direction}>{children}</StyledDiv>
  </StyledThemeProvider>
);
