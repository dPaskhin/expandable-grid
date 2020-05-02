import { ReactNode } from 'react';

export const isChildrenPassed = (children: ReactNode) => {
  if (!children) {
    return false;
  }

  return !(Array.isArray(children) && !children.length);
};
