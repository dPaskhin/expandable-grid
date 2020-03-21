import React, { useMemo } from 'react'

import { sortMediaValues } from '@lib/utils/sortMediaValues'

import { IMediaValue } from '@common/interfaces/IMediaValue'

import { useFormWarnings } from '@features/AdaptivePage/hooks/useFormWarnings'
import { SettingsForm } from '@features/AdaptivePage/components/SettingsForm'
import { SettingsTable } from '@features/AdaptivePage/components/SettingsTable'

export interface IProps {
    items: IMediaValue[]
    onSubmit: (item: IMediaValue) => void
    onRemove: (id: number) => void
}

export const SettingsBlock: React.FC<IProps> = ({
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
            <SettingsForm
                onSubmit={onSubmit}
                warnings={warnings}
            />
            <SettingsTable
                items={sortedItems}
                onRemove={onRemove}
            />
        </React.Fragment>
    )
}
