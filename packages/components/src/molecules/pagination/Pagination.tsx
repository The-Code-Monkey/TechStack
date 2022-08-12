import { Button, ButtonProps } from '../../atoms';
import {
  usePagination,
  UsePaginationProps,
  MAX_PAGE_FALLBACK,
} from '../../hooks';
import { Box, BoxProps } from '../../primal';

export interface Props extends UsePaginationProps, BoxProps {
  onPage?: (e: MouseEvent, page: number) => void;
  pageArray?: Array<number>;
  buttonStyle?: ButtonProps;
}

const PAGE_ARRAY_FALLBACK = [
  -1000, -100, -10, -3, -2, -1, 0, 1, 2, 3, 10, 100, 1000,
];

export const Pagination = ({
  initialPage,
  maxPage,
  onPrev,
  onNext,
  onPage,
  pageArray = PAGE_ARRAY_FALLBACK,
  as,
  buttonStyle = {},
  ...rest
}: Props) => {
  const { page, setPage, nextPage, prevPage, prevDisabled, nextDisabled } =
    usePagination({ initialPage, maxPage, onNext, onPrev });

  const maxPageOrFallback = maxPage ?? MAX_PAGE_FALLBACK;

  if (
    !buttonStyle.width &&
    !buttonStyle.height &&
    !buttonStyle.w &&
    !buttonStyle.h &&
    !buttonStyle.size
  )
    buttonStyle.size = 10;

  const renderNumberButtons = (numbers: Array<number>) => {
    return numbers.map(pageNum => {
      if (pageNum < 0) {
        return (
          <>
            {page + pageNum >= 1 && (
              <Button onClick={() => setPage(page + pageNum)} {...buttonStyle}>
                {page + pageNum}
              </Button>
            )}
          </>
        );
      } else if (pageNum !== 0) {
        return (
          <>
            {page + pageNum <= maxPageOrFallback && (
              <Button onClick={() => setPage(page + pageNum)} {...buttonStyle}>
                {page + pageNum}
              </Button>
            )}
          </>
        );
      } else {
        return (
          <Button variant='primary' {...buttonStyle}>
            {page}
          </Button>
        );
      }
    });
  };

  return (
    <Box as='nav' d='flex' flex='1' flexDirection='row' gap={3} {...rest}>
      {page > 2 && (
        <Button
          iconName='chevronsleft'
          onClick={() => setPage(1)}
          {...buttonStyle}
        ></Button>
      )}
      <Button
        iconName='chevronleft'
        onClick={prevPage}
        disabled={prevDisabled}
        {...buttonStyle}
      />
      <>{renderNumberButtons(pageArray)}</>
      <Button
        iconName='chevronright'
        onClick={nextPage}
        disabled={nextDisabled}
        {...buttonStyle}
      />
      {page <= maxPageOrFallback && (
        <Button
          iconName='chevronsright'
          onClick={() => setPage(maxPageOrFallback)}
          {...buttonStyle}
        />
      )}
    </Box>
  );
};

export default Pagination;
