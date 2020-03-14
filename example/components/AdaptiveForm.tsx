import React from 'react'

import { FormBlock } from './FormBlock'
import { FormTable } from './FormTable'
import { IMediaValueWithId } from '../interfaces/IMediaValueWithId'

interface IProps {
    items: Readonly<IMediaValueWithId[]>
    onSubmit: (item: IMediaValueWithId) => void
    onRemove: (id: number) => void
}

export const AdaptiveForm: React.FC<IProps> = ({
    items,
    onSubmit,
    onRemove
}) => (
    <React.Fragment>
        <FormBlock
            onSubmit={onSubmit}
        />
        <FormTable
            items={items}
            onRemove={onRemove}
        />
    </React.Fragment>
)
