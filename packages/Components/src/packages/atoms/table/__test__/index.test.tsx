import toJson from 'enzyme-to-json';

import Table from '../';
import { mountWithTheme } from '../../../test-tools';

describe('<Table />', () => {
  it('should render correctly', () => {
    const wrapper = mountWithTheme(Table);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
