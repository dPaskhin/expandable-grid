import { FC, ReactNode, useState } from 'react';
import {
  AppBar as MuiAppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Stack,
  styled,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import { ChevronLeft, Menu } from '@mui/icons-material';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar/AppBar';

export type TabType = 'default' | 'adaptive';

interface IProps {
  drawerContent: ReactNode;
  children: ReactNode;
  activeTab: TabType;
  onChangeTab: (value: TabType) => void;
}

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

export const AppTemplate: FC<IProps> = ({ drawerContent, children, activeTab, onChangeTab }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
      >
        <Toolbar>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
          >
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <Menu />
              </IconButton>
              <Typography
                variant="h6"
                noWrap={true}
                component="div"
              >
                Expandable grid
              </Typography>
            </Stack>

            <Tabs
              value={activeTab}
              onChange={(event, value) => onChangeTab(value)}
              textColor="inherit"
            >
              <Tab
                label="default grid"
                value={'default' as TabType}
              />
              <Tab
                label="adaptive grid"
                value={'adaptive' as TabType}
              />
            </Tabs>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography>Parameters</Typography>

          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />

        {drawerContent}
      </Drawer>

      <Main open={open}>
        <Toolbar />

        {children}
      </Main>
    </Box>
  );
};
