import { createParser, get } from '../core';
import { css } from '../css';

interface Props {
  scale?: string;
  prop?: string;
  variants?: { [x: string]: object };
  key?: string;
}

// export const variant = ({ scale, prop = 'variant', variants }: Props) => {
//   const sx: {
//     (value: string | number, scale: Scale, props: { theme: Theme }): CSSObject;
//     scale?: Scale | string;
//     defaults?: object;
//   } = (value: string | number, scale: Scale, props) =>
//     css(get(scale, value, null))(props.theme);
//   sx.scale = `variants.${scale}`;
//   sx.defaults = {};
//   return createParser({
//     [prop]: sx,
//   });
// };

export const variant = ({ prop = 'variant', key }: Props) => {
  const sx = (value, scale, props) => css(get(scale, value, null))(props.theme);
  sx.scale = key ? `variants.${key}` : `variants`;
  sx.defaults = {};
  return createParser({
    [prop]: sx,
  });
};

export const ButtonVariants = variant({ key: 'buttons' });
export const TextVariants = variant({ key: 'text' });
export const IntentVariants = variant({ key: 'intents', prop: 'intent' });
