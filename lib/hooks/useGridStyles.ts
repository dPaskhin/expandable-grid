import { useMemo } from 'react';

import { getGridMargins } from '@lib/utils/getGridMargins';

interface IParams {
  gridHeight: number;
  transitionDuration: number;
  rowGap: number;
  columnGap: number;
}

export const useGridStyles = ({
  gridHeight,
  transitionDuration,
  rowGap,
  columnGap,
}: IParams) => (
  useMemo(() => ({
    ...getGridMargins(rowGap, columnGap),
    width: `calc(100% + ${columnGap}px)`,
    height: gridHeight,
    transitionDuration: `${transitionDuration}ms`,
  }), [rowGap, columnGap, gridHeight])
);
