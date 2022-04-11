import { ITheme, IThemeColorsType, ModeThemeType } from "@aw-web-design/components";

import colors from "./colors";
import variants from "./variants";
import fonts from "./dist/fonts";
import elevation from "./dist/elevation";
import shadows from "./dist/shadows";
import time from "./dist/time";
import sizes from "./dist/sizes";
import fontSizes from "./dist/fontSizes";
import fontWeights from "./dist/fontWeights";
import radii from "./dist/radii";
import opacity from "./dist/opacity";
import space from "./dist/space";
import spacing from "./dist/spacing";
import borders from "./dist/borders";
import lineHeights from "./dist/lineHeights";
import breakpoints from "./dist/breakpoints";
import breakpointSizes from "./dist/breakpointSizes";
import maxWidths from "./dist/maxWidths";
import panelSizes from "./dist/panelSizes";
import table from "./dist/table";

const theme: ITheme<typeof variants> = {
  colors: colors as IThemeColorsType & ModeThemeType,
  variants,
  fonts: fonts.fonts.family,
  ...borders,
  ...breakpoints,
  ...breakpointSizes,
  ...maxWidths,
  ...lineHeights,
  ...shadows,
  ...elevation,
  ...time,
  ...sizes,
  ...panelSizes,
  ...fontSizes,
  ...fontWeights,
  ...radii,
  ...opacity,
  ...space,
  ...spacing,
  ...table,
};

export default theme;
