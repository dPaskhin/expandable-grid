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

export type { ExpandableGridParameters, MediaQueryParametersMap, MediaQueryValue };

export interface IExpandableGridItemProps {
  /**
   * Represents the index of the item within the grid.
   */
  index: number;

  /**
   * A boolean flag that indicates whether the grid item is currently expanded.
   */
  isExpanded: boolean;

  /**
   * A function that gets called when the grid item should be expanded. It does not take any
   * arguments and does not return any value. Triggering this should only expand the item.
   */
  onExpand: () => void;

  /**
   * A function that gets called when the grid item should be closed or collapsed. Similar to
   * `onExpand`, it takes no arguments and does not return any value. Triggering this should only
   * collapse the item.
   */
  onClose: () => void;

  /**
   * A function that gets called when the expansion state of the grid item should be toggled.
   * If the item is collapsed, it should expand and vice versa.
   */
  onToggle: () => void;
}

export interface IExpandableGridProps {
  /**
   * An array of React functional components that represent the items within the grid.
   */
  items: Array<React.FC<IExpandableGridItemProps>>;

  /**
   * Defines the number of columns in the grid. This can be a fixed number or an object
   * specifying different column counts at various breakpoints for responsiveness.
   */
  columnsCount: MediaQueryValue;

  /**
   * Optional object specifying the grid's configuration parameters such as row and column gaps,
   * and the heights of items when they are collapsed or expanded.
   * These parameters can be constants or responsive values.
   */
  parameters?: ExpandableGridParameters;

  /**
   * Optional CSS class name to customize the styling of the grid container.
   */
  gridClassName?: string;

  /**
   * Optional CSS class name to customize the styling of individual grid items.
   */
  gridItemClassName?: string;

  /**
   * Optional CSS class name to customize the styling of grid items when they are expanded.
   */
  gridExpandedItemClassName?: string;

  /**
   * Optional inline styles to apply to the grid container.
   */
  style?: React.CSSProperties;

  /**
   * Optional inline styles to apply to each grid item.
   */
  itemStyle?: React.CSSProperties;
}

/**
 * `ExpandableGrid` is a responsive React component that enables the creation of a grid layout
 * with items that can be expanded and collapsed. It is designed to provide an interactive user
 * experience by allowing detailed content to be displayed without cluttering the UI.
 * This component behaves like a grid-based accordion, with the added benefit that when
 * configured with a single column, it acts as a traditional accordion.
 *
 * Ensure that the `items` prop is populated with function components that represent the content
 * of the grid items. The `columnsCount` prop determines the number of columns in the grid.
 *
 * For detailed documentation and examples, refer to the README.md or visit the repository.
 *
 * @example
 *
 * <ExpandableGrid
 *   items={[Item, Item, ...]}
 *   columnsCount={3}
 *   // Optional props for further customization
 *   // className, style, itemClassName, itemStyle, etc.
 * />
 */
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
