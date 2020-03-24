import React, { useReducer } from 'react'

import { IMediaValue } from '@common/interfaces/IMediaValue'
import { Mutable } from '@common/interfaces/Mutable'

import { IAdaptiveSettings } from '@features/AdaptivePage/interfaces/IAdaptiveSettings'
import { AdaptiveValueTypes } from '@features/AdaptivePage/enums/AdaptiveValueTypes'
import { initState, reducer } from '@features/AdaptivePage/duck/reducer'
import { Creators } from '@features/AdaptivePage/duck/actions'

export interface IStateProps {
    settings: IAdaptiveSettings
}

export interface IDispatchProps {
    setValue: <T extends AdaptiveValueTypes>(name: T, value: IMediaValue) => void
    deleteItem: <T extends AdaptiveValueTypes>(name: T, id: number) => void
}

export type IWithAdaptiveSettingsState = IStateProps & IDispatchProps

export const withAdaptiveSettingsState = <P extends {}>(Component: React.FC<P & IWithAdaptiveSettingsState>) => {
    return (props: P) => {
        const [settings, dispatch] = useReducer(reducer, initState)

        const mutableSettings: Mutable<typeof settings> = {
            [AdaptiveValueTypes.HEIGHTS]: [...settings[AdaptiveValueTypes.HEIGHTS]],
            [AdaptiveValueTypes.COLUMNS]: [...settings[AdaptiveValueTypes.COLUMNS]],
            [AdaptiveValueTypes.ROW_GAPS]: [...settings[AdaptiveValueTypes.ROW_GAPS]],
            [AdaptiveValueTypes.COLUMN_GAPS]: [...settings[AdaptiveValueTypes.COLUMN_GAPS]],
        }

        return (
            <Component
                {...props}
                settings={mutableSettings}
                setValue={(name, value) => dispatch(Creators.setValue(name, value))}
                deleteItem={((name, id) => dispatch(Creators.deleteValue(name, id)))}
            />
        )
    }
}
