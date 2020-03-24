import React from 'react'
import { Box, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { CloseRounded } from '@material-ui/icons'

import { IMediaValue } from '@common/interfaces/IMediaValue'
import { Transition, TransitionGroup } from 'react-transition-group'

interface IProps {
    items: IMediaValue[]
    onRemove: (id: number) => void
}

export const SettingsTable: React.FC<IProps> = ({
    items,
    onRemove,
}) => (
    <Box mr={-2} ml={-2}>
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
                        timeout={2000}
                    >
                        {state => (
                            <ListItem
                                style={{
                                    opacity: state === 'entering' || state === 'entered' ? 1 : 0,
                                    transition: 'opacity 2000ms',
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
                                            style={{ cursor: 'pointer' }}
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
)
