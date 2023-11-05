import React from 'react';
import { Grid } from './Grid';
import { GridStyles } from './GridStyles';
import { useRerender } from './useRerender';
import {
  ExpandableGridParameters,
  MediaQueryParametersMap,
  MediaQueryValue,
  normalizeColumnsCount,
  normalizeParameters,
} from './normalizeParameters';
import { useWindowWidth } from './useWindowWidth';

export type { ExpandableGridParameters, MediaQueryParametersMap };

export interface IExpandableGridItemProps {
  index: number;
  isExpanded: boolean;
  onExpand: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export interface IExpandableGridProps {
  items: Array<React.FC<IExpandableGridItemProps>>;
  columnsCount: MediaQueryValue;
  parameters?: Partial<ExpandableGridParameters>;
  gridClassName?: string;
  gridItemClassName?: string;
  gridExpandedItemClassName?: string;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
}

export const ExpandableGrid: React.FC<IExpandableGridProps> = (props) => {
  const {
    columnsCount,
    gridClassName,
    gridItemClassName,
    gridExpandedItemClassName,
    style,
    itemStyle,
    items,
    parameters,
  } = props;

  const rerender = useRerender();

  const windowWidth = useWindowWidth();

  const normalizedColumnsCount = normalizeColumnsCount(columnsCount, windowWidth);
  const normalizedParameters = normalizeParameters(parameters, windowWidth);

  const grid = React.useMemo(
    () => new Grid(normalizedColumnsCount, items.length, rerender),
    [normalizedColumnsCount, items.length]
  );

  const gridStyles = React.useMemo(() => new GridStyles(grid, normalizedParameters), [grid, normalizedParameters]);

  return React.createElement(
    'div',
    {
      className: gridClassName,
      style: Object.assign(gridStyles.getGridStyles(), style),
    },
    grid.items.map((item, index) =>
      React.createElement(
        'div',
        {
          key: index,
          className: grid.isItemExpanded(item) ? gridExpandedItemClassName : gridItemClassName,
          style: Object.assign(gridStyles.getItemStyles(item), itemStyle),
        },
        items[index]!({
          index,
          isExpanded: grid.isItemExpanded(item),
          onExpand: () => grid.expandItem(item),
          onClose: () => grid.collapseExpandedItem(),
          onToggle: () => grid.toggleExpandedItem(item),
        })
      )
    )
  );
};

ExpandableGrid.displayName = 'ExpandableGrid';
