import { useMemo } from 'react';

import { IDimensions } from '@lib/interfaces/IDimensions';
import { IAdaptiveDimensions } from '@lib/interfaces/IAdaptiveDimensions';
import { getCurrentDimensions } from '@lib/utils/getCurrentDimensions';
import { initialDimensions } from '@lib/utils/initialDimensions';

export const useDimensions = (
  windowWidth: number,
  dimensions?: IDimensions,
  adaptiveDimensions?: IAdaptiveDimensions,
): Required<IDimensions> => useMemo(() => {
  if (!adaptiveDimensions) {
    return dimensions
      ? {
        ...initialDimensions,
        ...dimensions,
      } : {
        ...initialDimensions,
      };
  }

  const currentDimensions = getCurrentDimensions(adaptiveDimensions, windowWidth);

  return {
    ...initialDimensions,
    ...currentDimensions,
  };
}, [windowWidth, adaptiveDimensions]);
