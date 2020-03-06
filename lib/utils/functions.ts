import React from 'react'
import { IItem, IPosition } from '../interfaces/interfaces'
import { initialItem } from './initialItem'

type getPositionType = (
    item: IItem,
    itemHeight: number,
    diffHeight: number,
    columnsCount: number
) => IPosition

export const getPosition: getPositionType = (
    item,
    itemHeight,
    diffHeight,
    columnsCount
) => {
    const top = item.underExpanded ? diffHeight + (item.coord.y * itemHeight) : item.coord.y * itemHeight

    if (item.expanded) {
        return {
            left: 0,
            right: 0,
            top: top
        }
    }

    return {
        left: `${item.coord.x * (100 / columnsCount)}%`,
        right: `${Math.abs(item.coord.x - (columnsCount - 1)) * (100 / columnsCount)}%`,
        top: top
    }
}


export const getItemX = (itemId: number, columnsCount: number): number => {
    for (let i = 0; i <= columnsCount; i++) {
        if (itemId % columnsCount === 0) {
            return 0
        }

        if ((itemId + i) % columnsCount === 0) {
            return columnsCount - i
        }
    }

    return 0
}

export const getItemY = (itemId: number, columnsCount: number): number => Math.floor(itemId / columnsCount)


export const getInitialItems = (items: React.ReactNode[] | React.ReactNode, columnsCount: number): IItem[] => {
    if (!(items instanceof Array)) {
        return [initialItem]
    }

    return items.map((item, index) => ({
        id: index,
        coord: {
            x: getItemX(index, columnsCount),
            y: getItemY(index, columnsCount)
        }
    }))
}

export const getChildrenItem = (children: React.ReactNode[] | React.ReactNode, itemId: number) => {
    if (children instanceof Array) {
        return children[itemId]
    }

    return children
}

export const getGridMargins = (rowGap: number | null, columnGap: number | null) => {
    return {
        marginTop: rowGap !== null ? -rowGap / 2 : undefined,
        marginLeft: columnGap !== null ? -columnGap / 2 : undefined,
    }
}

export const getGridItemPadding = (rowGap: number | null, columnGap: number | null) => {
    return {
        paddingTop: rowGap !== null ? rowGap / 2 : undefined,
        paddingBottom: rowGap !== null ? rowGap / 2 : undefined,
        paddingLeft: columnGap !== null ? columnGap / 2 : undefined,
        paddingRight: columnGap !== null ? columnGap / 2 : undefined
    }
}
