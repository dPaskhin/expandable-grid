import React, { useState } from 'react'

import { ExpandableGrid } from '../../lib/Expandable'
import { items } from '../utils/items'
import { GridItem } from '../components/GridItem'

export const IndexPage = () => {
    const [expandedItem, setExpandedItem] = useState<number | null>()

    return (
        <ExpandableGrid expandedItem={expandedItem}>
            {items.map((item, index) => (
                <GridItem
                    key={index}
                    isExpanded={expandedItem === index}
                    onClose={() => setExpandedItem(null)}
                    onClick={() => setExpandedItem(index)}
                    style={{ backgroundColor: item }}
                />
            ))}
        </ExpandableGrid>
    )
}
