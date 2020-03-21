import { useMemo } from 'react'

import { IMediaValue } from '@common/interfaces/IMediaValue'

const test: IMediaValue[] = [
    {
        windowWidth: {
            min: 950,
            max: 1000
        },
        value: 150
    },
    {
        windowWidth: {
            min: 1001,
            max: 1050
        },
        value: 150
    },
    {
        windowWidth: {
            min: 1051,
            max: 1100
        },
        value: 150
    }
]

const checkWidthsGaps = (mediaValues: IMediaValue[]): boolean => {
    let hasWidthsGaps = false

    mediaValues
        .map(value => value.windowWidth)
        .reduce<number[][]>((acc, width, index, widths) => {
            if (!widths[index - 1]) {
                return [[]]
            }

            return [...acc, [widths[index - 1].max, width.min]]
        }, [[]])
        .filter(item => item.length)
        .forEach((item) => {
            if ((item[1] - item[0]) !== 1) {
                hasWidthsGaps = true
                return
            }
        })

    return hasWidthsGaps
}

export const useFormWarnings = (mediaValues: IMediaValue[]) => {
    return useMemo(() => {
        let warnings: string[] = []

        if (mediaValues.length <= 1) {
            warnings.push('It\'s preferable to add two and more values')
        }

        if (checkWidthsGaps(mediaValues)) {
            warnings.push('It\'s preferable do not make gaps between window widths')
        }

        return warnings
    }, [mediaValues])
}
