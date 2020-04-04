import React, { useCallback, useEffect, useMemo } from 'react'

import '@lib/style/expandable.css'

import { IProps } from '@lib/interfaces/props'

import { getChildrenItem, getPosition } from '@lib/utils/functions'
import { getGridItemPadding, getGridMargins } from '@lib/utils/gridHandlers'

import { useDimensions } from '@lib/hooks/useDimensions'
import { useWindowWidth } from '@lib/hooks/useWindowWidth'
import { useExpandedItem } from '@lib/hooks/useExpandedItem'
import { useGridItems } from '@lib/hooks/useGridItems'
import { useGridHeight } from '@lib/hooks/useGridHeght'
import { IItem } from '@lib/interfaces/interfaces'
import { GridClassnames } from '@lib/enums/GridClassnames'

export const ExpandableGrid: React.FC<IProps> = ({
    children,
    expandedItem: exExpandedItem = null,
    dimensions: exDimensions,
    transitionDuration = 200,
    gridClassName = '',
    gridItemClassName = '',
    adaptiveDimensions,
    afterColumnsCountChanged,
}) => {
    if (!children || (Array.isArray(children) && !children.length)) {
        throw Error('You should pass children items')
    }

    const windowWidth = useWindowWidth(!!adaptiveDimensions)

    const {
        itemHeight,
        columnsCount,
        rowGap,
        columnGap,
        expandedHeight,
    } = useDimensions(windowWidth, exDimensions, adaptiveDimensions)

    const diffHeight = expandedHeight - itemHeight

    const [expandedItem, setExpandedItem] = useExpandedItem(exExpandedItem)

    const items = useGridItems({
        itemsCount: Array.isArray(children) ? children.length : 1,
        columnsCount,
        expandedItem,
    })

    useEffect(() => {
        if (afterColumnsCountChanged) {
            afterColumnsCountChanged(columnsCount)
        }
        setExpandedItem(null)
    }, [columnsCount])

    const gridHeight = useGridHeight({
        itemHeight,
        diffHeight,
        itemsCount: items.length,
        columnsCount,
        expandedItem,
    })

    const gridStyles = useMemo(() => ({
        ...getGridMargins(rowGap, columnGap),
        height: gridHeight,
        transitionDuration: `${transitionDuration}ms`,
    }), [rowGap, columnGap, gridHeight])

    const getGridItemStyles = useCallback((item: IItem, isExpandedItem?: boolean) => ({
        ...getPosition({ item, itemHeight, diffHeight, columnsCount }),
        ...getGridItemPadding(rowGap, columnGap),
        height: isExpandedItem ? expandedHeight : itemHeight,
        transitionDuration: `${transitionDuration}ms`,
    }), [diffHeight, rowGap, columnGap])

    const gridClass = `${GridClassnames.GRID_CLASSNAME} ${gridClassName}`

    const getGridItemClass = useCallback((isExpanded: boolean) => (
        `
            ${GridClassnames.GRID_ITEM_CLASSNAME} 
            ${isExpanded ? GridClassnames.GRID_ITEM_EXPANDED_CLASSNAME : ''} ${gridItemClassName}
        `
    ), [])

    return (
        <div
            className={gridClass}
            style={gridStyles}
        >
            {items.map((item, index) => (
                <div key={index}
                     className={getGridItemClass(exExpandedItem === index)}
                     style={getGridItemStyles(item, index === exExpandedItem)}
                >
                    {getChildrenItem(children, index)}
                </div>
            ))}
        </div>
    )
}
