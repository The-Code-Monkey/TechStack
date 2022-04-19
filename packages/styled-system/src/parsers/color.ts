import { Property } from 'csstype';

import { system, SystemConfig } from '../core';
import { RequiredTheme, ResponsiveValue, Theme, ThemeValue } from '../types';
// transform: (scale, n) => getContrast(get(scale, n, n), scale as any),

export interface ColorProps<
  ThemeType extends Theme = RequiredTheme,
  TVal = ThemeValue<'colors', ThemeType>
> {
  backgroundColor?: ResponsiveValue<TVal, ThemeType>;
  bg?: ResponsiveValue<TVal, ThemeType>;
  color?: ResponsiveValue<TVal, ThemeType>;
  opacity?: ResponsiveValue<Property.Opacity, ThemeType>;
}

const config: SystemConfig<string> = {
  backgroundColor: {
    properties: ['color', 'backgroundColor'],
    scale: 'colors',
  },
  color: {
    property: 'color',
    scale: 'colors',
  },
  opacity: {
    property: 'opacity',
  },
};

config.bg = config.backgroundColor;

export const color = system(config);
