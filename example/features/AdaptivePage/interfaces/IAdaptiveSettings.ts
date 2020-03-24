import { IMediaValue } from '@common/interfaces/IMediaValue'
import { AdaptiveValueTypes } from '@features/AdaptivePage/enums/AdaptiveValueTypes'

export type IAdaptiveSettings = {
    [K in AdaptiveValueTypes]: IMediaValue[]
}
