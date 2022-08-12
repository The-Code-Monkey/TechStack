import { useMemo, useState } from 'react';

export const MAX_PAGE_FALLBACK = 9999;

export interface Props {
  initialPage?: number;
  maxPage?: number;
  onNext?: (page: number) => void;
  onPrev?: (page: number) => void;
}

const usePagination = ({
  initialPage = 1,
  maxPage = MAX_PAGE_FALLBACK,
  onNext,
  onPrev,
}: Props) => {
  const [page, setPage] = useState(initialPage);

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    if (onNext) {
      onNext(newPage);
    }
  };
  const prevPage = () => {
    const newPage = page - 1;
    setPage(newPage);
    if (onPrev) {
      onPrev(newPage);
    }
  };

  const prevDisabled = useMemo(() => {
    if (page === 1) return true;
    else if (page < 1) {
      setPage(1);
    }
  }, [page]);

  const nextDisabled = useMemo(() => {
    if (page === maxPage) return true;
    else if (page > maxPage) {
      setPage(maxPage);
    }
  }, [page]);

  return { page, setPage, nextPage, prevPage, prevDisabled, nextDisabled };
};

export default usePagination;
