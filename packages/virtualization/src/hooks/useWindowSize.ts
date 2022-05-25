import nanobounce from 'nanobounce';
import { useMemo, useEffect, useState } from 'react';

import { BROWSER_PX_VALUE_LIMIT } from '../constants';

const useWindowSize = () => {
  const isClient = typeof window === 'object';
  const debounce = useMemo(() => nanobounce(32), []);

  function getSize() {
    return {
      width: isClient
        ? Math.min(BROWSER_PX_VALUE_LIMIT, window.innerWidth)
        : undefined,
      height: isClient
        ? Math.min(BROWSER_PX_VALUE_LIMIT, window.innerHeight)
        : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      if (getSize() === windowSize) {
        return;
      }

      debounce(() => setWindowSize(getSize()));
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
