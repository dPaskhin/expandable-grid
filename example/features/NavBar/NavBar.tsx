import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Slide, Tab, Tabs, Theme, Typography, useScrollTrigger } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { routes } from '@features/Router/utils/routes';
import { RoutesPaths } from '@features/Router/enums/RoutesPaths';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: theme.spacing(2, 5, 0, 5),
    },
  },
  title: {
    flexGrow: 1,
  },
  tabIndicator: {
    backgroundColor: theme.palette.common.white,
    width: '100%',
    height: '100%',
  },
}));

export const NavBar: React.FC = () => {
  const path = useLocation().pathname;
  const currentTab = useMemo(() => {
    const index = routes.findIndex(route => path === route.path);

    return index !== -1 ? index : 0;
  }, []);
  const [activeTab, setActiveTab] = useState(currentTab);
  const trigger = useScrollTrigger();
  const classes = useStyles();
  const TabIndicator = () => <div className={classes.tabIndicator}/>;

  const changeTab = (event: React.ChangeEvent<{}>, tab: number) => {
    setActiveTab(tab);
  };

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
          onChange={changeTab}
          TabIndicatorProps={{ children: <TabIndicator/> }}
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
