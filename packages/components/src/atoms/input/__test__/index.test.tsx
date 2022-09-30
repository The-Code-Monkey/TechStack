import { mountWithTheme } from '../../../test-tools';
import Input from '../index';

describe('<Input />', () => {
  it('renders correctly', () => {
    const { asFragment } = mountWithTheme(
      <Input name='test' placeholder='Placeholder' />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
