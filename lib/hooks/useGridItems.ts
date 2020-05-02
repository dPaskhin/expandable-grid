import { useEffect, useMemo, useState } from 'react';

import { modifyItems } from '@lib/utils/modifierItems';
import { IItem } from '@lib/interfaces/IItem';
import { getInitialItems } from '@lib/utils/functions';

interface IParams {
  itemsCount: number;
  columnsCount: number;
  expandedItem: number | null;
}

export const useGridItems = ({
  itemsCount,
  columnsCount,
  expandedItem,
}: IParams): IItem[] => {
  const initialItems: IItem[] = useMemo(() => {
    if (!itemsCount) {
      throw Error('You should pass children items');
    }

    return getInitialItems(itemsCount, columnsCount);
  }, [itemsCount]);

  const [items, setItems] = useState<IItem[]>(initialItems);

  useEffect(() => {
    if (expandedItem === null) {
      setItems(initialItems);

      return;
    }

    setItems(items => modifyItems(items, expandedItem, columnsCount));
  }, [expandedItem, columnsCount]);

  return items;
};
