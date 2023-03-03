import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '../button';

import { Card } from './Card';

import { CardAction, CardContent } from './index';

export default {
  title: 'Components / Atoms / Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = args => <Card {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: (
    <>
      <CardContent>
        <p>Word of the day</p>
        <p>be•nev•o•lent</p>
        <p>adjective</p>
        <p>well meaning and kindly. a benevolent smile</p>
      </CardContent>
      <CardAction>
        <Button size='sm'>Test Button</Button>
      </CardAction>
    </>
  ),
};
