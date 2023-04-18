import { Meta } from '@storybook/react';

import Button from '../button';

import { Card } from './Card';

import { CardAction, CardContent } from './index';

export default {
  title: 'Components / Atoms / Card',
  component: Card,
} satisfies Meta<typeof Card>;

export const Basic = {
  args: {
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
  },
};
