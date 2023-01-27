// import Textfit from '@techstack/react-textfit';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Box } from '../../primal';

import { StyledCarousel } from './styled';

export interface Props {
  titles?: Array<string>;
  images: Array<string>;
  singleTitle: boolean;
  height?: number | string;
  blur: string;
  shadow: string;
  showThumbs: boolean;
  showIndicators: boolean;
  showArrows: boolean;
  showStatus: boolean;
  autoPlay: boolean;
}

const Carousel = ({
  images,
  titles,
  singleTitle = false,
  height = '19',
  blur = 'rgba(0, 0, 0, 0.1)',
  shadow = '4px 4px 5px rgb(0 0 0 / 62%)',
  autoPlay = true,
  showIndicators = false,
  showArrows = false,
  showStatus = false,
  showThumbs = false,
}: Props) => {
  return (
    <StyledCarousel pos='relative' w='full' h={height}>
      {titles && singleTitle && (
        <>
          <Box
            pos='absolute'
            zIndex='1'
            mb='2'
            mt='0'
            color='white'
            textShadow={shadow}
            w='full'
            h='full'
            pl='4'
            pt='13'
          >
            {titles.map(title => (
              <>
                {/*<Textfit max={36} mode="single">*/}
                {title}
                {/*</Textfit>*/}
              </>
            ))}
          </Box>
          <Box
            bg={blur}
            h={'full'}
            w={'full'}
            pos={'absolute'}
            top={0}
            left={0}
          >
            &nbsp;
          </Box>
        </>
      )}

      <ReactCarousel
        autoPlay={autoPlay}
        showThumbs={showThumbs}
        showIndicators={showIndicators}
        showArrows={showArrows}
        showStatus={showStatus}
        infiniteLoop
        animationHandler='fade'
        transitionTime={2000}
      >
        {images.map(img => (
          <div key={img}>
            <img src={img} />
          </div>
        ))}
      </ReactCarousel>
    </StyledCarousel>
  );
};

export default Carousel;
