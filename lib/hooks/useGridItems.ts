import { useEffect, useMemo, useState } from 'react';

import { modifyItems } from '@lib/utils/modifierItems';
import { IItem } from '@lib/interfaces/IItem';
import { getInitialItems } from '@lib/utils/getInitialItems';

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
  const initialItems = useMemo(() => (
    getInitialItems(itemsCount, columnsCount)
  ), [itemsCount, columnsCount]);

  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    if (expandedItem === null) {
      setItems(initialItems);

      return;
    }

    setItems(items => modifyItems(items, expandedItem, columnsCount));
  }, [expandedItem, columnsCount]);

  return items;
};
