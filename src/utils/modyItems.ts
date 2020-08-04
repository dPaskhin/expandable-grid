import { IItem } from '@src/interfaces/IItem';
import { getItemCoord } from '@src/utils/getItemCoord';

const getItemEqualByXCoord = (
  item: IItem,
  expandedItemX: number,
  columnsCount: number,
) => ({
  y: expandedItemX === 0 ? item.coord.y : item.coord.y + 1,
  x: expandedItemX === 0 ? columnsCount - 1 : expandedItemX - 1,
});

const getItemEqualByYCoord = (
  item: IItem,
  expandedItemX: number,
) => {
  if (expandedItemX > item.coord.x) {
    return {
      y: item.coord.y + 1,
      x: item.coord.x,
    };
  }

  return {
    y: item.coord.y + 1,
    x: item.coord.x - 1,
  };
};

const getItemBelowByYCoord = (
  item: IItem,
  expandedItemX: number,
  columnsCount: number,
) => {
  if (expandedItemX > item.coord.x) {
    return {
      y: item.coord.x === 0 ? item.coord.y : item.coord.y + 1,
      x: item.coord.x === 0 ? columnsCount - 1 : item.coord.x - 1,
    };
  }

  return {
    y: item.coord.y + 1,
    x: item.coord.x - 1,
  };
};

export const modifyItems = (
  items: IItem[],
  expandedItem: number,
  columnsCount: number,
): IItem[] => {
  const {
    x: expandedItemX,
    y: expandedItemY,
  } = getItemCoord({ itemId: expandedItem, columnsCount });

  return items.map(item => {
    if (expandedItemY > item.coord.y) {
      return item;
    }

    if (item.coord.x === expandedItemX && item.coord.y === expandedItemY) {
      return {
        ...item,
        expanded: true,
      };
    }

    const coord = (expandedItemX === item.coord.x) && getItemEqualByXCoord(item, expandedItemX, columnsCount)
      || (expandedItemY === item.coord.y) && getItemEqualByYCoord(item, expandedItemX)
      || (expandedItemY < item.coord.y) && getItemBelowByYCoord(item, expandedItemX, columnsCount)
      || item.coord;

    return {
      ...item,
      coord,
      underExpanded: true,
    };
  });
};
