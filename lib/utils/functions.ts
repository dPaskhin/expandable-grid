import React from 'react'
import { IItem, IPosition } from '../interfaces/interfaces'

interface IParams {
    item: IItem,
    itemHeight: number,
    diffHeight: number,
    columnsCount: number,
}

export const getPosition = ({
    item,
    itemHeight,
    diffHeight,
    columnsCount,
}: IParams): IPosition => {
    const top = item.underExpanded ? diffHeight + (item.coord.y * itemHeight) : item.coord.y * itemHeight

    if (item.expanded) {
        return {
            left: 0,
            right: 0,
            top: top,
        }
    }

    return {
        left: `${item.coord.x * (100 / columnsCount)}%`,
        right: `${Math.abs(item.coord.x - (columnsCount - 1)) * (100 / columnsCount)}%`,
        top: top,
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


export const getInitialItems = (
    itemsCount: number,
    columnsCount: number,
): IItem[] => (
    [...new Array(itemsCount)].map((item, index) => ({
        id: index,
        coord: {
            x: getItemX(index, columnsCount),
            y: getItemY(index, columnsCount),
        },
    }))
)

export const getChildrenItem = (children: React.ReactNode[] | React.ReactNode, itemId: number) => {
    if (Array.isArray(children)) {
        return children[itemId]
    }

    return children
}
