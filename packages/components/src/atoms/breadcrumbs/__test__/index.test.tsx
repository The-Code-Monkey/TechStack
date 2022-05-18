import { mountWithTheme } from '../../../test-tools';
import Breadcrumbs from '../Breadcrumbs';

describe('<Breadcrumbs />', () => {
  it('should render correctly with url param', () => {
    const { asFragment } = mountWithTheme(
      <Breadcrumbs url='/test/test/help/dsdasd/' />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
