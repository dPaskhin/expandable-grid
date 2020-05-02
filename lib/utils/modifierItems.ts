import { IItem } from '@lib/interfaces/IItem';
import { initialItem } from '@lib/utils/initialItem';
import { getItemX, getItemY } from '@lib/utils/getItemCoord';

type modifyItemsType = (
  items: IItem[],
  expandedItem: number,
  columnsCount: number,
) => IItem[]

export const modifyItems: modifyItemsType = (
  items,
  expandedItem,
  columnsCount,
) => {
  const expandedItemX = getItemX({ itemId: expandedItem, columnsCount });
  const expandedItemY = getItemY({ itemId: expandedItem, columnsCount });

  for (let i = 0; i <= columnsCount; i++) {
    if (expandedItemX !== i) {
      continue;
    }

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

      if (expandedItemX === item.coord.x) {
        return {
          ...item,
          coord: {
            y: expandedItemX === 0 ? item.coord.y : item.coord.y + 1,
            x: expandedItemX === 0 ? columnsCount - 1 : expandedItemX - 1,
          },
          underExpanded: true,
        };
      }

      if (expandedItemY === item.coord.y) {
        if (expandedItemX > item.coord.x) {
          return {
            ...item,
            coord: {
              y: item.coord.y + 1,
              x: item.coord.x,
            },
            underExpanded: true,
          };
        } else {
          return {
            ...item,
            coord: {
              y: item.coord.y + 1,
              x: item.coord.x - 1,
            },
            underExpanded: true,
          };
        }
      }

      if (expandedItemY < item.coord.y) {
        if (expandedItemX > item.coord.x) {
          return {
            ...item,
            coord: {
              y: item.coord.x === 0 ? item.coord.y : item.coord.y + 1,
              x: item.coord.x === 0 ? columnsCount - 1 : item.coord.x - 1,
            },
            underExpanded: true,
          };
        } else {
          return {
            ...item,
            coord: {
              y: item.coord.y + 1,
              x: item.coord.x - 1,
            },
            underExpanded: true,
          };
        }
      }

      return item;
    });
  }

  return [initialItem];
};
