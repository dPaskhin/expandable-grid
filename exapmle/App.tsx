import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Box,
  css,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Stack,
  styled,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { ChevronLeft, CloseRounded, Menu } from '@mui/icons-material';
import { ChangeEvent, FC, useState } from 'react';
import { ExpandableGrid, IItemProps } from '../src/main';
import { fill, range } from 'lodash';
import { motion } from 'framer-motion';

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

export const App: FC = () => {
  const [open, setOpen] = useState(false);
  const [columnCount, setColumnCount] = useState(5);
  const [itemCount, setItemCount] = useState(8);
  const [itemHeight, setItemHeight] = useState(200);
  const [expandedItemHeight, setExpandedItemHeight] = useState(400);
  const [columnGap, setColumnGap] = useState(20);
  const [rowGap, setRowGap] = useState(10);

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
        <List>
          <ListItem>
            <PositiveNumberField
              label={"Column's count"}
              value={columnCount}
              fullWidth={true}
              onChange={setColumnCount}
            />
          </ListItem>
          <ListItem>
            <PositiveNumberField
              label={"Item's count"}
              value={itemCount}
              fullWidth={true}
              onChange={setItemCount}
            />
          </ListItem>
          <ListItem>
            <PositiveNumberField
              label={"Item's height"}
              value={itemHeight}
              fullWidth={true}
              onChange={setItemHeight}
            />
          </ListItem>
          <ListItem>
            <PositiveNumberField
              label={"Expanded item's height"}
              value={expandedItemHeight}
              fullWidth={true}
              onChange={setExpandedItemHeight}
            />
          </ListItem>
          <ListItem>
            <Stack
              direction={'row'}
              columnGap={1}
            >
              <PositiveNumberField
                label={"Column's gap"}
                value={columnGap}
                fullWidth={true}
                onChange={setColumnGap}
              />
              <PositiveNumberField
                label={"Row's gap"}
                value={rowGap}
                fullWidth={true}
                onChange={setRowGap}
              />
            </Stack>
          </ListItem>
        </List>
      </Drawer>

      <Main open={open}>
        <Toolbar />

        <ExpandableGrid
          items={fill(range(itemCount), Item)}
          columnsCount={columnCount}
          parameters={{ itemHeight, expandedItemHeight, rowGap, columnGap }}
          style={{ transitionDuration: '100ms' }}
          itemStyle={{ transitionDuration: '200ms' }}
        />

        <Typography
          paragraph={true}
          sx={{ userSelect: 'none' }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
          velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
          scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
          lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
          ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
        </Typography>
      </Main>
    </Box>
  );
};

const Item: FC<IItemProps> = ({ onToggle, isExpanded, onClose }) => {
  const variants = {
    shown: { scale: [0.8, 3, 1.8], x: '-100%', y: '100%' },
    hidden: { scale: 0 },
  };

  return (
    <SItem onClick={onToggle}>
      <motion.div
        initial={{ scale: 0 }}
        variants={variants}
        animate={isExpanded ? 'shown' : 'hidden'}
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      >
        <CloseRounded titleAccess="Collapse item" />
      </motion.div>
    </SItem>
  );
};

const SItem = styled(Box)(
  ({ theme }) => css`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    background-color: lightblue;
    border-radius: ${theme.spacing(1)};
    color: ${theme.palette.common.white};
    cursor: pointer;
  `
);

type INumberFieldProps = Omit<Parameters<typeof TextField>[0], 'value' | 'onChange'> & {
  value: number;
  onChange: (value: number) => void;
};

const PositiveNumberField: FC<INumberFieldProps> = ({ value, onChange, ...props }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let parsed = Number.parseInt(event.currentTarget.value, 10);

    if (Number.isNaN(parsed) || parsed <= 0) {
      parsed = 1;
    }

    onChange(parsed);
  };

  return (
    <TextField
      {...props}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      value={value}
      onChange={handleChange}
    />
  );
};
