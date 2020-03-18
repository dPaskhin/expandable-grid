import React, { useMemo } from 'react'

import { FormBlock } from './FormBlock'
import { FormTable } from './FormTable'
import { IMediaValue } from '../interfaces/IMediaValue'
import { useFormWarnings } from '../hooks/useFormWarnings'
import { sortMediaValues } from '../../lib/utils/sortMediaValues'

interface IProps {
    items: Readonly<IMediaValue[]>
    onSubmit: (item: IMediaValue) => void
    onRemove: (id: number) => void
}

export const AdaptiveForm: React.FC<IProps> = ({
    items,
    onSubmit,
    onRemove
}) => {
    const sortedItems = useMemo(() => {
        return sortMediaValues<IMediaValue>(items as IMediaValue[])
    }, [items])

    const warnings = useFormWarnings(sortedItems)

    return (
        <React.Fragment>
            <FormBlock
                onSubmit={onSubmit}
                warnings={warnings}
            />
            <FormTable
                items={sortedItems}
                onRemove={onRemove}
            />
        </React.Fragment>
    )
}
