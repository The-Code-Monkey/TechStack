import { mountWithTheme } from '../../../test-tools';
import Table from '../index';

describe('<Table />', () => {
  it('should render correctly', () => {
    const { asFragment } = mountWithTheme(<Table columns={[]} data={[]} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
