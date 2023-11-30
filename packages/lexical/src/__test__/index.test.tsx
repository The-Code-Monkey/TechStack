import Editor from '../';
import { render } from '@testing-library/react';

describe('<Editor />', () => {
    it('renders text correctly', () => {
        const {asFragment} = render(<Editor name={'test'} value={''} onChange={jest.fn()}/>);

        expect(asFragment()).toMatchSnapshot();
    })
})