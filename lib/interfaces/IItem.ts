import { ICoord } from '@lib/interfaces/ICord';

export interface IItem {
  id: number;
  coord: ICoord;
  expanded?: boolean;
  underExpanded?: boolean;
}
