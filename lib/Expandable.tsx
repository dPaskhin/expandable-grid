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
import { useWindowResizeEffect } from './hooks/useWindowResizeEffect'
import { getAdaptiveValue } from './utils/getAdaptiveValue'


export const ExpandableGrid: React.FC<IProps> = ({
    children,
    expandedItem = null,
    itemHeight = 150,
    expandedItemHeight = 350,
    columnsCount = 3,
    rowGap = null,
    columnGap = null,
    transitionDuration = null,
    gridClassName = '',
    gridItemClassName = '',
    adaptive = null,
    afterColumnsCountChanged = null
}) => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

    const _itemHeight: number = useMemo(() => {
        if (adaptive?.heights?.length) {
            return getAdaptiveValue(windowWidth, adaptive.heights)
        }

        return itemHeight
    }, [windowWidth, itemHeight, adaptive?.heights])

    const _columnsCount: number = useMemo(() => {
        if (adaptive?.columns?.length) {
            return getAdaptiveValue(windowWidth, adaptive.columns)
        }

        if (columnsCount <= 0) {
            return 1
        }

        return columnsCount
    }, [windowWidth, columnsCount, adaptive?.columns])

    const _rowGap: number | null = useMemo(() => {
        if (adaptive?.rowGaps?.length) {
            return getAdaptiveValue(windowWidth, adaptive.rowGaps)
        }

        return rowGap
    }, [windowWidth, rowGap])

    const _columnGap: number | null = useMemo(() => {
        if (adaptive?.columnGaps?.length) {
            return getAdaptiveValue(windowWidth, adaptive.columnGaps)
        }

        return columnGap
    }, [windowWidth, columnGap])

    const diffHeight = expandedItemHeight - _itemHeight
    const [_expandedItem, setExpandedItem] = useState(expandedItem)

    useWindowResizeEffect(() => {
        if (!adaptive) {
            return
        }
        setWindowWidth(window.innerWidth)
    })

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

        setItems(items => modifyItems(items, _expandedItem, _columnsCount))
    }, [_expandedItem, _columnsCount])

    useEffect(() => {
        if (afterColumnsCountChanged !== null) {
            afterColumnsCountChanged(_columnsCount)
        }
    }, [_columnsCount])

    useEffect(() => {
        setExpandedItem(null)
    }, [_columnsCount])

    const initialItems: IItem[] = useMemo(() => {
        if (!children || (children instanceof Array && children.length === 0)) {
            throw Error('You should pass children items')
        }

        return getInitialItems(children, _columnsCount)
    }, [children, _columnsCount])

    const [items, setItems] = useState<IItem[]>(initialItems)

    const gridHeight = useMemo(() => {
        const needAdditionalRow = _expandedItem !== null && items.length % _columnsCount !== 1 && _columnsCount !== 1
        const rowsCount = Math.ceil(items.length / _columnsCount) + (needAdditionalRow ? 1 : 0)

        if (_expandedItem !== null) {
            return rowsCount * _itemHeight + diffHeight
        }

        return rowsCount * _itemHeight
    }, [_itemHeight, _expandedItem, _columnsCount])

    return (
        <div
            className={`_expandable-grid ${gridClassName}`}
            style={{
                ...getGridMargins(_rowGap, _columnGap),
                height: gridHeight,
                transitionDuration: transitionDuration !== null ? `${transitionDuration}ms` : undefined
            }}
        >
            {items.map((item, index) => (
                <div key={index}
                     className={
                         `_expandable-grid__item ${expandedItem === index ? '_expandable-grid__item--expanded' : ''} ${gridItemClassName}`
                     }
                     style={{
                         ...getPosition(items[index], _itemHeight, diffHeight, _columnsCount),
                         ...getGridItemPadding(_rowGap, _columnGap),
                         height: index === _expandedItem ? expandedItemHeight : _itemHeight,
                         transitionDuration: transitionDuration !== null ? `${transitionDuration}ms` : undefined
                     }}
                >
                    {getChildrenItem(children, index)}
                </div>
            ))}
        </div>
    )
}
