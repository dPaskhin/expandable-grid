import { useEffect } from 'react';

import { useDebounce } from '@lib/hooks/useDebounce';

export const useWindowResizeEffect = <T>(
  onResize: () => void,
  deps: T[] = [],
) => {
  const resizeHandler = useDebounce({ func: onResize });

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, [onResize, ...deps]);
};
