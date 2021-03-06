import { background } from '../background';

describe('background', () => {
  it('should return background styles', () => {
    const style = background({
      background: 'url(kitten.gif)',
      backgroundImage: 'linear-gradient(45deg, black, transparent)',
      backgroundClip: 'text',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      backgroundAttachment: 'fixed',
    });

    expect(style).toEqual({
      background: 'url(kitten.gif)',
      backgroundImage: 'linear-gradient(45deg, black, transparent)',
      backgroundClip: 'text',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      backgroundAttachment: 'fixed',
    });
  });

  it('should return shorthand background styles', () => {
    const style = background({
      background: 'url(kitten.gif)',
      bgImage: 'linear-gradient(45deg, black, transparent)',
      bgClip: 'text',
      bgSize: 'cover',
      bgPosition: 'center',
      bgRepeat: 'repeat',
      bgAttachment: 'fixed',
    });

    expect(style).toEqual({
      background: 'url(kitten.gif)',
      backgroundImage: 'linear-gradient(45deg, black, transparent)',
      backgroundClip: 'text',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      backgroundAttachment: 'fixed',
    });
  });
});
