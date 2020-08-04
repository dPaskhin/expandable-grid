import { IItemPosition } from '@src/interfaces/IItemPosition';
import { IItem } from '@src/interfaces/IItem';

interface IParams {
  item: IItem;
  itemHeight: number;
  diffHeight: number;
  columnsCount: number;
}

export const getItemPosition = ({
  item,
  itemHeight,
  diffHeight,
  columnsCount,
}: IParams): IItemPosition => {
  const top = item.coord.y * itemHeight + (item.underExpanded ? diffHeight : 0);

  if (item.expanded) {
    return {
      left: 0,
      right: 0,
      top: top,
    };
  }

  return {
    left: `${item.coord.x * (100 / columnsCount)}%`,
    right: `${Math.abs(item.coord.x - (columnsCount - 1)) * (100 / columnsCount)}%`,
    top: top,
  };
};
