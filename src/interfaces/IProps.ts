import { IDimensions } from '@src/interfaces/IDimensions';
import { IAdaptiveDimensions } from '@src/interfaces/IAdaptiveDimensions';

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
