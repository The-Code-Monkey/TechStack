import { Box } from '../../primal';
import styled from '../../workarounds/styled-components';

export const StyledCarousel = styled(Box)`
  .carousel-root,
  .carousel-root > div,
  .slider-wrapper,
  .slider-wrapper > ul {
    height: 100%;
  }

  .carousel-root {
    ul li {
      padding: 0;
    }
  }
`;
