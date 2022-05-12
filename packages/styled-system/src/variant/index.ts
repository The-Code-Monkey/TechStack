import { get, createParser } from '../core';
import { css } from '../css';
import { CSSObject, Scale, Theme } from '../types';

interface Props {
  scale?: string;
  prop?: string;
  variants?: { [x: string]: object };
  key?: string;
}

export const variant = ({
  scale,
  prop = 'variant',
  variants = {},
  key,
}: Props) => {
  let sx: {
    (value: string | number, scale: Scale, props: { theme: Theme }): CSSObject;
    scale?: Scale | string;
    defaults?: object;
  };

  if (Object.keys(variants).length) {
    sx = (value: string | number, scale: Scale, props: { theme: Theme }) =>
      css(get(scale, value, null) as object)(props.theme);
  } else {
    sx = (value: string | number, scale: Scale) =>
      get(scale, value, null) as CSSObject;
  }
  sx.scale = scale || key;
  sx.defaults = variants;
  return createParser({
    [prop]: sx,
  });
};

export const ButtonVariants = variant({ key: 'buttons' });
export const TextVariants = variant({ key: 'text' });
export const IntentVariants = variant({ key: 'intents', prop: 'intent' });
