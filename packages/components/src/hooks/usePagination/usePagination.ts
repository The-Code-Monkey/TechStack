import { useMemo, useState } from 'react';

export interface Props {
  initialPage?: number;
  maxPage?: number;
  onNext?: (page: number) => void;
  onPrev?: (page: number) => void;
}

const usePagination = ({
  initialPage = 0,
  maxPage = 99999,
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
    if (page === 0) return true;
    else if (page < 0) {
      setPage(0);
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
