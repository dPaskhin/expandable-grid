import React from 'react';
import { Grid } from './Grid';
import { ExpandableGridParameters, GridStyles } from './GridStyles';
import { useRerender } from './useRerender';

export type { ExpandableGridParameters };

export interface IExpandableGridItemProps {
  index: number;
  isExpanded: boolean;
  onExpand: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export interface IExpandableGridProps {
  items: Array<React.FC<IExpandableGridItemProps>>;
  columnsCount: number;
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

  const grid = React.useMemo(() => new Grid(columnsCount, items.length, rerender), [columnsCount, items.length]);

  const gridStyles = React.useMemo(() => new GridStyles(grid, parameters || {}), [grid, parameters]);

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
