import { GridClassnames } from '@lib/enums/GridClassnames';

interface IParams {
  isExpanded: boolean;
  extraClass?: string;
}

export const getGridItemClass = ({
  isExpanded,
  extraClass,
}: IParams) => {
  const expandedItemClass = isExpanded ? GridClassnames.GRID_ITEM_EXPANDED_CLASSNAME : '';

  return `${GridClassnames.GRID_ITEM_CLASSNAME} ${expandedItemClass} ${extraClass || ''}`;
};
