import { useState } from 'react';

export const useExpandedItem = (): [number | null, (item: number | null) => void] => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  return [
    expandedItem,
    async (item: number | null) => {
      if (expandedItem === null) {
        setExpandedItem(item);

        return;
      }

      if (item === null) {
        setExpandedItem(null);

        return;
      }

      await setExpandedItem(null);
      setExpandedItem(item);
    },
  ];
};
