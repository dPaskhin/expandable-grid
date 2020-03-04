import React from 'react'

import { IMediaColumn, IMediaGap, IMediaHeight } from './interfaces'

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
        heights?: IMediaHeight[]
        columnsCounts?: IMediaColumn[]
        rowGaps?: IMediaGap[]
        columnGaps?: IMediaGap[]
    } | null
    afterExpandedItemChanged?: ((expandedItem: number | null) => void) | null
}
