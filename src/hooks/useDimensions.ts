import { useMemo } from 'react';

import { IDimensions } from '@src/interfaces/IDimensions';
import { IAdaptiveDimensions } from '@src/interfaces/IAdaptiveDimensions';
import { getCurrentDimensions } from '@src/utils/getCurrentDimensions';
import { initialDimensions } from '@src/utils/initialDimensions';

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
