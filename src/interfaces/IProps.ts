import { IDimensions } from '@src/interfaces/IDimensions';
import { IAdaptiveDimensions } from '@src/interfaces/IAdaptiveDimensions';
import { ITransitionDuration } from '@src/interfaces/ITransitionDuration';

export interface IInjectedProps {
  isExpanded: boolean;
  onExpand?: () => void;
  onClose: () => void;
}

export interface IProps {
  renderItems: Array<(props: IInjectedProps) => JSX.Element>;
  transitionDuration?: ITransitionDuration;
  gridClassName?: string;
  gridItemClassName?: string;
  dimensions?: IDimensions;
  adaptiveDimensions?: IAdaptiveDimensions;
}
