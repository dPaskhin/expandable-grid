import { useMemo } from 'react';

import { getGridHeight } from '@src/utils/getGridHeight';

interface IParams {
  itemsCount: number;
  itemHeight: number;
  expandedItem: number | null;
  diffHeight: number;
  columnsCount: number;
  rowGap: number;
}

export const useGridHeight = ({
  expandedItem,
  columnsCount,
  itemsCount,
  diffHeight,
  itemHeight,
  rowGap
}: IParams) => useMemo(() => (
  getGridHeight({
    itemsCount,
    itemHeight,
    expandedItem,
    diffHeight,
    columnsCount,
    rowGap
  })
), [itemHeight, expandedItem, columnsCount]);
