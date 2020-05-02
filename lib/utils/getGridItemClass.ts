import { GridClassnames } from '@lib/enums/GridClassnames';

interface IParams {
  isExpanded: boolean;
  extraClass?: string;
}

export const getGridItemClass = ({
  isExpanded,
  extraClass,
}: IParams) => (
  `
    ${GridClassnames.GRID_ITEM_CLASSNAME} 
    ${isExpanded ? GridClassnames.GRID_ITEM_EXPANDED_CLASSNAME : ''} ${extraClass || ''}
  `
);
