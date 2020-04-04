import { useEffect, useState } from 'react'

export const useExpandedItem = (
    externalExpandedItem: number | null
): [number | null, (expandedItem: number | null) => void] => {
    const [expandedItem, setExpandedItem] = useState(externalExpandedItem)

    useEffect(() => {
        setExpandedItem(item => {
            if (item === null) {
                return externalExpandedItem
            }

            if (externalExpandedItem === null) {
                return null
            }

            setTimeout(() => setExpandedItem(externalExpandedItem), 0)

            return null
        })
    }, [externalExpandedItem])

    return [expandedItem, setExpandedItem]
}
