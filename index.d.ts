import React from 'react';

export enum DimensionsTypes {
  ITEM_HEIGHT = 'itemHeight',
  COLUMNS_COUNT = 'columnsCount',
  ROW_GAP = 'rowGap',
  COLUMN_GAP = 'columnGap',
  EXPANDED_ITEM_HEIGHT = 'expandedItemHeight',
}

export interface IMediaValue<T = number> {
  windowWidth: { min: T; max: T };
  value: T;
}

export type IDimensions = {
  [K in DimensionsTypes]?: number;
}

export type IAdaptiveDimensions = {
  [K in DimensionsTypes]?: IMediaValue[];
}

export interface IInjectedProps {
  isExpanded: boolean;
  onExpand?: () => void;
  onClose: () => void;
}

export interface IProps {
  renderItems: Array<(props: IInjectedProps) => JSX.Element>;
  transitionDuration?: number;
  gridClassName?: string;
  gridItemClassName?: string;
  dimensions?: IDimensions;
  adaptiveDimensions?: IAdaptiveDimensions;
}

export const ExpandableGrid: React.FC<IProps>;
