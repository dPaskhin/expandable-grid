import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Slide, Tab, Tabs, Typography, useScrollTrigger } from '@material-ui/core';

import { routes } from '@features/Router/utils/routes';
import { RoutesPaths } from '@features/Router/enums/RoutesPaths';
import { useClasses } from '@features/NavBar/hooks/useClasses';
import { getCurrentTab } from '@features/NavBar/utils/getCurrentTab';

export const NavBar: React.FC = () => {
  const path = useLocation().pathname;
  const [activeTab, setActiveTab] = useState(getCurrentTab(path));
  const trigger = useScrollTrigger();
  const classes = useClasses();

  useEffect(() => setActiveTab(getCurrentTab(path)), [path]);

  return (
    <Slide
      appear={false}
      in={!trigger}
      direction='down'
    >
      <AppBar
        className={classes.appBar}
      >
        <Typography
          className={classes.title}
          variant='h6'
          color='inherit'
          component={Link}
          to={RoutesPaths.INDEX}
        >
          Expandable Grid
        </Typography>

        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          TabIndicatorProps={{ children: <div className={classes.tabIndicator}/> }}
        >
          {routes.map(route => (
            <Tab
              key={route.path}
              disableFocusRipple={true}
              label={route.title}
              component={Link}
              to={route.path}
            />
          ))}
        </Tabs>
      </AppBar>
    </Slide>
  );
};
