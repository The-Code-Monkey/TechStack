import { mountWithTheme } from '../../../test-tools';
import Icon from '../index';

describe('<Icon />', () => {
  it('renders correctly', () => {
    const { asFragment } = mountWithTheme(<Icon name='github' />);
    expect(asFragment()).toMatchSnapshot();
  });
});
