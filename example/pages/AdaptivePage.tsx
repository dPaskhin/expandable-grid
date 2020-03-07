import React, { useState } from 'react'
import { Edit } from '@material-ui/icons'
import { Fab, Theme, Zoom } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { ExpandableGrid } from '../../lib/Expandable'
import { items } from '../utils/items'
import { GridItem } from '../components/GridItem'


const useStyle = makeStyles((theme: Theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(5),
        right: theme.spacing(5),
        zIndex: 100
    }
}))

export const AdaptivePage: React.FC = () => {
    const [expandedItem, setExpandedItem] = useState<number | null>(null)
    const classes = useStyle()

    return (
        <React.Fragment>
            <ExpandableGrid
                expandedItem={expandedItem}
            >
                {items.map((item, index) => (
                    <GridItem
                        key={index}
                        isExpanded={expandedItem === index}
                        onClick={() => setExpandedItem(index)}
                        onClose={() => setExpandedItem(null)}
                        style={{ backgroundColor: item }}
                    />
                ))}
            </ExpandableGrid>

            <Zoom in={true}>
                <Fab
                    className={classes.fab}
                    color='primary'
                >
                    <Edit/>
                </Fab>
            </Zoom>
        </React.Fragment>
    )
}
