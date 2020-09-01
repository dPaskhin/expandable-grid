import { useCallback } from 'react';

import { IItem } from '@src/interfaces/IItem';
import { getItemPosition } from '@src/utils/getItemPosition';
import { getGridItemPadding } from '@src/utils/getGridItemPadding';

interface IParams {
  rowGap: number;
  columnGap: number;
  columnsCount: number;
  expandedItemHeight: number;
  itemHeight: number;
  diffHeight: number;
  transitionDuration?: number;
}

export const useGridItemStylesGetter = ({
  columnGap,
  rowGap,
  diffHeight,
  itemHeight,
  expandedItemHeight,
  columnsCount,
  transitionDuration,
}: IParams) => (
  useCallback((item: IItem, isExpandedItem?: boolean) => ({
    ...getItemPosition({ item, itemHeight, diffHeight, columnsCount }),
    ...getGridItemPadding(rowGap, columnGap),
    ...(transitionDuration !== undefined ? { transitionDuration: `${transitionDuration}ms` } : {}),
    height: isExpandedItem ? expandedItemHeight : itemHeight,
  }), [diffHeight, rowGap, columnGap, columnsCount])
);
