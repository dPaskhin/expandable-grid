import { IMediaValue } from './IMediaValue'

export interface IAdaptiveSettings {
    readonly heights: Readonly<IMediaValue[]>
    readonly columns: Readonly<IMediaValue[]>
}
