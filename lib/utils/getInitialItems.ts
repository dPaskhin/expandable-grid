import { IItem } from '@lib/interfaces/IItem';
import { getItemCoord } from '@lib/utils/getItemCoord';

export const getInitialItems = (
  itemsCount: number,
  columnsCount: number,
): IItem[] => (
  [...new Array(itemsCount)].map((item, index) => ({
    id: index,
    coord: getItemCoord({
      itemId: index,
      columnsCount,
    }),
  }))
);
