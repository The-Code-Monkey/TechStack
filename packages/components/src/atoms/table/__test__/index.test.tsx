import { mountWithTheme } from '../../../test-tools';
import { Table } from '../index';
import { expect, describe, it } from "bun:test";

describe('<Table />', () => {
  it('should render correctly', () => {
    const { asFragment } = mountWithTheme(<Table columns={[]} data={[]} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
