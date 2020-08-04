import { useState } from 'react';

import { useWindowResizeEffect } from '@src/hooks/useWindowResizeEffect';

export const useWindowWidth = (isAdaptive: boolean) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useWindowResizeEffect(() => {
    if (!isAdaptive) {
      return;
    }

    setWindowWidth(window.innerWidth);
  }, 50);

  return windowWidth;
};
