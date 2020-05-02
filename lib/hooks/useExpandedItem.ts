import { useEffect, useState } from 'react';

export const useExpandedItem = (
  externalExpandedItem: number | null,
): [number | null, (expandedItem: number | null) => void] => {
  const [expandedItem, setExpandedItem] = useState(externalExpandedItem);

  useEffect(() => {
    if (expandedItem === null) {
      setExpandedItem(externalExpandedItem);

      return;
    }

    if (externalExpandedItem === null) {
      setExpandedItem(null);

      return;
    }

    Promise
      .resolve(setExpandedItem(null))
      .then(() => setExpandedItem(externalExpandedItem));
  }, [externalExpandedItem]);

  return [expandedItem, setExpandedItem];
};
