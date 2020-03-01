import React, {
    useEffect,
    useMemo,
    useState
} from 'react'

import './style/expandable.css'

import { IItem } from './interfaces/interfaces'
import { IProps } from './interfaces/props'

import {
    getChildrenItem,
    getGridItemPadding,
    getGridMargins,
    getInitialItems,
    getPosition
} from './utils/functions'
import { modifyItems } from './utils/modifierItems'


export const ExpandableGrid: React.FC<IProps> = ({
    children,
    expandedItem = null,
    itemHeight = 150,
    expandedItemHeight = 350,
    columnsCount = 3,
    rowGap = null,
    columnGap = null,
    transitionDuration = null
}) => {
    const diffHeight = expandedItemHeight - itemHeight
    const [_expandedItem, setExpandedItem] = useState(expandedItem)

    useEffect(() => {
        setExpandedItem(item => {
            if (item === null) {
                return expandedItem
            }

            if (expandedItem === null) {
                return null
            }

            setTimeout(() => setExpandedItem(expandedItem), 0)

            return null
        })
    }, [expandedItem])

    useEffect(() => {
        if (_expandedItem === null) {
            setItems(initialItems)
            return
        }

        setItems(items => modifyItems(items, _expandedItem, columnsCount))
    }, [_expandedItem])

    const initialItems: IItem[] = useMemo(() => {
        if (!children || (children instanceof Array && children.length === 0)) {
            throw Error('You should pass children items')
        }

        return getInitialItems(children, columnsCount)
    }, [children, columnsCount])

    const [items, setItems] = useState<IItem[]>(initialItems)

    const gridHeight = useMemo(() => {
        const needAdditionalRow = _expandedItem !== null && items.length % columnsCount !== 1 && columnsCount !== 1
        const rowsCount = Math.ceil(items.length / columnsCount) + (needAdditionalRow ? 1 : 0)

        if (_expandedItem !== null) {
            return rowsCount * itemHeight + diffHeight
        }

        return rowsCount * itemHeight
    }, [itemHeight, _expandedItem])

    return (
        <div className='_expandable-grid' style={{
            height: gridHeight,
            ...getGridMargins(rowGap, columnGap),
            transitionDuration: transitionDuration !== null ? `${transitionDuration}ms` : undefined
        }}>
            {items.map((item, index) => (
                <div key={index}
                     className={
                         `_expandable-grid__item ${expandedItem === index ? '_expandable-grid__item--expanded' : ''}`
                     }
                     style={{
                         ...getPosition(items[index], itemHeight, diffHeight, columnsCount),
                         height: index === _expandedItem ? expandedItemHeight : itemHeight,
                         ...getGridItemPadding(rowGap, columnGap),
                         transitionDuration: transitionDuration !== null ? `${transitionDuration}ms` : undefined
                     }}
                >{getChildrenItem(children, index)}</div>
            ))}
        </div>
    )
}
