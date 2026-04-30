import borders from './dist/borders';
import breakpoints from './dist/breakpoints';
import breakpointSizes from './dist/breakpointSizes';
import core from './dist/core';
import elevation from './dist/elevation';
import fonts from './dist/fonts';
import fontSizes from './dist/fontSizes';
import fontWeights from './dist/fontWeights';
import intents from './dist/intents';
import colors from './dist/light-mode';
import lineHeights from './dist/lineHeights';
import maxWidths from './dist/maxWidths';
import neutrals from './dist/neutrals';
import opacity from './dist/opacity';
import panelSizes from './dist/panelSizes';
import radii from './dist/radii';
import shadows from './dist/shadows';
import sizes from './dist/sizes';
import space from './dist/space';
import spacing from './dist/spacing';
import time from './dist/time';

export type InfoType = typeof intents.intents.info.light;
export type ErrorType = typeof intents.intents.error.light;
export type WarningType = typeof intents.intents.warning.light;
export type SuccessType = typeof intents.intents.success.light;
export type FontsType = typeof fonts.fonts.family;
export type BordersType = typeof borders.borders;
export type BreakpointSizesType = typeof breakpointSizes.breakpointSizes;
export type MaxWidthsType = typeof maxWidths.maxWidths;
export type LineHeightsType = typeof lineHeights.lineHeights;
export type ShadowsType = typeof shadows.shadows;
export type ZIndicesType = typeof elevation.zIndices;
export type TransitionType = typeof time.time.transition;
export type DelayType = typeof time.time.delay;
export type DurationType = typeof time.time.duration;
export type FontSizesType = typeof fontSizes.fontSizes;
export type FontWeightsType = typeof fontWeights.fontWeights;
export type RadiiType = typeof radii.radii;
export type OpacityType = typeof opacity.opacity;
export type SpaceType = typeof space.space;
export type CommonType = typeof core.common;
export type SizesType = typeof sizes.sizes;
export type SpacingType = keyof typeof spacing.spacing;
export type PanelWidthType = keyof typeof panelSizes.panelSizes.width;
export type PanelHeightType = keyof typeof panelSizes.panelSizes.height;
export type BreakpointsType = typeof breakpoints.breakpoints;
export type NeutralsType = typeof neutrals.neutrals.light;
export type ColorPrimaryType = typeof colors.primary;
export type HighlightsType = typeof colors.highlights;

export interface PanelSizes {
  width: typeof panelSizes.panelSizes.width;
  height: typeof panelSizes.panelSizes.height;
}

export interface Time {
  transition: TransitionType;
  delay: DelayType;
  duration: DurationType;
}

export interface Intents {
  info: InfoType;
  success: SuccessType;
  warning: WarningType;
  error: ErrorType;
}

export interface Colors {
  common: CommonType;
  intents: Intents;
  neutrals: NeutralsType;
  primary: ColorPrimaryType;
  highlights: HighlightsType;
  highlight: string;
  text: string;
}

export interface ThemeInterface {
  colors: Colors;
  fonts: FontsType;
  borders: BordersType;
  breakpoints: BreakpointsType;
  breakpointSizes: BreakpointSizesType;
  maxWidths: MaxWidthsType;
  lineHeights: LineHeightsType;
  shadows: ShadowsType;
  zIndices: ZIndicesType;
  time: Time;
  sizes: SizesType;
  panelSizes: PanelSizes;
  fontSizes: FontSizesType;
  fontWeights: FontWeightsType;
  radii: RadiiType;
  opacity: OpacityType;
  space: SpaceType;
  spacing: SpacingType;
}
