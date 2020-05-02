import React from 'react';
import { CloseRounded } from '@material-ui/icons';

interface IProps {
  onClick: (event: React.MouseEvent) => void;
}

export const CloseIcon: React.FC<IProps> = ({
  onClick,
}) => (
  <div
    className='example-item__close'
    onClick={onClick}
  >
    <CloseRounded titleAccess='Collapse item'/>
  </div>
);
