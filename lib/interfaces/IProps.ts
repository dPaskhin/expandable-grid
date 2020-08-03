import { IDimensions } from '@lib/interfaces/IDimensions';
import { IAdaptiveDimensions } from '@lib/interfaces/IAdaptiveDimensions';

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
