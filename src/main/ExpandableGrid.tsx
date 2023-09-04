import React, { CSSProperties, FC, memo, useMemo } from 'react';
import { Grid } from './Grid';
import { GridStyles } from './GridStyles';
import { useRerender } from './useRerender';

export interface IItemProps {
  index: number;
  isExpanded: boolean;
  onExpand: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export interface Parameters {
  rowGap: number;
  columnGap: number;
  itemHeight: number;
  expandedItemHeight: number;
}

export interface IProps {
  items: Array<FC<IItemProps>>;
  columnsCount: number;
  parameters?: Partial<Parameters>;
  gridClassName?: string;
  gridItemClassName?: string;
  style?: CSSProperties;
  itemStyle?: CSSProperties;
}

export const ExpandableGrid: FC<IProps> = memo((props) => {
  const { columnsCount, gridClassName, gridItemClassName, style, itemStyle, items, parameters } = props;

  const rerender = useRerender();

  const grid = useMemo(() => new Grid(columnsCount, items.length, rerender), [columnsCount, items.length]);

  const gridStyles = useMemo(() => new GridStyles(grid, parameters || {}), [grid, parameters]);

  return (
    <div
      className={gridClassName}
      style={Object.assign(gridStyles.getGridStyles(), style)}
    >
      {grid.items.map((item, index) => (
        <div
          key={index}
          className={gridItemClassName}
          style={Object.assign(gridStyles.getItemStyles(item), itemStyle)}
        >
          {items[index]?.({
            index,
            isExpanded: grid.isItemExpanded(item),
            onExpand: () => grid.expandItem(item),
            onClose: () => grid.collapseExpandedItem(),
            onToggle: () => grid.toggleExpandedItem(item),
          })}
        </div>
      ))}
    </div>
  );
});
