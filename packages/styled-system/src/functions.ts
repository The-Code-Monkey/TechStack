import { get } from './core';

type ModesType = {
  light: {
    text: string;
  };
  dark: {
    text: string;
  };
  [x: string]: {
    text: string;
  };
};

export type ColorsType = {
  modes: ModesType;
};

export const getContrast = (hexstring: string, colors?: ColorsType): string => {
  // eslint-disable-next-line prefer-const
  let r, g, b;

  // Check the format of the color, HEX or RGB?
  if (hexstring.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    const color = hexstring.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    const color = +(
      '0x' + hexstring.slice(1).replace(hexstring.length < 5 && /./g, '$&$&')
    );

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // return colors.modes.light.text;

  // Using the HSP value, determine whether the color is light or dark
  const mode = hsp > 127.5 ? 'light' : 'dark';

  if (!colors?.modes) {
    return mode === 'light' ? '#000' : '#FFF';
  }
  return colors.modes[mode].text;
};

export const contrastTransform = (scale, n) => {
  return [
    getContrast(get(scale, n, n) as string, scale as ColorsType),
    get(scale, n, n),
  ];
};
