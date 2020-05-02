import { ReactNode } from 'react';

export const getChildrenItem = (
  children: ReactNode,
  itemId: number,
) => (
  Array.isArray(children) ? children[itemId] : children
);
