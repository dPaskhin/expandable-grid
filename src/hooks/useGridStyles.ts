import { useMemo } from 'react';

import { getGridMargins } from '@src/utils/getGridMargins';

interface IParams {
  gridHeight: number;
  rowGap: number;
  columnGap: number;
  transitionDuration?: number;
}

export const useGridStyles = ({
  gridHeight,
  transitionDuration,
  rowGap,
  columnGap,
}: IParams) => (
  useMemo(() => ({
    ...getGridMargins(rowGap, columnGap),
    ...(transitionDuration !== undefined ? { transitionDuration: `${transitionDuration}ms` } : {}),
    width: `calc(100% + ${columnGap}px)`,
    height: gridHeight,
  }), [rowGap, columnGap, gridHeight])
);
