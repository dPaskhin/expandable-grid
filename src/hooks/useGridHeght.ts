import { useMemo } from 'react';

import { getGridHeight } from '@src/utils/getGridHeight';

interface IParams {
  itemsCount: number;
  itemHeight: number;
  expandedItem: number | null;
  diffHeight: number;
  columnsCount: number;
}

export const useGridHeight = ({
  expandedItem,
  columnsCount,
  itemsCount,
  diffHeight,
  itemHeight,
}: IParams) => useMemo(() => (
  getGridHeight({
    itemsCount,
    itemHeight,
    expandedItem,
    diffHeight,
    columnsCount,
  })
), [itemHeight, expandedItem, columnsCount]);
