import { DimensionsTypes } from '@src/enums/DimensionsTypes';

export const isDimensionType = (dimension: string): dimension is DimensionsTypes => (
  Object.values(DimensionsTypes).some(dimensionType => dimensionType === dimension)
);
