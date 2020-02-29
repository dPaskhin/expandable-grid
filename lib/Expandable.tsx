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
    getInitialItems,
    getItemY,
    getPosition
} from './utils/functions'
import { modifyItems } from './utils/modifierItems'


export const ExpandableGrid: React.FC<IProps> = ({
    children,
    expandedItem = null,
    itemHeight = 150,
    expandedItemHeight = 350,
    columnsCount = 3
}) => {
    const diffHeight = expandedItemHeight - itemHeight
    const [_expandedItem, setExpandedItem] = useState(expandedItem)

    useEffect(() => {
        setExpandedItem(item => {
            if (item === null) {
                return expandedItem
            }

            if (expandedItem === null || expandedItem === item) {
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
        if (!children) {
            throw Error('You should pass children items')
        }

        return getInitialItems(children, columnsCount)
    }, [children, columnsCount])

    const [items, setItems] = useState<IItem[]>(initialItems)

    const gridHeight = useMemo(() => {
        const rowsCount = _expandedItem !== null && items.length !== 1 ?
            getItemY(items.length + columnsCount, columnsCount) + 1
            :
            getItemY(items.length, columnsCount) + 1

        if (_expandedItem !== null) {
            return rowsCount * itemHeight + diffHeight
        }

        return rowsCount * itemHeight
    }, [itemHeight, _expandedItem])

    return (
        <div className='grid' style={{ height: `${gridHeight}px` }}>
            {items.map((item, index) => (
                <div key={index}
                     className={`grid__item ${expandedItem === index && 'grid__item--expanded'}`}
                     style={{
                         ...getPosition(items[index], itemHeight, diffHeight, columnsCount),
                         height: index === _expandedItem ? expandedItemHeight : itemHeight
                     }}
                >{getChildrenItem(children, index)}</div>
            ))}
        </div>
    )
}
