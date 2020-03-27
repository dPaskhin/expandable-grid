import React, { useEffect, useMemo, useState } from 'react'

import '@lib/style/expandable.css'

import { IDimensions } from '@lib/interfaces/IDimensions'
import { IProps } from '@lib/interfaces/props'
import { IItem } from '@lib/interfaces/interfaces'
import { modifyItems } from '@lib/utils/modifierItems'
import { getChildrenItem, getInitialItems, getPosition } from '@lib/utils/functions'
import { getGridHeight, getGridItemPadding, getGridMargins } from '@lib/utils/gridHandlers'

import { useWindowResizeEffect } from '@lib/hooks/useWindowResizeEffect'
import { getDimensions } from '@lib/utils/getDimensions'


export const ExpandableGrid: React.FC<IProps> = ({
    children,
    expandedItem: exExpandedItem = null,
    dimensions: exDimensions,
    transitionDuration = null,
    gridClassName = '',
    gridItemClassName = '',
    adaptiveDimensions,
    afterColumnsCountChanged = null,
}) => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
    const dimensions: IDimensions = useMemo(() => (
        getDimensions(windowWidth, adaptiveDimensions)
    ), [windowWidth, adaptiveDimensions, exDimensions])
    const {
        itemHeight,
        columnsCount,
        rowGap,
        columnGap,
        expandedHeight,
    } = dimensions
    const diffHeight = expandedHeight - itemHeight
    const [expandedItem, setExpandedItem] = useState(exExpandedItem)

    useWindowResizeEffect(() => {
        if (!adaptiveDimensions) {
            return
        }
        setWindowWidth(window.innerWidth)
    })

    useEffect(() => {
        setExpandedItem(item => {
            if (item === null) {
                return exExpandedItem
            }

            if (exExpandedItem === null) {
                return null
            }

            setTimeout(() => setExpandedItem(exExpandedItem), 0)

            return null
        })
    }, [exExpandedItem])

    useEffect(() => {
        if (expandedItem === null) {
            setItems(initialItems)
            return
        }

        setItems(items => modifyItems(items, expandedItem, columnsCount))
    }, [expandedItem, columnsCount])

    useEffect(() => {
        if (afterColumnsCountChanged !== null) {
            afterColumnsCountChanged(columnsCount)
        }
    }, [columnsCount])

    useEffect(() => {
        setExpandedItem(null)
    }, [columnsCount])

    const initialItems: IItem[] = useMemo(() => {
        if (!children || (children instanceof Array && children.length === 0)) {
            throw Error('You should pass children items')
        }

        return getInitialItems(children, columnsCount)
    }, [children, columnsCount])

    const [items, setItems] = useState<IItem[]>(initialItems)

    const gridHeight = useMemo(() => (
        getGridHeight({
            itemsCount: items.length,
            itemHeight,
            expandedItem,
            diffHeight,
            columnsCount,
        })
    ), [itemHeight, expandedItem, columnsCount])

    return (
        <div
            className={`_expandable-grid ${gridClassName}`}
            style={{
                ...getGridMargins(rowGap, columnGap),
                height: gridHeight,
                transitionDuration: transitionDuration !== null ? `${transitionDuration}ms` : undefined,
            }}
        >
            {items.map((item, index) => (
                <div key={index}
                     className={
                         `_expandable-grid__item ${exExpandedItem === index ? '_expandable-grid__item--expanded' : ''} ${gridItemClassName}`
                     }
                     style={{
                         ...getPosition(items[index], itemHeight, diffHeight, columnsCount),
                         ...getGridItemPadding(rowGap, columnGap),
                         height: index === expandedItem ? expandedHeight : itemHeight,
                         transitionDuration: transitionDuration !== null ? `${transitionDuration}ms` : undefined,
                     }}
                >
                    {getChildrenItem(children, index)}
                </div>
            ))}
        </div>
    )
}
