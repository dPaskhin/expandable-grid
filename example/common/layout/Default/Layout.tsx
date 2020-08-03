import React from 'react';
import { Container } from '@material-ui/core';

import { NavBar } from '@features/NavBar/NavBar';
import { useClasses } from '@common/layout/Default/hooks/useClasses';

export const Layout: React.FC = ({
  children,
}) => {
  const classes = useClasses();

  return (
    <div className={classes.base}>
      <NavBar/>
      <Container
        maxWidth='md'
        className={classes.container}
      >
        {children}
      </Container>
    </div>
  );
};
