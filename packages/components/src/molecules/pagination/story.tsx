import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Pagination } from './Pagination';

export default {
  title: 'Components / Molecules / Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = args => (
  <Pagination {...args} />
);

export const Default = Template.bind({});

export const WithMaxPage = Template.bind({});

WithMaxPage.args = {
  maxPage: 10,
};

export const WithNextPrevFn = Template.bind({});

WithNextPrevFn.args = {
  onPrev: () => window.alert('PREV PAGE'),
  onNext: () => window.alert('NEXT PAGE'),
};
