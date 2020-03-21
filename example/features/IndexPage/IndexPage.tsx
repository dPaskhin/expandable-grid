import React, { useMemo, useState } from 'react'

import { ExpandableGrid } from '@lib/Expandable'

import { getItems } from '@common/utils/items'
import { ExampleItem } from '@common/components/ExampleItem/ExampleItem'

export const IndexPage = () => {
    const [expandedItem, setExpandedItem] = useState<number | null>()
    const items = useMemo(() => getItems(), [])

    return (
        <ExpandableGrid expandedItem={expandedItem}>
            {items.map((item, index) => (
                <ExampleItem
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
