import { mountWithTheme } from '../../../test-tools';
import Input from '../index';

describe('<Input />', () => {
  it('renders correctly', () => {
    const { asFragment } = mountWithTheme(
      <Input name='test' placeholder='Placeholder' />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('textarea renders correctly', () => {
    const { asFragment } = mountWithTheme(
      <Input name='test' placeholder='Placeholder' type='textarea' />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('email renders correctly', () => {
    const { asFragment } = mountWithTheme(
      <Input name='test' placeholder='Placeholder' type='email' />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const { asFragment } = mountWithTheme(
      <Input name='test' placeholder='Placeholder' type='password' />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('checkbox renders correctly', () => {
    const { asFragment } = mountWithTheme(
      <Input name='test' type='checkbox' onChange={(a) => console.log(typeof a === "boolean")} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
