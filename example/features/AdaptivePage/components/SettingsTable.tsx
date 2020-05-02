import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CloseRounded } from '@material-ui/icons';

import { Transition, TransitionGroup } from 'react-transition-group';
import { ENTERED } from 'react-transition-group/Transition';

import { IMediaValue } from '@common/interfaces/IMediaValue';

const useStyles = makeStyles({
  closeIcon: {
    'cursor': 'pointer',
    '&:hover': {
      fill: '#000',
    },
  },
  listItem: {
    transition: 'opacity 200ms',
  },
});

interface IProps {
  items: IMediaValue[];
  onRemove: (id: number) => void;
}

export const SettingsTable: React.FC<IProps> = ({
  items,
  onRemove,
}) => {
  const classes = useStyles();

  return (
    <Box
      mr={-2}
      ml={-2}>
      <List>
        <ListItem
          selected={true}
          divider={true}
        >
          <ListItemText>
            Min
          </ListItemText>
          <ListItemText>
            Max
          </ListItemText>
          <ListItemText>
            Value
          </ListItemText>
          <ListItemText>
            Remove
          </ListItemText>
        </ListItem>

        {!items.length && (
          <ListItem disabled={true}>
            <ListItemText>
              No media queries yet
            </ListItemText>
          </ListItem>
        )}

        <TransitionGroup>
          {items.map(item => (
            <Transition
              key={item.id}
              timeout={200}
            >
              {state => (
                <ListItem
                  className={classes.listItem}
                  style={{
                    opacity: state === ENTERED ? 1 : 0,
                  }}
                  divider={true}
                >
                  <ListItemText>
                    {item.windowWidth.min}
                  </ListItemText>
                  <ListItemText>
                    {item.windowWidth.max}
                  </ListItemText>
                  <ListItemText>
                    {item.value}
                  </ListItemText>
                  <ListItemText>
                    <ListItemIcon>
                      <CloseRounded
                        onClick={() => onRemove(item.id!)}
                        className={classes.closeIcon}
                      />
                    </ListItemIcon>
                  </ListItemText>
                </ListItem>
              )}
            </Transition>
          ))}
        </TransitionGroup>
      </List>
    </Box>
  );
};
