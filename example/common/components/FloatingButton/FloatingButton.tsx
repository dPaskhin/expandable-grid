import React from 'react'
import { Fab, Theme, Zoom } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme: Theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(5),
        right: theme.spacing(5),
        zIndex: 100,
        '& svg': {
            transition: theme.transitions.create('transform', {duration: 200})
        },
        '&:hover svg': {
            transform: 'rotate(-10deg)'
        }
    }
}))

interface IProps {
    onClick: () => void
}

export const FloatingButton: React.FC<IProps> = ({
    onClick
}) => {
    const classes = useStyle()

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
    )
}
