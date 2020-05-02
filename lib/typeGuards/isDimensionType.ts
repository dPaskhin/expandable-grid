import { DimensionsTypes } from '@lib/enums/DimensionsTypes';

export const isDimensionType = (dimension: string): dimension is DimensionsTypes => (
  Object.keys(DimensionsTypes).some(dimensionType => dimensionType === dimension)
);
