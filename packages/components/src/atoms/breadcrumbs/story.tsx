import { ComponentMeta, ComponentStory } from '@storybook/react';

import Breadcrumbs from './Breadcrumbs';

export default {
  title: 'Components / Atoms / Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = args => (
  <Breadcrumbs homeText='Home' {...args} />
);

export const FromURL = Template.bind({});

FromURL.args = {};

export const FromPropURL = Template.bind({});

FromPropURL.args = {
  url: 'dir/test/another/url/',
};

export const FromPropBreadcrumbs = Template.bind({});

FromPropBreadcrumbs.args = {
  breadcrumbs: ['dir', 'test', 'another', 'url'],
};
