import React from 'react';
import { Fab, Zoom } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import { useClasses } from '@common/components/FloatingButton/hooks/useClasses';

interface IProps {
  onClick: () => void;
}

export const FloatingButton: React.FC<IProps> = ({
  onClick,
}) => {
  const classes = useClasses();

  return (
    <Zoom in={true}>
      <Fab
        className={classes.fab}
        color='primary'
        onClick={onClick}
        disableFocusRipple={true}
      >
        <Edit titleAccess='Edit adaptability configuration'/>
      </Fab>
    </Zoom>
  );
};
