import { useReducer } from 'react'
import { Draft, produce } from 'immer'

import { IMediaValue } from '@common/interfaces/IMediaValue'
import { Mutable } from '@common/interfaces/Mutable'

import { IAdaptiveSettings } from '@features/AdaptivePage/interfaces/IAdaptiveSettings'

const SET_HEIGHT = 'SET_HEIGHT'
const SET_COLUMN = 'SET_COLUMN'
const DELETE_HEIGHT = 'DELETE_HEIGHT'

const initialState: IAdaptiveSettings = {
    heights: [],
    columns: [],
}

const reducer = produce((draft: Draft<IAdaptiveSettings>, action: ActionsType) => {
    switch (action.type) {
        case SET_HEIGHT: {
            const lastId = draft.heights.length > 0 ? draft.heights[draft.heights.length - 1].id : 0
            draft.heights.push({
                ...action.payload,
                id: lastId! + 1,
            })
            break
        }
        case DELETE_HEIGHT: {
            draft.heights = draft.heights.filter(height => height.id !== action.payload)
            break
        }
        case SET_COLUMN: {
            const lastId = draft.columns.length > 0 ? draft.columns[draft.columns.length - 1].id : 0
            draft.columns.push({
                ...action.payload,
                id: lastId! + 1,
            })
            break
        }
    }
})

export type ActionsType =
    ActionType<typeof SET_HEIGHT, IMediaValue>
    | ActionType<typeof SET_COLUMN, IMediaValue>
    | ActionType<typeof DELETE_HEIGHT, number>

type ActionType<T, P> = {
    type: T,
    payload: P
}

const actionCreatorCreator = <T, P>(type: T) => {
    return (payload: P): ActionType<T, P> => ({
        type,
        payload,
    })
}

export const setHeightAC = actionCreatorCreator<typeof SET_HEIGHT, IMediaValue>(SET_HEIGHT)
export const deleteHeightAC = actionCreatorCreator<typeof DELETE_HEIGHT, number>(DELETE_HEIGHT)

export const useAdaptiveSettingsState = () => {
    const [settings, dispatch] = useReducer(reducer, initialState)

    const mutableSettings: Mutable<ReturnType<typeof reducer>> = {
        heights: [...settings.heights],
        columns: [...settings.columns],
    }

    return { settings: mutableSettings, dispatch }
}
