import { DimensionsTypes } from '@lib/enums/DimensionsTypes'
import { IMediaValue } from '@lib/interfaces/interfaces'

export type IAdaptiveDimensions = {
    [K in DimensionsTypes]?: IMediaValue[]
}
