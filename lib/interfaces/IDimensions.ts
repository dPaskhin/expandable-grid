import { DimensionsTypes } from '@lib/enums/DimensionsTypes'

export type IDimensions = {
    [K in DimensionsTypes]?: number
}
