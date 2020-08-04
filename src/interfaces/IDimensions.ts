import { DimensionsTypes } from '@src/enums/DimensionsTypes';

export type IDimensions = {
  [K in DimensionsTypes]?: number;
}
