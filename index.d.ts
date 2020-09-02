import React from 'react';

export enum EntityTypes {
  GRID = 'grid',
  ITEM = 'item',
}

// Enum with dimensions for setting of grid
export enum DimensionsTypes {
  ITEM_HEIGHT = 'itemHeight',
  COLUMNS_COUNT = 'columnsCount',
  ROW_GAP = 'rowGap',
  COLUMN_GAP = 'columnGap',
  EXPANDED_ITEM_HEIGHT = 'expandedItemHeight',
}

// Transition duration
// Can be a number for grid and grid item together
// Or can be more detailed for grid or grid item by object with keys from EntityTypes enum
export type ITransitionDuration = number | { [K in EntityTypes]?: number };

// Object for adaptiveDimensions
export interface IMediaValue<T = number> {
  // Range of window width
  windowWidth: { min: T; max: T };
  // Value for current window width
  value: T;
}

// Object with dimensions (described in DimensionsTypes enum) and values (number) for set up grid
export type IDimensions = {
  [K in DimensionsTypes]?: number;
}

// Object with dimensions (described in DimensionsTypes enum) and adaptive values (described in IMediaValue interface)
// for set up adaptive grid
export type IAdaptiveDimensions = {
  [K in DimensionsTypes]?: IMediaValue[];
}

export interface IInjectedProps {
  // Whether the item is currently expanded
  isExpanded: boolean;
  // Handler for expand the item
  onExpand?: () => void;
  // Handler for collapse the expanded item
  onClose: () => void;
}

// Interface of main component props
export interface IProps {
  // Array of items to render in the grid
  // They should be functions which take props described in IInjectedProps interface and return JSX element
  // This is required property
  renderItems: Array<(props: IInjectedProps) => JSX.Element>;
  // Transition duration of all animations in the component
  transitionDuration?: ITransitionDuration;
  // Additional class name for grid container
  gridClassName?: string;
  // Additional class name for grid item
  gridItemClassName?: string;
  // Object with dimensions (described in DimensionsTypes enum) and values (number) for set up grid
  dimensions?: IDimensions;
  // Object with dimensions (described in DimensionsTypes enum) and adaptive values (described in IMediaValue interface)
  // for set up adaptive grid
  adaptiveDimensions?: IAdaptiveDimensions;
}

// This is main component to import in your react project
export const ExpandableGrid: React.FC<IProps>;
