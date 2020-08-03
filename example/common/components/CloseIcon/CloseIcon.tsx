import React from 'react';
import { CloseRounded } from '@material-ui/icons';

interface IProps {
  onClick: (event: React.MouseEvent) => void;
  className?: string;
}

export const CloseIcon: React.FC<IProps> = ({
  onClick,
  className,
}) => (
  <div
    className={className}
    onClick={onClick}
  >
    <CloseRounded titleAccess='Collapse item'/>
  </div>
);
