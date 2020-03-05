import React from 'react'

import { IMediaValue } from './interfaces'

export interface IProps {
    children: React.ReactNode[] | React.ReactNode
    expandedItem?: number | null
    itemHeight?: number
    expandedItemHeight?: number
    columnsCount?: number
    rowGap?: number | null
    columnGap?: number | null
    transitionDuration?: number | null
    gridClassName?: string
    gridItemClassName?: string
    adaptive?: {
        heights?: IMediaValue[]
        columnsCounts?: IMediaValue[]
        rowGaps?: IMediaValue[]
        columnGaps?: IMediaValue[]
    } | null
    afterColumnsCountChanged?: ((columnsCount: number) => void) | null
}
