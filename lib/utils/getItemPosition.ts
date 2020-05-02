import { IItemPosition } from '@lib/interfaces/IItemPosition';
import { IItem } from '@lib/interfaces/IItem';

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
  const top = item.underExpanded
    ? diffHeight + (item.coord.y * itemHeight)
    : item.coord.y * itemHeight;

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
