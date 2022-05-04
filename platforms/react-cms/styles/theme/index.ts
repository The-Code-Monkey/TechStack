import {
  ITheme,
  IThemeColorsType,
  ModeThemeType,
} from '@aw-web-design/components';

import colors from './colors';
import borders from './dist/borders';
import breakpoints from './dist/breakpoints';
import breakpointSizes from './dist/breakpointSizes';
import defaultStyles from './dist/defaultStyles';
import elevation from './dist/elevation';
import fonts from './dist/fonts';
import fontSizes from './dist/fontSizes';
import fontWeights from './dist/fontWeights';
import lineHeights from './dist/lineHeights';
import maxWidths from './dist/maxWidths';
import opacity from './dist/opacity';
import panelSizes from './dist/panelSizes';
import radii from './dist/radii';
import shadows from './dist/shadows';
import sizes from './dist/sizes';
import space from './dist/space';
import spacing from './dist/spacing';
import time from './dist/time';
import variants from './variants';

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
  ...defaultStyles,
};

export default theme;
