import { useCallback } from 'react';

import { IItem } from '@src/interfaces/IItem';
import { getItemPositionStyleObject } from '@src/utils/getItemPositionStyleObject';
import { getItemPaddingStyleObject } from '@src/utils/getItemPaddingStyleObject';
import { ITransitionDuration } from '@src/interfaces/ITransitionDuration';
import { getTransitionDurationStyleObject } from '@src/utils/getTransitionDurationStyleObject';
import { EntityTypes } from '@src/enums/EntityTypes';

interface IParams {
  rowGap: number;
  columnGap: number;
  columnsCount: number;
  expandedItemHeight: number;
  itemHeight: number;
  diffHeight: number;
  transitionDuration?: ITransitionDuration;
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
    ...getItemPositionStyleObject({ item, itemHeight, diffHeight, columnsCount }),
    ...getItemPaddingStyleObject(rowGap, columnGap),
    ...getTransitionDurationStyleObject({ entityType: EntityTypes.ITEM, transitionDuration }),
    height: isExpandedItem ? expandedItemHeight : itemHeight,
  }), [diffHeight, rowGap, columnGap, columnsCount])
);
