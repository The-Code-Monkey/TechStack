import { Meta } from '@storybook/react';

import Text from './Text';

export default {
  title: 'Components / Primal / Text',
  component: Text,
} satisfies Meta<typeof Text>;

export const BasicString = {
  args: {
    children: 'This is a string',
  },
};

export const TranlationString = {
  args: {
    children: 'common:translated',
  },
};

export const TranlationStringValues = {
  args: {
    children: 'common:translatedValues',
    values: { val1: 'test', val2: 'works' },
  },
};
