import { initialDimensions } from '@src/utils/initialDimensions';
import { getAdaptiveValue } from '@src/utils/getAdaptiveValue';
import { IDimensions } from '@src/interfaces/IDimensions';
import { IAdaptiveDimensions } from '@src/interfaces/IAdaptiveDimensions';
import { isDimensionType } from '@src/typeGuards/isDimensionType';

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
