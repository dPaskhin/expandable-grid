import { DimensionsTypes } from '@lib/enums/DimensionsTypes';

const tabLabels = {
  [DimensionsTypes.COLUMN_GAP]: 'column gap',
  [DimensionsTypes.COLUMNS_COUNT]: 'column count',
  [DimensionsTypes.EXPANDED_ITEM_HEIGHT]: 'expanded item height',
  [DimensionsTypes.ITEM_HEIGHT]: 'item height',
  [DimensionsTypes.ROW_GAP]: 'row gap',
};

export const getTabLabel = (tab: DimensionsTypes) => tabLabels[tab];
