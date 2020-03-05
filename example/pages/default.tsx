import React, { useState } from 'react'

import { ExpandableGrid } from '../../lib/Expandable'
import { items } from '../utils/items'
import { CloseIcon } from '../components/CloseIcon'

export const DefaultPage = () => {
    const [expandedItem, setExpandedItem] = useState<number | null>()

    return (
        <ExpandableGrid expandedItem={expandedItem}>
            {items.map((i, index) => (
                <div
                    key={index}
                    className='example-item'
                    style={{ backgroundColor: i }}
                    onClick={() => setExpandedItem(index)}
                >
                    <CloseIcon onClick={event => {
                        // You need to add event.propagation when you want to process any click in expanded block
                        event.stopPropagation()
                        setExpandedItem(null)
                    }}/>
                </div>
            ))}
        </ExpandableGrid>
    )
}
