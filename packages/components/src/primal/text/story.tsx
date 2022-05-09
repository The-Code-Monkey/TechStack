import { ComponentMeta, ComponentStory } from '@storybook/react';

import Text from './Text';

export default {
  title: 'Components / Primal / Text',
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = args => <Text {...args} />;

export const BasicString = Template.bind({});

BasicString.args = {
  children: 'This is a string',
};

export const TranlationString = Template.bind({});

TranlationString.args = {
  children: 'common:translated',
};

export const TranlationStringValues = Template.bind({});

TranlationStringValues.args = {
  children: 'common:translatedValues',
  values: { val1: 'test', val2: 'works' },
};
