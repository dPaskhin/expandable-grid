import React from 'react'

import { DimensionsTypes } from '@lib/enums/DimensionsTypes'
import { IMediaValue } from '@lib/interfaces/interfaces'
import { IDimensions } from '@lib/interfaces/IDimensions'
import { IAdaptiveDimensions } from '@lib/interfaces/IAdaptiveDimensions'

export interface IProps {
    children: React.ReactNode[] | React.ReactNode
    expandedItem?: number | null
    transitionDuration?: number | null
    gridClassName?: string
    gridItemClassName?: string
    dimensions?: Partial<IDimensions>
    adaptiveDimensions?: IAdaptiveDimensions
    afterColumnsCountChanged?: ((columnsCount: number) => void) | null
}
