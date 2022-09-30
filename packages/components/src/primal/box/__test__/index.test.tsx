import { mountWithTheme } from '../../../test-tools';
import { Box } from '../Box';

describe('<Box />', () => {
  it('renders children correctly', () => {
    const { asFragment } = mountWithTheme(<Box>This is some children</Box>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as a form correctly', () => {
    const { asFragment } = mountWithTheme(
      <Box<'form'> as='form'>This is some children</Box>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
