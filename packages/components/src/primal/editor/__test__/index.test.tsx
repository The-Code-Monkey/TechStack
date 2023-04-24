import { mountWithTheme } from '../../../test-tools';
import { Editor } from '../Editor';

describe('<Box />', () => {
  it('renders children correctly', () => {
    const { asFragment } = mountWithTheme(<Editor />);
    expect(asFragment()).toMatchSnapshot();
  });
});
