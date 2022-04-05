import spacing from "./dist/spacing";
import panelSizes from "./dist/panelSizes";
import sizes from "./dist/sizes";
import core from "./dist/core";
import intents from "./dist/intents";
import fonts from "./dist/fonts";
import borders from "./dist/borders";
import breakpointSizes from "./dist/breakpointSizes";
import maxWidths from "./dist/maxWidths";
import lineHeights from "./dist/lineHeights";
import shadows from "./dist/shadows";
import elevation from "./dist/elevation";
import time from "./dist/time";
import fontSizes from "./dist/fontSizes";
import fontWeights from "./dist/fontWeights";
import radii from "./dist/radii";
import opacity from "./dist/opacity";
import space from "./dist/space";
import breakpoints from "./dist/breakpoints";
import neutrals from "./dist/neutrals";
import colors from "./dist/light-mode";

export type IntentInfoType = typeof intents.intents.info.light;
export type DangerInfoType = typeof intents.intents.danger.light;
export type WarningInfoType = typeof intents.intents.warning.light;
export type SuccessInfoType = typeof intents.intents.success.light;
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
  info: IntentInfoType;
  success: SuccessInfoType;
  warning: WarningInfoType;
  danger: DangerInfoType;
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
