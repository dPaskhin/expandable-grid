import { initialDimensions } from '@lib/utils/initialDimensions';
import { getAdaptiveValue } from '@lib/utils/getAdaptiveValue';
import { IDimensions } from '@lib/interfaces/IDimensions';
import { IAdaptiveDimensions } from '@lib/interfaces/IAdaptiveDimensions';
import { isDimensionType } from '@lib/typeGuards/isDimensionType';

export const getCurrentDimensions = (
  adaptiveDimensions: IAdaptiveDimensions,
  windowWidth: number,
): IDimensions => (
  Object
    .keys(adaptiveDimensions)
    .filter(isDimensionType)
    .reduce<IDimensions>((dimensions, dimension) => {
      const adaptiveValues = adaptiveDimensions[dimension];

      if (adaptiveValues?.length) {
        return {
          ...dimensions,
          [dimension]: getAdaptiveValue(windowWidth, adaptiveValues),
        };
      }

      return dimensions;
    }, initialDimensions)
);
