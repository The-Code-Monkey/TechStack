import { color } from '../color';

describe('color', () => {
  it('should return colors styles', () => {
    const style = color({
      color: 'gold',
      bg: 'tomato',
    });

    expect(style).toEqual({
      color: 'tomato',
      backgroundColor: 'tomato',
    });
  });
});
