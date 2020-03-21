import { AdaptiveValueTypes } from '@features/AdaptivePage/enums/AdaptiveValueTypes'
import { IMediaValue } from '@common/interfaces/IMediaValue'

export enum Types {
    SET_ADAPTIVE_VALUE = 'SET_ADAPTIVE_VALUE',
    DELETE_ADAPTIVE_VALUE = 'DELETE_ADAPTIVE_VALUE',
}

export const Creators = {
    setValue: <T extends AdaptiveValueTypes>(name: T, payload: IMediaValue) => ({
        type: Types.SET_ADAPTIVE_VALUE,
        name,
        payload,
    } as const),
    deleteValue: <T extends AdaptiveValueTypes>(name: T, payload: number) => ({
        type: Types.DELETE_ADAPTIVE_VALUE,
        name,
        payload,
    } as const),
}
