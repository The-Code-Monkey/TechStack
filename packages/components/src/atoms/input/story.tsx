import Input from './index';

export default {
  title: 'Components / Atoms / Input',
  component: Input,
};

export const story = () => <Input name='default' />;

export const Number = () => <Input name='number' type='number' />;

export const Time = () => <Input name='time' type='time' />;

export const Tel = () => <Input name='tel' type='tel' />;

export const Date = () => <Input name='date' type='date' value="2022-12-17 11:19" />;

export const Checkbox = () => (
  <Input name='checkbox' type='checkbox' value='checked' />
);
