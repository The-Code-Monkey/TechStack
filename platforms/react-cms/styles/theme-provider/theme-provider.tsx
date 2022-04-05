import React, { ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { ThemeModeEnum } from "./enum";
import createTheme from "./create-theme";
import { StyledDiv } from "./styled";

interface Props {
  children: ReactNode;
  theme?: object;
  mode?: ThemeModeEnum;
  direction?: "row" | "column";
}

export const ThemeProvider = ({
  children,
  theme,
  mode,
  direction = "column",
}: Props) => (
  <StyledThemeProvider theme={createTheme(theme, mode)}>
    <StyledDiv direction={direction}>{children}</StyledDiv>
  </StyledThemeProvider>
);
