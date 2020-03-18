import { IMediaValue } from '../interfaces/interfaces'

export const sortMediaValues = <T extends IMediaValue>(values: T[]): T[] => {
    return [...values].sort((a, b) => a.windowWidth.min - b.windowWidth.min)
}
