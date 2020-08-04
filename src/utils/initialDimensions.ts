import { IDimensions } from '@src/interfaces/IDimensions';
import { DimensionsTypes } from '@src/enums/DimensionsTypes';

export const initialDimensions: Required<IDimensions> = {
  [DimensionsTypes.COLUMN_GAP]: 20,
  [DimensionsTypes.ITEM_HEIGHT]: 150,
  [DimensionsTypes.EXPANDED_ITEM_HEIGHT]: 350,
  [DimensionsTypes.ROW_GAP]: 20,
  [DimensionsTypes.COLUMNS_COUNT]: 3,
};
