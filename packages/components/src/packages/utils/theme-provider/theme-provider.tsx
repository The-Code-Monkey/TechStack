import React, { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import createTheme from './create-theme';
import { ThemeModeEnum } from './enum';
import { StyledDiv } from './styled';
import { ITheme } from './types';

interface Props<V> {
  children: ReactNode;
  theme?: ITheme<V>;
  mode?: ThemeModeEnum;
  direction?: 'row' | 'column';
}

export const ThemeProvider = <V extends {}>({
  children,
  theme,
  mode,
  direction = 'column',
}: Props<V>) => (
  <>
    {/*// @ts-ignore*/}
    <StyledThemeProvider theme={createTheme(theme, mode)}>
      <StyledDiv direction={direction}>{children}</StyledDiv>
    </StyledThemeProvider>
  </>
);
