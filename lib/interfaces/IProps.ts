import { ReactNode } from 'react';

import { IDimensions } from '@lib/interfaces/IDimensions';
import { IAdaptiveDimensions } from '@lib/interfaces/IAdaptiveDimensions';

export interface IProps {
  children: ReactNode;
  expandedItem?: number | null;
  transitionDuration?: number;
  gridClassName?: string;
  gridItemClassName?: string;
  dimensions?: IDimensions;
  adaptiveDimensions?: IAdaptiveDimensions;
  afterColumnsCountChanged?: (columnsCount: number) => void;
}
