import { IDimensions } from '@lib/interfaces/IDimensions';
import { DimensionsTypes } from '@lib/enums/DimensionsTypes';

export const initialDimensions: Required<IDimensions> = {
  [DimensionsTypes.COLUMN_GAP]: 20,
  [DimensionsTypes.ITEM_HEIGHT]: 150,
  [DimensionsTypes.EXPANDED_HEIGHT]: 350,
  [DimensionsTypes.ROW_GAP]: 20,
  [DimensionsTypes.COLUMNS_COUNT]: 3,
};
