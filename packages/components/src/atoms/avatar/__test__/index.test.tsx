import { mountWithTheme } from '../../../test-tools';
import { Avatar } from '../Avatar';

describe('<Avatar />', () => {
  it('renders text correctly', () => {
    const { asFragment } = mountWithTheme(<Avatar>Test Text</Avatar>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders icon correctly', () => {
    const { asFragment } = mountWithTheme(<Avatar iconName='github' />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders img correctly', () => {
    const { asFragment } = mountWithTheme(
      <Avatar url='https://picsum.photos/id/237/200' />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
