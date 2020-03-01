import React from 'react'

export interface IProps {
    children: React.ReactNode[] | React.ReactNode
    expandedItem?: number | null
    itemHeight?: number
    expandedItemHeight?: number
    columnsCount?: number
    rowGap?: number | null
    columnGap?: number | null
    transitionDuration?: number | null
}
