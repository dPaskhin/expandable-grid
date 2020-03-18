import { useEffect, useState } from 'react'
import { IMediaValue } from '../interfaces/IMediaValue'

interface IWindowWidth {
    min: number
    max: number
}

const checkWidthsGaps = (mediaValues: IMediaValue[]): boolean => {
    const windowWidths: IWindowWidth[] = mediaValues.map(value => value.windowWidth)
    let gaps = 0

    windowWidths.reduce<IWindowWidth | null>((prev, curWidths) => {
        if (prev !== null) {
            gaps = prev.max - curWidths.min
        }

        return prev
    }, null)

    console.log(gaps)

    return false
}

export const useFormWarnings = (mediaValues: IMediaValue[]) => {
    const [warnings, setWarnings] = useState<string[]>([])

    useEffect(() => {
        setWarnings([])

        if (mediaValues.length <= 1) {
            setWarnings([
                ...warnings,
                'It\'s preferable to add two and more values'
            ])
        }

        if (checkWidthsGaps(mediaValues)) {
            setWarnings([
                ...warnings,
                'It\'s preferable do not make gaps between window widths'
            ])
        }
    }, [mediaValues])

    return warnings
}
