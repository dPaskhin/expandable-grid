import { useEffect } from 'react';

import { useDebounce } from '@lib/hooks/useDebounce';

export const useWindowResizeEffect = <T>(
  onResize: () => void,
  debounceTime = 100,
  deps: T[] = [],
) => {
  const resizeHandler = useDebounce({ func: onResize, wait: debounceTime });

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, [onResize, ...deps]);
};
