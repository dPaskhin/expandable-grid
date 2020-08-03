import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';

import { IMediaValue } from '@features/AdaptivePage/interfaces/IMediaValue';
import { useClasses } from '@features/AdaptivePage/components/SettingTable/hooks/useClasses';

interface IProps {
  items: Array<Required<IMediaValue>>;
  onRemove: (id: number) => void;
}

export const SettingsTable: React.FC<IProps> = ({
  items,
  onRemove,
}) => {
  const classes = useClasses();

  return (
    <Box
      mr={-1}
      ml={-1}
    >
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

        {items.map(item => (
          <ListItem
            key={item.id}
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
                  onClick={() => onRemove(item.id)}
                  className={classes.closeIcon}
                />
              </ListItemIcon>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
