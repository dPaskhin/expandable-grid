import { IMediaValue } from '../interfaces/interfaces'

const getSortedMediaValues = (values: IMediaValue[]) => (
    [...values].sort((a, b) => a.windowWidth.min - b.windowWidth.min)
)

export const getAdaptiveValue = (windowWidth: number, values: IMediaValue[]) => {
    const sortedValues = getSortedMediaValues(values)
    const maxValue = sortedValues[sortedValues.length - 1]
    const minValue = sortedValues[0]

    const currentValue = values.filter(value => {
        return windowWidth >= value.windowWidth.min && windowWidth <= value.windowWidth.max
    })[0]

    if (typeof currentValue !== 'undefined') {
        return currentValue.value
    }

    if (windowWidth < minValue.windowWidth.min) {
        return minValue.value
    }

    if (windowWidth > maxValue.windowWidth.max) {
        return maxValue.value
    }

    return values[Math.round(values.length / 2) - 1].value
}
