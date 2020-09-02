import { useMemo } from 'react';

import { getGridMarginsStyleObject } from '@src/utils/getGridMarginsStyleObject';
import { ITransitionDuration } from '@src/interfaces/ITransitionDuration';
import { getTransitionDurationStyleObject } from '@src/utils/getTransitionDurationStyleObject';
import { EntityTypes } from '@src/enums/EntityTypes';

interface IParams {
  gridHeight: number;
  rowGap: number;
  columnGap: number;
  transitionDuration?: ITransitionDuration;
}

export const useGridStyles = ({
  gridHeight,
  transitionDuration,
  rowGap,
  columnGap,
}: IParams) => (
  useMemo(() => ({
    ...getGridMarginsStyleObject(rowGap, columnGap),
    ...getTransitionDurationStyleObject({ entityType: EntityTypes.GRID, transitionDuration }),
    width: `calc(100% + ${columnGap}px)`,
    height: gridHeight,
  }), [rowGap, columnGap, gridHeight])
);
