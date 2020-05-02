import { useEffect } from 'react';

import { debounce } from '@lib/utils/debounce';

export const useWindowResizeEffect = <T>(onResize: () => void, deps: T[] = [], debounceTime = 100) => {
  useEffect(() => {
    const resizeHandler = debounce(onResize, debounceTime);

    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, [onResize, debounceTime, ...deps]);
};
